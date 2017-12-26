"use strict";

var fo = function(orig_el){

    var id = '__functional_Objects__'

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
        output = generate_output(output)
        checks(f, 'map')
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
        output = generate_output(output)
        checks(f, 'filter')

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

    function generate_output(output){
        if(!output) output = fo({})
        else{
            // need to give existing obj superpowers if they dont already exist
            if(!output[id]) fo(output)
        }
        return output
    }

    function checks(f, what){
        if(!f) throw('not provided a function for obj.' + what)
    }


    for(var f_nam in functional_Fs) {
        orig_el[f_nam] = functional_Fs[f_nam]
        Object.defineProperty(orig_el, f_nam, {
            enumerable: false,
            writable: false
        });
    }

    //need a way to identify FO objects
    orig_el[id] = true
    Object.defineProperty(orig_el, id, {
        enumerable: false,
        writable: false
    });


    return orig_el
}

module.exports = fo