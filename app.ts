import { DepsKeys } from "./services/di-deps.model.ts";
import { DIService } from "./services/di.service.ts";
import { dotenv, path } from "./deps.ts";
import * as contents from "./words.json" assert { type: "json" };
import { DeclesionGeneratorService } from "./services/declesion-generator.service.ts";
import { TransliterationGeneratorService } from "./services/translit-generator.service.ts";


export class App {
    constructor() {
        this.setEnvVariables();
        const diService = DIService.getClassInstance();
        diService.initializeAll().then(() => {
            this.launch();
        });
    }

    private setEnvVariables(): void {
        const nodeEnv = Deno.env.get("NODE_ENV");
        const envs = dotenv.config({ path: `.env.${nodeEnv}` });
        for (const [key, value] of Object.entries(envs.parsed as Record<string, string>)) {
            Deno.env.set(key, value);
        }
    }

    private launch(): void {
        const result: Set<string> = new Set();
        const dgs = DIService.getClassInstance().get<DeclesionGeneratorService>(DepsKeys.DeclesionGeneratorService);
        const tgs = DIService.getClassInstance().get<TransliterationGeneratorService>(DepsKeys.TransliterationGeneratorService);

        contents.default.words.forEach((word: string) => {
            const sanitizedWord = this.sanitizeWord(word);

            dgs.generateDeclesion(sanitizedWord).forEach((declesion: string) => {
                result.add(declesion);
            });
            tgs.generateRecursively(sanitizedWord).forEach((transliteration: string) => {
                result.add(transliteration);
            });
        })

        Deno.writeFile(path.join("dist", "output.txt"), new TextEncoder().encode(Array.from(result).join(",")));
    }

    private sanitizeWord(word: string): string {
        return word.trimStart()?.trimEnd()?.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, "") ?? "";
    }

}