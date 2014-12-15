"use strict";
var $__traceur_64_0_46_0_46_7__,
    $___46__46__47_lib_47_error__,
    $__chai__;
($__traceur_64_0_46_0_46_7__ = require("traceur"), $__traceur_64_0_46_0_46_7__ && $__traceur_64_0_46_0_46_7__.__esModule && $__traceur_64_0_46_0_46_7__ || {default: $__traceur_64_0_46_0_46_7__});
var error = ($___46__46__47_lib_47_error__ = require("../lib/error"), $___46__46__47_lib_47_error__ && $___46__46__47_lib_47_error__.__esModule && $___46__46__47_lib_47_error__ || {default: $___46__46__47_lib_47_error__}).error;
var chai = ($__chai__ = require("chai"), $__chai__ && $__chai__.__esModule && $__chai__ || {default: $__chai__}).default;
var should = chai.should();
describe('quiver error test', (function() {
  it('basic error test', (function() {
    var err = error(404, 'Not Found');
    err.code.should.equal(404);
    err.errorCode.should.equal(404);
    err.message.should.equal('Not Found');
    console.log(err);
  }));
}));
