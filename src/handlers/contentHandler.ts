import express from "express";

export class ContentHandler {
    private _config : any;
    private _documentRoot = "panel";
    private _app = express();

    constructor(config : any) {
        this._config = config;
        if(!config) 
        {
            this._documentRoot = "install";
            this._config = {};
        }

        this._app.set('view engine', 'ejs');
        this._app.set("views", "./views");
    }

    start = async() => {
        
        this._app.use(express.static("static"));
        
        this._app.get("/panel", (req, res) => { //if navigated to the root
            res.render(`${this._documentRoot}/index`);
        })

        this._app.get("/panel/(/*)?", (req, res) => {
            let path = req.path;
            if(path == "/panel/") { //If its /panel then go to index
                res.render(`${this._documentRoot}/index`);
            }
            else
            {
                path = path.replace("/panel", "");
                res.render(`${this._documentRoot}${path}`);
            }
            res.send(req.path);
        });


        this._app.listen(3000);
        console.info(`Panel listening in "${this._documentRoot}" mode`);
    }
}