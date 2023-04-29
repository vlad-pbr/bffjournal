export interface Log {
	username: string;
	date: number;
	message: string;
}

export interface User {
	username: string;
	password: string;
}

export interface Token {
	value: string;
	expiration: number;
}

export interface Error {
	detail: string;
}