export class ErrorService {
    constructor() {
        globalThis.addEventListener("unhandledrejection", (e) => {
            console.error("unhandled rejection at:", e.promise, "reason:", e.reason);
            e.preventDefault();
          });

          globalThis.addEventListener("beforeunload", (e) => {
            console.log("About to exit...");
          });
    }
}