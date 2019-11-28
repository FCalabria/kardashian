function getMandatory(fields) {
  const copy = {};
  fields.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(this.faked, key)) {
      const value = this.faked[key];
      if (Array.isArray(value)) {
        copy[key] = Array.from(value);
      } else if (value instanceof Object) {
        copy[key] = Object.assign({}, value);
      } else {
        copy[key] = value;
      }
    }
  });
  return copy;
}

module.exports = class Faked {
  constructor(data) {
    const mandatoryFields = data.mandatory || [];
    this.faked = data.model;
    this.mandatory = getMandatory.bind(this)(mandatoryFields);
  }
}
