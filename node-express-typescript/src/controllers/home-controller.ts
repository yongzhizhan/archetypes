import {GET, POST, Path, Context, ServiceContext, ContextResponse, ContextRequest} from "typescript-rest";
import * as express from "Express";
import * as path from 'path';
import * as fs from 'fs';


@Path("/")
export class HomeController {
    @Context
    context: ServiceContext;

    @Path("index")
    @GET
    index(@ContextResponse res: express.Response): void {
        res.render('index', {pretty: true});
    }
}