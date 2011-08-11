// UTCDate is simple class, which represents datetime in UTC.
// It conforms standard Date api.
// Thanks to Alexander Solovyov (piranha, solovyov.net) for his help
// with this piece of code.

// Public Domain.

var UTCDate = (function () {

    var method_mapping = {
        getHours: 'getUTCHours',
        getDate: 'getUTCDate',
        getDay: 'getUTCDay',
        getFullYear: 'getUTCFullYear',
        getMilliseconds: 'getUTCMilliseconds',
        getMinutes: 'getUTCMinutes',
        getMonth: 'getUTCMonth',
        getSeconds: 'getUTCSeconds',
        toDateString: 'toUTCString',
        toString: 'toUTCString',
        getMonth: 'getUTCMonth',

        setDate: 'setUTCDate',
        setFullYear: 'setUTCFullYear',
        setHours: 'setUTCHours',
        setMilliseconds: 'setUTCMilliseconds',
        setMinutes: 'setUTCMinutes',
        setMonth: 'setUTCMonth',
        setSeconds: 'setUTCSeconds'
    }

    // Methods, which are oresent in prototype, but somehow
    // aren't visible during iteration
    var additional_methods = {
        getTime: null,
        setTime: null
    };

    var UTCDate = function(date) {
        if(date) {
            if (date instanceof UTCDate) {
                this.inner = date.inner;
            } else {
                this.inner = new Date(date);
            }
        } else {
            this.inner = new Date();
        }
    }

    UTCDate.prototype.getTimezoneOffset = function(){
        return 0;
    }

    for (var k in method_mapping) {
        (function(key) {
            UTCDate.prototype[key] = function() {
                return this.inner[method_mapping[key]].apply(this.inner, arguments);
            }
        })(k);
    }

    for (var k in additional_methods) {
        (function(key) {
            UTCDate.prototype[key] = function() {
                return this.inner[key].apply(this.inner, arguments);
            }
        })(k);
    }

    for (var k in Date.prototype) {
        (function(key){
            if (!UTCDate.prototype[key]) {
                UTCDate.prototype[key] = function() {
                    return this.inner[key].apply(this.inner, arguments);
                }
            }
        })(k);
    }

    for (var k in Date) {
        (function(key) {
            if (!UTCDate.prototype[key]) {
                UTCDate.prototype[key] = function() {
                    return this.inner[key].apply(this.inner, arguments);
                }
            }
        })(k);
    }

    return UTCDate;
})();
