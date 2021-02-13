import express from "express";


export class ContentHandler {
	private app = express();

	constructor(
		private config: any
	) {

	}

	async start() {
		this.app.use(express.static("static"));
	
		if(!this.config) await this.setupInstall();
		else await this.setupPanel();

		this.app.listen(5000);
		console.info(`Panel listening in ${this.config ? "panel": "install"} mode`);
	}

	async setupPanel() {
		//TODO: Do this later
	}

	async setupInstall() {
		this.app.get("/api/mode", (req, res) => {
			return res.json({
				mode: "install"
			});
		});
		
		this.app.post("/api/setup", (req, res) => {
			return res.sendStatus(200);
		});
	}
}