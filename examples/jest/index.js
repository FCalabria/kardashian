module.exports = class Client {
  constructor(client) {
    this.client = client;
  }

  get fullData() {
    return this.client;
  }

  get address() {
    return this.client.address;
  }

  get signInDate() {
    return new Date(this.client.signInDate);
  }
};
