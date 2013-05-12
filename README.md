# projector
relational algebra-inspired object modification!

## usage

    var projector = require('projector')

    var secretUser = {
      _id: 5,
      name: 'bob',
      hashedPassword: 'ediojjf'
      favoriteBand: 'Spice Girls'
      bio: 'some really long thing, it goes on for paragraphs'
    }

    var sanitize = projector({
      _id: true,
      name: true,
      bio: function (bio) { return bio.substr(0,30) + '...' }
    })

    var safeUser = sanitize(secretUser)


## api
using [jsig](https://github.com/jden/jsig)

### `projector (projection: Object) => (Object) => Object` 

Creates a function which limits the resulting object to the specified keys. Similar to MongoDB's [`fields` object](http://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html#making-queries-with-find)

### `projector.add (map: Object) => (Object) => Object`

Creates a function which adds a field or fields to an object. The leaf nodes on the `map` argument object must be functions, which are called on the original object.

## installation

    $ npm install projector


## running the tests

From package root:

    $ npm install
    $ npm test


## contributors

- jden <jason@denizac.org>


## license

MIT. (c) 2013 jden <jason@denizac.org>. See LICENSE.md

## bonus
[SLYT](http://www.youtube.com/watch?v=rSZ-yjuTCa4)