const fs = require('fs');
const fake = require('../src/fake');

describe('fake', () => {
  it('should return error if entity file is not found', () => {
    const fakeError = 'faked';
    fs.readFile = jest.fn((filePath, cb) => {
      cb(new Error(fakeError), undefined);
    });
    expect.assertions(1);
    return expect(fake('noModel')).rejects.toThrow(fakeError);
  });
  it('should return the object if found', () => {
    const fakeObject = { model: { testing: 'some data' } };
    fs.readFile = jest.fn((filePath, cb) => {
      cb(null, Buffer.from(JSON.stringify(fakeObject)));
    });
    expect.assertions(1);
    return expect(fake('noModel')).resolves.toEqual(fakeObject.model);
  });
  it('should return an error if the object does not have a model', () => {
    const fakeObject = { testing: 'some data' };
    fs.readFile = jest.fn((filePath, cb) => {
      cb(null, Buffer.from(JSON.stringify(fakeObject)));
    });
    expect.assertions(1);
    return expect(fake('noModel')).rejects.toThrow();
  });
});
