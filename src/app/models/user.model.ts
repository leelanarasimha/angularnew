export class User {
	constructor(public email: string, public userId: string, private idToken: string, private expirationDate: Date) {}

	private token() {
		if (this.idToken === '' || new Date() > this.expirationDate) {
			return null;
		}

		return this.idToken;
	}
}
