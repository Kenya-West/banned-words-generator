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

    public generateRecursively(word: string): string[] {
        const replaceWithTranslitMap = (word: string, index: number, numReplaced: number, combinations: Set<string> = new Set()): Set<string> => {
            if (index === word.length) {
              if (numReplaced > 0) {
                combinations.add(word);
              }
              return combinations;
            }
            
            this.replaceChar(word[index]).forEach((char: string) => {
                replaceWithTranslitMap(word, index + 1, numReplaced, combinations);
                const currentCharReplaced = word.slice(0, index) + char + word.slice(index + 1);
                replaceWithTranslitMap(currentCharReplaced, index + 1, numReplaced + 1, combinations);
            });
          
            return combinations;
          }
          
          const combinationsSet = replaceWithTranslitMap(word, 0, 0);
          const uniqueCombinations = Array.from(combinationsSet);
          return uniqueCombinations;
    }

    private replaceChar(char: string): string[] {
        return TranslitMap.get(char) ?? [char];
    }

}