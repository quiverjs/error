
'use strict'

var callstack = require('quiver-callstack').callstack

var formatAsyncError = function(err) {
  var result = 'Error: '
  if(err.statusCode) result += '[' + err.statusCode + '] '
  if(err.message) result += err.message
  result += '\n'

  if(err.callstacks) {
    err.callstacks.forEach(function(stack, i) {
      result += '\n==== Sync Stack [' + i + '] ====\n'
      result += stack.sync.printTraces()
      result += '\n'
      result += '\n==== Async Stack [' + i + '] ====\n'
      result += stack.async.printTraces()
      result += '\n'
    })
  } else {
    result += '\n==== Error Stack ====\n'
    result += err.stack
    result += '\n'
  }

  if(err.previousErrors) {
    err.previousErrors.forEach(function(err, i) {
      result += '\n==== Previous Error [' + i + '] ====\n'
      result += formatAsyncError(err)
    })
  }

  return result
}

var error = function(errorCode, errorMessage, previousError) {
  var errorObject = new Error(errorMessage)

  errorObject.errorCode = errorCode
  
  if(previousError) {
    var previousErrors = [previousError]

    if(previousError.previousErrors) {
      previousErrors = previousErrors.concat(previousError.previousErrors)
      previousError.previousErrors = null
    } 

    errorObject.previousErrors = previousErrors
  }

  errorObject.inspect = function() {
    return formatAsyncError(errorObject)
  }

  return errorObject
}

var asyncError = function(ignoreFiles) {
  if(!ignoreFiles) ignoreFiles = []
  ignoreFiles.push(__filename)

  var syncCallstack = callstack(ignoreFiles)
  
  var asyncErr = function(err) {
    var asyncCallstack = callstack(ignoreFiles)


    if(!err.callstacks) err.callstacks = []

    err.callstacks.unshift({
      sync: syncCallstack,
      async: asyncCallstack
    })

    return err
  }

  return asyncErr
}

module.exports = {
  error: error,
  asyncError: asyncError,
  __esModule: true
}