import express from "express";


export class ContentHandler {
	private documentRoot = "panel";
	private app = express();

	constructor(
		private config: any
	) {
		if(!config) 
		{
			this.documentRoot = "install";
			this.config = {};
		}

		this.app.set('view engine', 'ejs');
		this.app.set("views", "./views");
	}

	async start() {
		this.app.use(express.static("static"));
		
		this.app.get("/panel", (req, res) => { //if navigated to the root
			res.render(`${this.documentRoot}/index`);
		});

		this.app.get("/panel/(/*)?", (req, res) => {
			let path = req.path;
			if(path == "/panel/") { //If its /panel then go to index
				res.render(`${this.documentRoot}/index`);
			}
			else
			{
				path = path.replace("/panel", "");
				res.render(`${this.documentRoot}${path}`);
			}
			res.send(req.path);
		});

		this.app.listen(3000);
		console.info(`Panel listening in "${this.documentRoot}" mode`);
	}
}