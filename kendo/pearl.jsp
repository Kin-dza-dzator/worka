var pearl = pearl || (function(console) {
    'use strict';

    function debugInfo() {
        if (typeof console !== 'undefined') {
            console.log(this.name + " = " + JSON.stringify(this));
        }
    }

    function debugMsg(message) {
        if (this.debug && typeof console !== 'undefined') {
            console.log((new Date()).toLocaleString(), Array.prototype.slice.call(arguments));
        }
    }

    /**
     * Replaces a comma with a dot in a numeric string and parse it into a number.
     * For example: '123,45' => 123.45
     * @param numValue A string with a number in it.
     * @returns The parsed float number. Or NULL if "numValue" was empty.
     */
    function dotNumber(numValue) {
        if (typeof numValue === 'number') {
            return numValue;
        }
        if (typeof numValue !== 'string' || numValue.length === 0) {
            return null;
        }

        var p = numValue.indexOf(',', 0);
        if (p >= 0) {
            numValue = numValue.substring(0, p) + '.' + numValue.substring(p+1, numValue.length);
        }
        return parseFloat(numValue, 10);
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    /**
     * Creates an array of Node elements from the input.
     * @param elements      Either one element. Or an array or jQuery result with any number of elements.
     * @returns {Node[]}    Array
     */
    function asNodeArray(elements)
    {
        var arr = [];
        if (elements instanceof jQuery) { // typeof jQuery === 'function' &&
            arr = elements.toArray();
        } else if (Array.isArray(elements)) {
            arr = elements.slice();
        } else if (elements instanceof Node) {
            arr.push(elements);
        }
        return arr.filter(function (item) {
            return item instanceof Node;
        });
    }

    /**
     * Concatenate two arrays and filter out all duplicate entries.
     * The entries of array A wins on duplicates.
     * @param {Array}   Array A.
     * @param {Array}   Array B.
     * @returns {Array} An array containing all unique entries from both arrays.
     */
    function arrayMerge(arrayA, arrayB) {
        if (!Array.isArray(arrayB)) { return arrayA; }
        if (!Array.isArray(arrayA)) { return arrayB; }

        return arrayA.concat(arrayB.filter(function (item) {
            return arrayA.indexOf(item) < 0;
        }));
    }

    /**
     * Parse the name of the current browser from the User Agent.
     * @param {string=} userAgent    The User-Agent of the browser to check. Do not pass this parameter to use the current User Agent.
     * @returns {string} The normalized browser name. "Opera", "Edge", "Chrome", "Safari", "Firefox", "Internet Explorer" or "Other".
     */
    function getNormalizedBrowserName(userAgent)
    {
        userAgent = userAgent || window.navigator.userAgent;

        if (userAgent.indexOf('Opera') >= 0 || userAgent.indexOf('OPR/') >= 0) {
            return 'Opera';
        } else if (userAgent.indexOf('Edge') >= 0) {
            return 'Edge';
        } else if (userAgent.indexOf('Chrome') >= 0) {
            return 'Chrome';
        } else if (userAgent.indexOf('Safari') >= 0) {
            return 'Safari';
        } else if (userAgent.indexOf('Firefox') >= 0 || userAgent.indexOf('Iceweasel') >= 0 || userAgent.indexOf('SeaMonkey') >= 0) {
            return 'Firefox';
        } else if (userAgent.indexOf('MSIE') >= 0 || userAgent.indexOf('Trident/7') >= 0) {
            return 'Internet Explorer';
        }
        return 'Other';
    }

    return {
        name : "pearl",
        contextPath : '<%=request.getContextPath()%>',
        debug : false,
        debugInfo : debugInfo,
        debugMsg : debugMsg,
        dotNumber : dotNumber,
        isNumeric: isNumeric,
        asNodeArray: asNodeArray,
        arrayMerge: arrayMerge,
        getNormalizedBrowserName: getNormalizedBrowserName
    }
})(console);