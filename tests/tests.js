var test = require('tape');
var fo = require('fobject')


test('object tests', function (t) {
    t.plan(7);

    var obj = {a:1, b:2}
    fo(obj)
    // check map works
    var result = obj.map(function(a){return 1})
    t.deepEqual(result.done(),{a:1, b:1})

    result = fo({a:1, b:2}).map(function(a, b){return a+b})
    t.deepEqual(result.done(),{a:'1a', b:'2b'})

    // check filter works
    result = obj.filter(function(a){ return a>1}).done()
    t.equal(result['b'],2)
    t.equal(result['a'],undefined)


    // check (v unorthodox) reduce works
    result = fo({a:1, b:2}).reduce(function(a, b){
        return a+b
    })

    t.equals(result, '1a2b')


    // check adds and removes all the reserved methods

    var modded = fo({a:1})

    var counter = 0
    for(var key in modded){
        counter++
    }
    t.true(counter>1)
    var should_be_orig = modded.done()
    counter = 0
    for(key in should_be_orig){
        counter++
    }
    t.equals(counter,1)
});