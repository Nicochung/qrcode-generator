declare let require: any;
declare let exports : any;

import * as imported from 'qrcode-generator';

exports.requireAndImport = function(test : any) {

  let testQR = function(qrcode : any) {
    test.equal(typeof qrcode, 'function');
    test.equal(typeof qrcode.stringToBytes, 'function');
  };

  let required =  require('qrcode-generator');
  testQR(required);
  testQR(imported);
  test.done();
};
