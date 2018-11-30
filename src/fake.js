const fs = require('fs');

function getEntityObject(entityName) {
  return new Promise((resolve, reject) => {
    fs.readFile(`./kardashian/${entityName}.json`, (error, data) => {
      if (error !== null) {
        return reject(error);
      }
      const entityData = JSON.parse(data);
      if (!Object.prototype.hasOwnProperty.call(entityData, 'model')) {
        return reject(new Error('Error reading "model" in entity', entityData));
      }
      return resolve(entityData.model);
    });
  });
}

module.exports = function fake(entityName) {
  console.log(`Creating quick fake for ${entityName}`);
  return getEntityObject(entityName);
};
