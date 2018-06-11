function main(evt){

    let output = $('output')

    let этажность = parseInt($('.этажность').val())
    let подъезды = parseInt($('.подъезды').val())
    let квартиры = parseInt($('.квартиры').val())
    let номер = parseInt($('.номер').val())

    if ( ! (этажность>0 && подъезды>0 && квартиры && номер>0 ) ){
        output.append('<p>Некоректные данные</p>');
        return;
    }

    if (этажность * подъезды * квартиры < номер){
        output.append('<p>Квартиры не существует</p>');
        return;
    }

    ans = Math.ceil(номер / (этажность * квартиры));
    output.append(`<p>Номер подъезда: ${ans}</p>`);
}

function bind(){
    $('input[type=submit]').click(main);
}

$(document).ready(bind)
