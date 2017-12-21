var fo = (function(orig_el){
    var reservedKeys = ['map', 'forEach', 'filter', 'done']
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




    // can provide existing obj to be modded in place
    function map(f, output){
        if(!f) throw('not provided a function for obj.map')
        if(!output) output = fo({})
        else{
            // need to give existing obj superpowers if they dont already exist
            if(!output['map']) fo(output)
        }
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
        if(!f) throw('not provided a function for obj.map')
        if(!output) output = fo({})
        else{
            // need to give existing obj superpowers if they dont already exist
            if(!output['map']) fo(output)
        }

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
    orig_el.done = done

    return orig_el
})