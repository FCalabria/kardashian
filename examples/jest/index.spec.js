const Client = require('./index.js');
const kardashian = require('../..');

describe('main', () => {
  let mockClient;
  let client;
  beforeAll(async () => {
    mockClient = await kardashian.fake('client_hardcoded');
    client = new Client(mockClient);
  });
  it('should define full client', () => {
    expect(client.fullData).toBeDefined();
    expect(client.fullData).toEqual(mockClient);
  });
  it('should define client address', () => {
    expect(client.address).toBeDefined();
    expect(client.address).toEqual(mockClient.address);
  });
  it('should define client sign in date', () => {
    expect(client.signInDate).toBeDefined();
    expect(client.signInDate).toEqual(jasmine.any(Date));
    expect(client.signInDate).toEqual(new Date(mockClient.signInDate));
  });
});
