
var error = require('../lib/error')
var should = require('should')

var noAsyncError = function(callback) {
  process.nextTick(function() {
    callback(error.error(500, 'test error'))
  })
}

var withAsyncError = function(callback) {
  var asyncErr = error.asyncError()
  process.nextTick(function() {
    callback(asyncErr(error.error(500, 'test error')))
  })
}

var nestedAsyncError = function(callback) {
  var asyncErr = error.asyncError()
  noAsyncError(function(err) {
    callback(asyncErr(err))
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

  it('async error shoud have both stack traces', 
  function(callback) {
    withAsyncError(function(err) {
      var callstack = err.callstacks[0]
      should.exist(callstack.sync)
      should.exist(callstack.async)
      console.log('error with sync stack:')
      console.log(err)

      callback()
    })
  })

  it('async error add sync stack when propogating', function() {
    nestedAsyncError(function(err) {
      var callstack = err.callstacks[0]
      should.exist(callstack.sync)
      should.exist(callstack.async)
      console.log('error with async stack:')
      console.log(err)
    })
  })
})