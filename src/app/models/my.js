'use strict';
class My {
  constructor() { }
  //put your code here
  static getAll(callback) {
    var result = {};
    result.collection = [];

    callback(result);
  }
}

console.log(__filename);

module.exports = My;