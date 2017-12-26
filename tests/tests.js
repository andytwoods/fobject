var test = require('tape');
var fo = require('fobject')


test('object tests', function (t) {
    t.plan(6);

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


    obj = fo({a:1, b:2, c: 3})

    var computed = obj.filter(function(val, key, final_obj){return val>1}).map(function(val, key, final_obj){
        final_obj[key+'_squared_key'] = String(val * val)+key
        return val*val
    }).done()

    t.deepEqual(computed, { b_squared_key: '4b', b: 4, c_squared_key: '9c', c: 9 })
});

