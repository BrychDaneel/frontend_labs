function dec(f, type){
    return function(...args) {
        let output = $('output');

        for (let a of args)
            if (typeof(a) !== type ){
                output.append('<p>Неверный тип</p>');
                throw TypeError('Неверный тип');
            }
            else
                return f(...args);
    }
}

function calc(evt){
    let fun = dec(() => $('output').append('<p>Успех</p>'), $('.type').val());
    let data = eval($(this).attr( "data-user" ));
    let output = $('output');
    fun(...data);
}


function bind(){
    $('input[type="submit"]').click(calc);
}

$(document).ready(bind)
