import { RussianNouns } from "../deps.ts";
import { DepsKeys } from "./di-deps.model.ts";
import { DIService } from "./di.service.ts";
import { RussianNounsService } from "./russian-nouns.service.ts";

export class DeclesionGeneratorService {
    constructor() {}

    public generateDeclesion(word: string): string[] {
        const result: Set<string> = new Set();

        try {
            const rn = DIService.getClassInstance().get<RussianNounsService>(DepsKeys.RussianNounsService).rn;
            const engine = DIService.getClassInstance().get<RussianNounsService>(DepsKeys.RussianNounsService).engine;
    
            const lemma = rn.createLemma({
                text: word,
                gender: rn.Gender.COMMON
            });
            
            rn.CASES.forEach(c => {
                result.add(...engine.decline(lemma, c));
            })
            
            const pluralForm = engine.pluralize(lemma);
            
            rn.CASES.forEach(c => {
                result.add(...engine.decline(lemma, c, pluralForm[0] ?? undefined));
            })
        } catch (error) {}

        return Array.from(result);
    }
}