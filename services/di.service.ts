import { DI } from "../deps.ts";
import { EventEmitter } from "../deps.ts";
import { Deps, DepsAsArray } from "./di-deps.model.ts";

export class DIService {
    /**
     * This is a classInstance property that will be used to stoSre the instance of the class.
     */
    private static classInstance: DIService;
    /**
     * This is a static method that will be used to get the instance of the class.
     * 
     * Use this method only to get class instance.
     * 
     * @returns {DIService} - The instance of the class.
     */
    static getClassInstance(): DIService {
        if (!this.classInstance) {
            this.classInstance = new DIService();
        }
        return this.classInstance;
    }

    /**
     * Private constructor to prevent creating new instances of the class.
     * 
     * It create instance of DI package.
     */
    private constructor() {
        this.diInstance = new DI<Deps>();
    }
    
    /**
     * This is a property that will be used to store the instance of DI package.
     */
    public diInstance: DI<Deps>;

    /**
     * A flag to mark whether all instances are initialized or not.
     */
    public initializedInstances = new EventEmitter();

    /**
     * Method to initialize all instances of di package.
     * 
     * Method should be called manually by parent class.
     * 
     * Method initializes all instances that are set in `di-deps.model.ts` file.
     * 
     * @returns {Promise<void>} - A promise that will be resolved when all instances are initialized.
     */
    public initializeAll(): Promise<void> {
        DepsAsArray.forEach((dep) => {
            this.diInstance?.set(dep.key, new dep.controller());
        })
        this.initializedInstances.emit("initialized");
        return Promise.resolve();
    }

    /**
     * Method to get instance of some class. Used in di package
     * 
     * @param key @see {@link Deps}
     * @returns some class you placed instead of `T`
     */
    public get<T>(key: keyof Deps): T {
        return this.diInstance?.get(key);
    }
}