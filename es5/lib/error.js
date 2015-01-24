"use strict";
Object.defineProperties(exports, {
  error: {get: function() {
      return error;
    }},
  __esModule: {value: true}
});
let error = (function(errorCode, errorMessage, details) {
  return new ServerError(errorCode, errorMessage, details);
});
var ServerError = function ServerError() {
  var errorCode = arguments[0] !== (void 0) ? arguments[0] : 500;
  var errorMessage = arguments[1] !== (void 0) ? arguments[1] : '';
  var details = arguments[2] !== (void 0) ? arguments[2] : {};
  $traceurRuntime.superConstructor($ServerError).call(this, errorMessage);
  Error.captureStackTrace(this, error);
  this._errorCode = errorCode;
  this._errorMessage = errorMessage;
  this._errorDetails = details;
};
var $ServerError = ServerError;
($traceurRuntime.createClass)(ServerError, {
  get name() {
    return 'ServerError';
  },
  get code() {
    return this._errorCode;
  },
  get errorCode() {
    return this._errorCode;
  },
  get message() {
    return this._errorMessage;
  },
  get details() {
    return this._errorDetails;
  },
  format: function() {
    return ("[Error " + this.errorCode + ": " + this.message + "]\n" + this.stack);
  },
  inspect: function() {
    return this.format();
  }
}, {}, Error);
