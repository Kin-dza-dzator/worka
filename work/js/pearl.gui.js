// REQUIRES pearl.js

pearl.gui = pearl.gui || (function(pearl, window) {
    'use strict';

    // the obligatory function
    function debugInfo() {
        pearl.debugInfo.call(this);
    }

    /**
     * This function writes an additional style block to the page header
     * @param {String} style - with a CSS rules
     */
    function putStyle(style) {
        $('html > head', window.document).append("<style>" + style + "</style>");
    }

    return {
        name: 'pearl.gui',
        debugInfo: debugInfo,
        putStyle: putStyle
    };
})(pearl, window);