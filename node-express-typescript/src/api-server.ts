import * as express from "express";
import { Server, HttpError } from "typescript-rest";
import * as http from "http";
import * as path from "path";
import * as cors from "cors";
import controllers from "./controllers";
import * as session from "express-session";

export class ApiServer {

    private app: express.Application;
    private server: http.Server = null;
    public static PORT = process.env.PORT || 3002;

    constructor() {
        this.app = express();
        this.config();

        Server.buildServices(this.app, ...controllers);
        // TODO: enable for Swagger generation error
        // Server.loadServices(this.app, 'controllers/*', __dirname);
        //Server.swagger(this.app, "./dist/swagger.json", "/api-docs", "localhost:" + ApiServer.PORT, ["http"]);
    }

    /**
     * Configure the express app.
     */
    private config(): void {
        // Native Express configuration
        let bodyParser = require('body-parser');
        let busboy = require('connect-busboy');

        this.app.use(busboy());
        this.app.use( bodyParser.urlencoded( { extended: true } ) );
        this.app.use( bodyParser.json( ) );
        this.app.use(express.static(path.join(__dirname, "/public"), { maxAge: 31557600000 }));
        this.app.use('/scripts', express.static(path.join(__dirname, "/scripts"), { maxAge: 31557600000 }));
        this.app.use('/styles', express.static(path.join(__dirname, "/styles"), { maxAge: 31557600000 }));
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");
        this.app.use(cors());
        this.app.use(session({secret: "ssshhhhh"}));

        this.app.all("/*", function(req, res, next){
            return next();
        });
    }

    /**
     * Start the server
     * @returns {Promise<any>}
     */
    public start(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.server = this.app.listen(ApiServer.PORT, (err: any) => {
                if (err) {
                    return reject(err);
                }
                // tslint:disable-next-line:no-console
                console.log(`Listening to http://${this.server.address().address}:${this.server.address().port}`);
                return resolve();
            });
        });

    }

    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    public stop(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (this.server) {
                this.server.close(() => {
                    return resolve(true);
                });
            } else {
                return resolve(true);
            }
        });
    }

}
