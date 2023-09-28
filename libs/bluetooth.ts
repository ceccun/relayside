import { Adapter, createBluetooth } from "node-ble";
import { ClientState } from "../const";

export class BluetoothClient {
	private bluetoothInstance: ReturnType<typeof createBluetooth>;
	private cronID: NodeJS.Timeout;
	private state: ClientState;
	private _adapter?: Adapter;

	constructor() {
		console.log("Creating new", this.constructor.name);
		this.state = ClientState.DISCONNECTED;

		this.bluetoothInstance = createBluetooth();

		this.cronID = setInterval(this.beacon.bind(this), 5000);
	}

	private async beacon() {
		console.log("Beacon", this.state);
		if (this.state == ClientState.DISCONNECTED) {
			const adapter = await this.adapter;

			if (!adapter.isDiscovering()) {
				adapter.startDiscovery();
			}
			await this.checkDevices();
		}
	}

	private async checkDevices() {
		const adapter = await this.adapter;
		const devices = await adapter.devices();

		for (const device of devices) {
			this.connectDevice(device);
		}
	}

	private async connectDevice(deviceMac: string) {
		const adapter = await this.adapter;

		const connection = await adapter.waitDevice(deviceMac);
		await connection.connect();
	}

	public get adapter() {
		return Promise.resolve(
			this._adapter || this.bluetooth.defaultAdapter()
		);
	}

	public set adapter(newAdapter: Promise<Adapter>) {
		this.adapter = newAdapter;
	}

	public get bluetooth() {
		return this.bluetoothInstance.bluetooth;
	}

	public destroy() {
		this.bluetoothInstance.destroy();
	}
}
