/// <reference types="es6-promise" />
export declare class ApiServer {
    private app;
    private server;
    static PORT: string | number;
    constructor();
    /**
     * Configure the express app.
     */
    private config();
    /**
     * Start the server
     * @returns {Promise<any>}
     */
    start(): Promise<any>;
    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    stop(): Promise<boolean>;
}
