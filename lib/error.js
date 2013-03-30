
var error = function(errorCode, errorMessage, previousError) {
  var self = new Error(errorMessage)

  self.errorCode = errorCode
  self.errorMessage = errorMessage
  self.previousError = previousError

  return self
}

module.exports = {
  error: error
}