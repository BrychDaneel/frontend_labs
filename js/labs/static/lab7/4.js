funs = [
    x => Math.sqrt(1.5*x+0.6)/(1.6+Math.sqrt(0.8*x*x+2)),
    x => Math.cos(0.6*x*x+0.4)/(1.4+Math.sin(x+0.7)*Math.sin(x+0.7)),
    x => 1/(Math.sqrt(x*x+1)),
    x => Math.cos(x)/(x+1),
]

methods = [

    function(f, a, b, n){
        let res = 0;
        let h = (b - a) / n;
        x = h;
        for (let i=1; i<=n; i++, x+=h)
            res += f(x - h/2)
        return res * h;
    },

    function(f, a, b, n){
        let h = (b - a) / n;
        let res = (f(a) + f(b)) / 2
        x = h;
        for (let i=1; i<=n-1; i++, x+=h)
            res += f(x)
        return res * h;
    },
]

function calc(evt){
    let output = $('output');
    let f = $('input[name=f]:checked').val();
    let m = $('input[name=method]:checked').val();
    let start = parseFloat( $('.start').val() );
    let stop = parseFloat( $('.stop').val() );
    let step = parseFloat( $('.step').val() );

    let res = methods[m](funs[f], start, stop, step);
    output.append(`<p>${res}</p>`)
}


function bind(){
    $('input[type="submit"]').click(calc);
}

$(document).ready(bind)
