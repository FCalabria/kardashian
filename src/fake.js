const fs = require('fs');
const Faked = require('./fakedPrototype.js');

function getEntityObject(entityName, path) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${path}/${entityName}.json`, (error, data) => {
      if (error !== null) {
        return reject(error);
      }
      const entityData = JSON.parse(data);
      if (!Object.prototype.hasOwnProperty.call(entityData, 'model')) {
        return reject(new Error('Error reading "model" in entity', entityData));
      }
      const faked = new Faked(entityData);
      return resolve(faked);
    });
  });
}

module.exports = function fake(entityName, path = './kardashian') {
  console.log(`Creating quick fake for ${entityName}`);
  return getEntityObject(entityName, path);
};
