"use strict";

// we first give our object functional functions with fo(my_obj)
// we then can use eg var cloned_and_modded = my_obj.map(function(val, key){ return val+key}).done()
// Above {a: 1, b:2} gives {a:1a, b:2b}
//We need to run done() at the end to provide clean object without functional functions.

var fo = function(orig_el){
    var reservedKeys = ['map', 'forEach', 'filter', 'reduce', 'keys','vals', 'done']
        function isObj(ob){
        return ob !== null && typeof ob === 'object'
    }
    function reserved(ob){
        reservedKeys.forEach(function(r){
            if(ob[r]!==undefined)return true
        })
        return false
    }


    if(!isObj(orig_el)) throw('only currently accepting objects')
    if(reserved(orig_el)) throw('sorry, your object is using 1+ reserved keys ('+reservedKeys.join(",")+")")

    function checks(f, output, what){
        if(!f) throw('not provided a function for obj.' + what)
        if(!output) output = fo({})
        else{
            // need to give existing obj superpowers if they dont already exist
            if(!output[what]) fo(output)
        }
        return output
    }

    var fs = {}

    fs.keys = function(){
        var list = []
            if(reservedKeys.indexOf(key)===-1) list.push(key)
        return key
    }

    fs.vals = function(){
        var list = []
        if(reservedKeys.indexOf(key)===-1) list.push(orig_el[key])
        return list
    }

    // can provide existing obj to be modded in place
    fs.map = function(f, output){
        output = checks(f, output, 'map')
        for(var key in orig_el){
            // lets apply the function to the value and add to output
            output[key] = f(orig_el[key], key, output)
        }
        return output
    }


    fs.forEach = function(f){
        for(var key in orig_el){
            f(orig_el[key], key)
        }
    }



    fs.filter = function(f, output){
        output = checks(f, output, 'filter')

        for(var key in orig_el){
            // lets apply the function to the value and add to output
            if(reservedKeys.indexOf(key)===-1) {
                // readability over bytes ;)
                if(f(orig_el[key], key) === true){
                    output[key] = orig_el[key]
                }
            }
        }
        return output
    }


    fs.reduce = function(f, output){
        if(!f) throw('not provided a function for obj.reduce')
        for(var key in orig_el){
            var result = f(orig_el[key], key, output)
            if (!output) output = result
            else output += result

        }

        return output
    }




    // let's clone, leaving out our custom functions
    fs.done = function (){
        var clone = {}
        for(var key in orig_el){
            clone[key] = orig_el[key]
        }
        return clone
    }

    for(var f_nam in fs) {
        orig_el[f_nam] = fs[f_nam]
        Object.defineProperty(orig_el, f_nam, {
            enumerable: false,
            writable: false
        });
    }


    return orig_el
}

module.exports = fo