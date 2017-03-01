// REQUIRES pearl.js & pearl.gui.js
// a wait screen covers up a page while any process running in background, e.g. ajax calls
pearl = pearl || {};
pearl.gui = pearl.gui || {};
pearl.gui.wait = pearl.gui.wait || (function(pearl, $, document) {
    'use strict';

    // the obligatory function
    function debugInfo() {
        pearl.debugInfo.call(this);
    }

    function getWaitScreen() {
        var waitElement = document.getElementById('wait');
        if (!waitElement) {
            $.ajax({'url':pearl.contextPath + "/inc/wait_html.jsp", 'async':false}).done(function(data) {
                $("body", document).append($(data));
                waitElement = document.getElementById('wait');
            });
        }
        return waitElement;
    }

    function getProgressBar(waitElement) {
        return waitElement.getElementsByTagName("PROGRESS")[0];
    }

    function validateProgressState(progressElement, state) {
        if (!pearl.isNumeric(state)) {
            return null;
        }
        if (state <= 0) {
            return 0;
        }
        var max = progressElement.getAttribute("max");
        if (!pearl.isNumeric(max)) progressElement.setAttribute("max", "100");
        if (state >= max) {
            return max;
        }
        return state;
    }

    /**
    * @param {Number} state - enables a wait screen with a progress bar with a state value
    * @example
    * pearl.gui.wait.on(1);
    */
    function waitOn(state) {
        var waitElement = getWaitScreen();
        if (!waitElement) {
            return;
        }
        var progressElement;
        if (state) {
            progressElement = getProgressBar(waitElement);
            state = validateProgressState(progressElement, state);
        }
        if (!state || !progressElement) {
            $(waitElement).show();
            return;
        }
        if (progressElement) {
            progressElement.setAttribute("value", state);
            document.getElementById("progressvalue").innerHTML = Math.floor(state)+"%";
        }
        $(waitElement).show();
    }

    function waitOff() {
        var waitElement = getWaitScreen();
        if (!waitElement) {
            return;
        }
        var progressElement = getProgressBar(waitElement);
        if (progressElement) {
            progressElement.setAttribute("value", 0);
        }
        $(waitElement).hide();
    }

    return {
        name: "pearl.gui.wait",
        debugInfo: debugInfo,
        on: waitOn,
        off: waitOff
    };
})(pearl, jQuery, document);