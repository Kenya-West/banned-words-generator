import { TranslitMap } from "../models/translit-map.model.ts";

export class TransliterationGeneratorService {
    constructor() {}

    public generateTransliteration(word: string): string[] {
        const result: Set<string> = new Set();

        // deno-lint-ignore no-unused-vars
        Array.from(word).reduce((prev: string, next: string, index: number, arr: string[]): string => {
            const prevResult = prev.length > 0 ? prev : [""];
            const nextResult: string = Array.from(prevResult).map((prevChar: string): string => {
                this.replaceChar(next).forEach((char: string) => {
                    result.add(word.substring(0, index) + char + word.substring(index+1));
                });
                return prevChar + next;
            });

            return nextResult;
        }, word);

        return Array.from(result);
    }

    private replaceChar(char: string): string[] {
        return TranslitMap.get(char) ?? [char];
    }
}