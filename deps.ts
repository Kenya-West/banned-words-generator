/**
 * deps.ts
 *
 * This module re-exports the required methods from dependant remote.
 */

export { EventEmitter } from "https://deno.land/std@0.167.0/node/events.ts";
export { createRequire } from "https://deno.land/std@0.177.0/node/module.ts";
export { DI } from "https://deno.land/x/dino@v2.0.1/mod.ts";
// @deno-types="npm:@types/russian-nouns-js/index.d.ts"
export * as RussianNouns from "npm:russian-nouns-js";
export * as dotenv from "npm:dotenv";
export * as path from "https://deno.land/std@0.177.0/path/mod.ts";

