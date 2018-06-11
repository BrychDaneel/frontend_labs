function range(start, stop, step=1){
    res = [];
    for (let i=start; step>=0 ? i<=stop : i>=stop; i+=step)
        res.push(i);
    return res;
}

function main(evt){
    let output = $('output');

    let start = parseFloat( $('.start').val() );
    let stop = parseFloat( $('.stop').val() );
    let step = parseFloat( $('.step').val() );

    if (isNaN(start) || isNaN(stop) || isNaN(step)){
        output.append(`<p>Некоректные данные</p>`);
        return;
    }

    if (!step)
        res = range(start, stop);
    else
        res = range(start, stop, step);

    output.append(`<p>[${res}]</p>`)
}


function bind(){
    $('input[type="submit"]').click(main);
}

$(document).ready(bind)
