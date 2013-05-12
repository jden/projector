var chai = require('chai')
chai.should()

describe('projector', function () {
  var projector = require('../')
  
  it('creates a function', function () {
    projector().should.be.a('function')
  })

  it('returns an empty object if called with no args', function () {
    projector()().should.deep.equal({})
  })

  it('adds undefined keys if present on projection but not source obj', function () {
    var source = {
      firstName: 'bob'
    }
    projector({firstName: 1, lastName: 1})
      (source).should.deep.equal({
        firstName: 'bob',
        lastName: undefined
      })
  })

  it('restricts fields', function () {

    var full = {
      a: 1,
      b: 2,
      c: 3
    }

    var f = projector({a: true, c: true })

    f(full).should.not.have.property('b')
    f(full).should.deep.equal({
      a: 1,
      c: 3
    })

  })

  it('can use a transform function', function () {
    var obj = {
      a: 1,
      b: 10,
      c: 100
    }

    var negate = function (x) { return -x }

    projector({a: negate, b: negate})
      (obj)
      .should.deep.equal({a: -1, b: -10})

  })

  describe('.add', function () {
   
    it('creates a function', function () {
      projector.add().should.be.a('function')
    })

    it('augments an object with a calculated field', function () {
      var obj = {
        a: 1
      }

      projector.add({b: function () { return false }})
        (obj)
        .should.deep.equal({
          a: 1,
          b: false
        })


    })
  })
})