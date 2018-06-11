function dec(f){
    return function(a) {
        output = $('output');
        if (typeof(a) !== 'number' ){
            output.append('<p>ЭТО НЕ ЧИСЛО</p>');
            throw TypeError('NaN');
        }
        else
            return f(a);
    }
}

function calc(evt){
    fun = dec(x => x * x);
    data = eval($(this).attr( "data-user" ));
    output = $('output')
    output.append(`<p>${fun(data)}</p>`)
}


function bind(){
    $('input').click(calc);
}

$(document).ready(bind)
