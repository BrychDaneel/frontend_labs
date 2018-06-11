function hide(){
    $('.input').detach();
}

function main(evt){
    let text1 = $('.input .first').val()
    let text2 = $('.input .second').val()
    output = $('.output')

    if (isNaN(text1)){
        hide();
        output.append('<p>ОШИБКА: первое поле не число</p>')
        return
    }

    if (isNaN(text2)){
        hide();
        output.append('<p>ОШИБКА: второе поле не число</p>')
        return
    }

    if (text1 > text2){
        output.append('<p>Первое число больше</p>')
        return
    }

    if (text1 < text2){
        output.append('<p>Второе число больше</p>')
        return
    }

    hide();
    output.append('Успешное заверщение!')
}

function bind(){
    $('input[type=submit]').click(main);
}

$(document).ready(bind)
