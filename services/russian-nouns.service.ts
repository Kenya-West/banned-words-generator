import { createRequire, RussianNouns } from "../deps.ts";

export class RussianNounsService {
    public rn: typeof RussianNouns;
    public engine: RussianNouns.Engine;

    constructor() {
        const require = createRequire(import.meta.url);
        const rn = require("russian-nouns-js") as typeof RussianNouns;
        this.rn = rn;
        this.engine = new rn.Engine();
    }
}