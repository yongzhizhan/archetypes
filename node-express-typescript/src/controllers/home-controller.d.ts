/// <reference types="express" />
/// <reference types="es6-promise" />
import { ServiceContext } from "typescript-rest";
import * as express from "Express";
export declare class HomeController {
    context: ServiceContext;
    index(res: express.Response): void;
    upload(req: express.Request, res: express.Response): Promise<void>;
    queryStatus(req: express.Request, res: express.Response): string;
    cancelConvert(req: express.Request, res: express.Response): string;
}
