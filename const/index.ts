export enum ClientState {
	DISCONNECTED,
	CONNECTED,
	RELAYING,
}

export type NextRelay = {
	macAddress: string;
	db: number;
	state: ClientState;
};
