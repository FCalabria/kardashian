const fs = require('fs');
const fake = require('../src/fake');

describe('fake', () => {
  function mockReadFile(fakeObject) {
    fs.readFile = jest.fn((filePath, cb) => {
      cb(null, Buffer.from(JSON.stringify(fakeObject)));
    });
  }
  describe('basic behaviour', () => {
    it('should return error if entity file is not found', () => {
      const fakeError = 'faked';
      fs.readFile = jest.fn((filePath, cb) => {
        cb(new Error(fakeError), undefined);
      });
      expect.assertions(1);
      return expect(fake('noModel')).rejects.toThrow(fakeError);
    });
    it('should return the object inside "model" key if found', () => {
      const fakeObject = { model: { testing: 'some data' } };
      mockReadFile(fakeObject);
      expect.assertions(2);
      return fake('noModel').then((result) => {
        expect(result).toMatchObject({ faked: {} });
        expect(result.faked).toEqual(fakeObject.model);
      });
    });
    it('should return an error if the object does not have a model', () => {
      const fakeObject = { testing: 'some data' };
      mockReadFile(fakeObject);
      expect.assertions(1);
      return expect(fake('noModel')).rejects.toThrow();
    });
  });
  describe('mandatory fields', () => {
    it('should define the "mandatory" object', () => {
      const fakeObject = { model: { testing: 'some data' }, mandatory: [] };
      mockReadFile(fakeObject);
      expect.assertions(2);
      return fake('noModel').then((data) => {
        expect(data.mandatory).toBeDefined();
        expect(data.mandatory).toEqual(expect.any(Object));
      });
    });
    it('should return only the fields marked as mandatory', () => {
      const fakeObject = { model: { testing: 'some data', testing2: 'more data' }, mandatory: ['testing2'] };
      mockReadFile(fakeObject);
      expect.assertions(3);
      return fake('noModel').then((data) => {
        const mandatoryData = data.mandatory;
        expect(mandatoryData).toBeDefined();
        expect(mandatoryData).not.toEqual(fakeObject);
        expect(mandatoryData).toEqual({ testing2: 'more data' });
      });
    });
    it('should return an emtpy object if mandatory array is not defined', () => {
      const fakeObject = { model: { testing: 'some data', testing2: 'more data' } };
      mockReadFile(fakeObject);
      expect.assertions(1);
      return fake('noModel').then((data) => {
        expect(data.mandatory).toEqual({});
      });
    });
    it('should return an emtpy object if the mandatory array is empty', () => {
      const fakeObject = { model: { testing: 'some data', testing2: 'more data' }, mandatory: [] };
      mockReadFile(fakeObject);
      expect.assertions(1);
      return fake('noModel').then((data) => {
        expect(data.mandatory).toEqual({});
      });
    });
    it('should deep copy values from the model', () => {
      const fakeObject = {
        model: {
          justAnArray: [],
          justAnObject: {},
          objectInArray: [{}],
        },
        mandatory: ['justAnArray', 'justAnObject', 'objectInArray'],
      };
      mockReadFile(fakeObject);
      expect.assertions(8);
      return fake('noModel').then((data) => {
        expect(data.mandatory).toEqual(fakeObject.model);
        expect(data.mandatory).not.toBe(fakeObject.model);
        expect(data.mandatory.justAnArray).toEqual(fakeObject.model.justAnArray);
        expect(data.mandatory.justAnArray).not.toBe(fakeObject.model.justAnArray);
        expect(data.mandatory.justAnObject).toEqual(fakeObject.model.justAnObject);
        expect(data.mandatory.justAnObject).not.toBe(fakeObject.model.justAnObject);
        expect(data.mandatory.objectInArray[0]).toEqual(fakeObject.model.objectInArray[0]);
        expect(data.mandatory.objectInArray[0]).not.toBe(fakeObject.model.objectInArray[0]);
      });
    });
  });
});
