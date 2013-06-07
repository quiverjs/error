
var error = function(errorCode, errorMessage, previousError) {
  var errorObject = new Error(errorMessage)

  errorObject.errorCode = errorCode
  errorObject.errorMessage = errorMessage
  errorObject.previousError = previousError

  return errorObject
}

var asyncError = function() {
  var errorObject = new Error('sync call stack')

  var createAsyncErr = function(errorCode, errorMessage, previousError) {
    var err = error(errorCode, errorMessage, previousError)
    err.syncErrorObject = errorObject
    err.syncStack = errorObject.stack
    return err
  }

  var propogateErr = function(err) {
    if(!err.syncStack) {
      err.syncErrorObject = errorObject
      err.syncStack = errorObject.stack
    }
    return err
  }

  return function() {
    var argsLength = arguments.length
    if(argsLength == 1) {
      return propogateErr.apply(null, arguments)
    } else if(argsLength > 1) {
      return createAsyncErr.apply(null, arguments)
    } else {
      throw new Error('must provide at least one argument to async error function')
    }
  }
}

module.exports = {
  error: error,
  asyncError: asyncError
}