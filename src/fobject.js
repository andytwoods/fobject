// we first give our object functional functions with fo(my_obj)
// we then can use eg var cloned_and_modded = my_obj.map(function(val, key){ return val+key}).done()
// Above {a: 1, b:2} gives {a:1a, b:2b}
//We need to run done() at the end to provide clean object without functional functions.




var fo = (function(orig_el){
    var reservedKeys = ['map', 'forEach', 'filter', 'reduce', 'done']
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



    // can provide existing obj to be modded in place
    function map(f, output){
        checks(f, output, 'map')
        for(var key in orig_el){
            // lets apply the function to the value and add to output
            if(reservedKeys.indexOf(key)===-1) {
                output[key] = f(orig_el[key], key)
            }
        }
        return output
    }


    function forEach(f){
        for(var key in orig_el){
            if(reservedKeys.indexOf(key)===-1) {
                f(orig_el[key], key)
            }
        }
    }



    function filter(f, output){
        checks(f, output, 'filter')

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

    
    function reduce(f, output){
        checks(f, output, 'reduce')
        var ongoing
        for(var key in orig_el){
            if(!ongoing) ongoing = f(orig_el[key], key)
            else ongoing += f(orig_el[key], key)
        }
        return ongoing
    }




    // let's clone, leaving out our custom functions
    function done(){
        var clone = {}
        for(var key in orig_el){
           if(reservedKeys.indexOf(key)===-1){
               clone[key] = orig_el[key]
           }
        }
        console.log(clone,22)
        return clone
    }

    orig_el.map = map
    orig_el.forEach = forEach
    orig_el.filter = filter
    orig_el.reduce = reduce
    orig_el.done = done

    return orig_el
})