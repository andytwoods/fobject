# FObject

Dropping down to for loops with objects is a pain / leads to loud exclamations of FO. A minimal chainable no nonsense functional toolbelt for objects, giving you access final object mid 'loop'.

## Getting Started

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

Annoying if you want an array as output? No problem
```
var obj = {a:1, b:2}
var fobj = fo(obj)
result = fobj.map(function(a, b, output){
    output[b] = 'hello!'
    return a+b
    },
    []
)
//output:['1a', '2b', 'hello!', 'hello!']
```


Let's start chaining
```
    obj = fo({a:1, b:2, c: 3})

    var computed = obj.filter(function(val, key, final_obj){return val>1}).map(function(val, key, final_obj){
        final_obj[key+'_squared_key'] = String(val * val)+key
        return val*val
    }).done()

    //output: { b_squared_key: '4b', b: 4, c_squared_key: '9c', c: 9 })
```



## Running the tests

Tests done with Tape
```
npm tests/*.js
```

