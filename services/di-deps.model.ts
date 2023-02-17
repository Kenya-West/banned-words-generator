import { DeclesionGeneratorService } from "./declesion-generator.service.ts";
import { ErrorService } from "./error.service.ts";
import { RussianNounsService } from "./russian-nouns.service.ts";
import { TransliterationGeneratorService } from "./translit-generator.service.ts";

export enum DepsKeys {
    // controllers
    // services
    RussianNounsService,
    DeclesionGeneratorService,
    TransliterationGeneratorService,
    ErrorService=999
}

export const DepsAsArray = [
    // controllers
    // services
    {key: DepsKeys.RussianNounsService, controller: RussianNounsService},
    {key: DepsKeys.DeclesionGeneratorService, controller: DeclesionGeneratorService},
    {key: DepsKeys.TransliterationGeneratorService, controller: TransliterationGeneratorService},
    {key: DepsKeys.ErrorService, controller: ErrorService},
]
export interface Deps {
    // controllers
    // services
    [DepsKeys.RussianNounsService]: RussianNounsService;
    [DepsKeys.DeclesionGeneratorService]: DeclesionGeneratorService;
    [DepsKeys.TransliterationGeneratorService]: TransliterationGeneratorService;
    [DepsKeys.ErrorService]: ErrorService;
}