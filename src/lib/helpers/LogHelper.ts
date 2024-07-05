export class LogHelper {
    public static error(message: string) {
        console.error(`[ERROR] - ${message}`);
    }

    public static warn(message: string) {
        console.warn(`[WARN] - ${message}`);
    }

    public static info(message: string) {
        console.info(`[INFO] - ${message}`);
    }

    public static debug(message: string) {
        console.debug(`[DEBUG] - ${message}`);
    }

    public static fail(message: string) {
        console.error(`[FAIL] - ${message}`);
    }

    public static fatal(message: string) {
        console.error(`[FATAL] - ${message}`);
    }

    public static exception(message: string) {
        console.error(`[EXCEPTION] - ${message}`);
    }
}