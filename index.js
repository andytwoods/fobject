"use strict";

// we first give our object functional functions with fo(my_obj)
// we then can use eg var cloned_and_modded = my_obj.map(function(val, key){ return val+key}).done()
// Above {a: 1, b:2} gives {a:1a, b:2b}
//We need to run done() at the end to provide clean object without functional functions.

var fo = function(orig_el){

    function isObj(ob){
        return ob !== null && typeof ob === 'object'
    }

    function reserved(ob){
        for(var key in functional_Fs) {
            if (ob[key] !== undefined) return true
        }
        return false
    }

    if(!isObj(orig_el)) throw('only currently accepting objects')
    if(reserved(orig_el)){
        throw('sorry, your object is using 1+ reserved keys ('+fo(functional_Fs).keys().join(",")+")")
    }

    function checks(f, output, what){
        if(!f) throw('not provided a function for obj.' + what)
        if(!output) output = fo({})
        else{
            // need to give existing obj superpowers if they dont already exist
            if(!output[what]) fo(output)
        }
        return output
    }

    var functional_Fs = {}

    functional_Fs.keys = function(){
        var list = []
            list.push(key)
        return key
    }

    functional_Fs.vals = function(){
        var list = []
        list.push(orig_el[key])
        return list
    }

    // can provide existing obj to be modded in place
    functional_Fs.map = function(f, output){
        output = checks(f, output, 'map')
        for(var key in orig_el){
            // lets apply the function to the value and add to output
            output[key] = f(orig_el[key], key, output)
        }
        return output
    }


    functional_Fs.forEach = function(f){
        for(var key in orig_el){
            f(orig_el[key], key)
        }
    }



    functional_Fs.filter = function(f, output){
        output = checks(f, output, 'filter')

        for(var key in orig_el){
            // lets apply the function to the value and add to output

            // readability over bytes ;)
            if(f(orig_el[key], key) === true){
                output[key] = orig_el[key]
            }

        }
        return output
    }


    functional_Fs.reduce = function(f, output){
        if(!f) throw('not provided a function for obj.reduce')
        for(var key in orig_el){
            var result = f(orig_el[key], key, output)
            if (!output) output = result
            else output += result

        }

        return output
    }


    // let's clone, leaving out our custom functions
    functional_Fs.done = function (){
        var clone = {}
        for(var key in orig_el){
            clone[key] = orig_el[key]
        }
        return clone
    }

    for(var f_nam in functional_Fs) {
        orig_el[f_nam] = functional_Fs[f_nam]
        Object.defineProperty(orig_el, f_nam, {
            enumerable: false,
            writable: false
        });
    }


    return orig_el
}

module.exports = fo