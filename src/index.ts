import fs from "fs";
import ini from "ini";
import {ContentHandler} from "./handlers/contentHandler";


(async () => {
	let config;

	try {
		await fs.promises.mkdir("/etc/rokkitdash", {recursive: true});
	}
	catch {
		return console.error("Error occured creating /etc/rokkitdash");
	}

	try{
		let content = await fs.promises.readFile("/etc/rokkitdash/config.ini", "utf-8"); //Read config
		config = ini.parse(content);
	}
	catch {}

	try {
		let handler = new ContentHandler(config); //Create the handler
		handler.start();
	}
	catch {
		return console.error("An error occured starting the ContentHandler for the panel");
	}

})();

