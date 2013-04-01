
var error = function(errorCode, errorMessage, previousError) {
  var self = { }
  var errorObject = new Error(errorMessage)

  self.errorCode = errorCode
  self.errorMessage = errorMessage
  self.previousError = previousError
  self.errorObject = errorObject
  self.stack = errorObject.stack

  return self
}

var asyncError = function() {
  var errorObject = new Error('sync call stack')

  return function(errorCode, errorMessage, previousError) {
    var err = error(errorCode, errorMessage, previousError)
    err.syncErrorObject = errorObject
    err.syncStack = errorObject.stack
    return err
  }
}

module.exports = {
  error: error,
  asyncError: asyncError
}