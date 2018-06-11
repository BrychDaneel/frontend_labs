let count;
let n;

function f(x, count){
    let y = 1;
    let yx = 1;
    let fact = 1;
    let m = 1;
    for (i=1; i<=count; i++){
        yx *= x * x;
        fact *= (i*2-1)*(i*2);
        m *= -1;
        y += m * yx / fact;
    }
    return y;
}

function main(evt){
    count = $('#count').val();
    n = $('#n').val();
    if (! (n > 0 && count > 0)){
        errors = $('.errors').append("Invalid parametrs");
        $('.input .main').hide();
        return;
    }
    $('.main .input').hide();
    $('.iter').show();

    $('.main').append(
        `<p>Количество членов ряда: ${count}<p/>` +
        `<p>Сколько чисел вычислить: ${n}<p/>`
    )
}

function iter(){

    n -= 1;
    input = $('.iter .input')
    x = $('#x').val();

    if (!isFinite(x)){
        errors = $('.errors').append("Invalid argument");
        input.hide();
        return;
    }

    input.before(`<p>Агрумент: ${x}, f = ${f(x, count)}</p>`);

    if (n <= 0)
        input.hide();
}

function bind(){
    $('.main .submit').click(main);
    $('.iter .submit').click(iter);
}

$(document).ready(bind)
