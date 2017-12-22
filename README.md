# FObject

Dropping down to for loops with objects is a pain. A minimal  functional toolbelt for objects... that gives you the final object to play with alongside keys and vals.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

A step by step series of examples that tell you have to get a development env running

Install locally

```
npm install funobjects
```

Lets import
```
var fo = require('fobject')
```


Then start using
```
var obj = {a:1, b:2}
var fobj = fo(obj)
result = fobj.map(function(a, b){return a+b})
//output:{a:'1a', b:'2b'}
```

Then start using with a deadline and after a few cups of coffee
```
var obj = {a:1, b:2}
var fobj = fo(obj)
result = fobj.map(function(a, b, output){
    output[b] = 'hello!'
    return a+b
    }
)
//output:{a:'1a', b:'2b', '1b': 'hello!', '2b': 'hello!'}
```


## Running the tests

Tests done with Tape
```
npm tests/*.js
```

