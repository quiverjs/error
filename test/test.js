import 'traceur'
import { error } from '../lib/error'

import chai from 'chai'
let should = chai.should()

describe('quiver error test', () => {
  it('basic error test', () => {
    let err = error(404, 'Not Found')
    err.code.should.equal(404)
    err.errorCode.should.equal(404)
    err.message.should.equal('Not Found')
    console.log(err)
  })
})