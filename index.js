"use strict";

var fo = function(orig_el){

    var type = undefined
    if(isObj(orig_el)) {
        type = '{}'
    }
    else if (isArr(orig_el)){
        throw 'only allowing {} for the moment. Best to stick with native.'
        type ='[]'
    }
    else throw 'fo only accepts arrays and objects :S'

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
        var output_is_arr = isArr(output)
        for(var key in orig_el){
            // lets apply the function to the value and add to output
            if(output_is_arr){
                output.push(f(orig_el[key], key, output))
            }
            else output[key] = f(orig_el[key], key, output)
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
        var output_is_arr = isArr(output)
        for(var key in orig_el){
            // lets apply the function to the value and add to output

            // readability over bytes ;)
            if(f(orig_el[key], key) === true){
                if(output_is_arr){
                    output.push(orig_el[key])
                }
                else output[key] = orig_el[key]
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

    //https://stackoverflow.com/questions/4775722/check-if-object-is-array
    function isArr(ob){
        if (Array.isArray)
            return Array.isArray(ob);
        if( Object.prototype.toString.call( ob ) === '[object Array]' ) {
            return true
        }
        return false
    }


    function generate_output(output){
        if(!output){
            if(type === '{}') output = fo({})
            else output = fo([])
        }
        else{
            // need to give existing obj superpowers if they dont already exist
            fo(output)
        }
        return output
    }



    for(var f_nam in functional_Fs) {
        orig_el[f_nam] = functional_Fs[f_nam]
        Object.defineProperty(orig_el, f_nam, {
            enumerable: false,
            writable: true
        });
    }

    return orig_el
}

module.exports = fo