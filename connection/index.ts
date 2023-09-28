import { NextRelay } from "../const";
import { ConnectionState } from "../const/connection";

export class Connection {
	public status: ConnectionState;
	private nextRelay?: NextRelay;

	constructor() {
		this.status = ConnectionState.DISCONNECTED;
	}

	public connect() {
		console.log(`Establishing connection...`);
	}
}
