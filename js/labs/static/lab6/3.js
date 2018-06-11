function fib(a){
    if (a <= 2)
        return 1;
    return fib(a-1)+fib(a-2);
}

function main(evt){

    let output = $('output')
    let num = $('.num').val()

    if ( ! (num>0) ){
        output.append('<p>Некоректные данные</p>');
        return;
    }

    let prev = 0;
    let ans = 1;

    for (i=0; i<num; i++)
        [prev, ans] = [ans, prev + ans]

    output.append(`<p>Число фибоначи #${num}: ${fib(num)}</p>`);
}

function bind(){
    $('input[type=submit]').click(main);
}

$(document).ready(bind)
