var spins = document.getElementsByClassName("wrapInp");

function setHandlers(wrapInp){
    return function(){
        var span = wrapInp.getElementsByTagName("div"),
            input = wrapInp.getElementsByTagName("input")[0];

        input.onchange = function() { input.value = +input.value || 0;};
        span[0].onclick = function() { input.value = Math.max(0, input.value - 1); };
        span[1].onclick = function() { input.value -= -1; };
    }
}

for (var i = 0, len = spins.length; i < len; i++) {
    setHandlers(spins[i])();
}


