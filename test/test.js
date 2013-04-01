
var error = require('../lib/error')
var should = require('should')

var noAsyncError = function(callback) {
  process.nextTick(function() {
    callback(error.error(500, 'test error'))
  })
}

var withAsyncError = function(callback) {
  var asyncError = error.asyncError()
  process.nextTick(function() {
    callback(asyncError(500, 'test error'))
  })
}

describe('test async error', function() {
  it('normal error only has async stack trace', function() {
    noAsyncError(function(err) {
      should.not.exist(err.syncStack)
      console.log('error without sync stack:')
      console.log(err.stack)
    })
  })

  it('async error shoud have both stack traces', function() {
    withAsyncError(function(err) {
      should.exist(err.syncStack)
      console.log('error with sync stack:')
      console.log(err.stack)
      console.log(err.syncStack)
    })
  })
})