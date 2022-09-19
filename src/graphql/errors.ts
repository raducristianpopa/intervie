export class CodedError extends Error {
	code = 'CODED';
	validation: {
		path: string;
		message: string;
	};

	constructor(message: string, properties: { path: string; message: string }) {
		super(message);

		this.name = 'Coded error';
		Object.defineProperty(this, 'name', { value: 'Coded error' });

		this.validation = properties;
	}
}
