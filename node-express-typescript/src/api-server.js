"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typescript_rest_1 = require("typescript-rest");
const path = require("path");
const cors = require("cors");
const controllers_1 = require("./controllers");
const session = require("express-session");
class ApiServer {
    constructor() {
        this.server = null;
        this.app = express();
        this.config();
        typescript_rest_1.Server.buildServices(this.app, ...controllers_1.default);
        // TODO: enable for Swagger generation error
        // Server.loadServices(this.app, 'controllers/*', __dirname);
        //Server.swagger(this.app, "./dist/swagger.json", "/api-docs", "localhost:" + ApiServer.PORT, ["http"]);
    }
    /**
     * Configure the express app.
     */
    config() {
        // Native Express configuration
        let bodyParser = require('body-parser');
        let busboy = require('connect-busboy');
        this.app.use(busboy());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(express.static(path.join(__dirname, "/public"), { maxAge: 31557600000 }));
        this.app.use('/scripts', express.static(path.join(__dirname, "/scripts"), { maxAge: 31557600000 }));
        this.app.use('/styles', express.static(path.join(__dirname, "/styles"), { maxAge: 31557600000 }));
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");
        this.app.use(cors());
        this.app.use(session({ secret: "ssshhhhh" }));
        this.app.all("/*", function (req, res, next) {
            return next();
        });
    }
    /**
     * Start the server
     * @returns {Promise<any>}
     */
    start() {
        return new Promise((resolve, reject) => {
            this.server = this.app.listen(ApiServer.PORT, (err) => {
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
    stop() {
        return new Promise((resolve, reject) => {
            if (this.server) {
                this.server.close(() => {
                    return resolve(true);
                });
            }
            else {
                return resolve(true);
            }
        });
    }
}
ApiServer.PORT = process.env.PORT || 3002;
exports.ApiServer = ApiServer;
//# sourceMappingURL=api-server.js.map