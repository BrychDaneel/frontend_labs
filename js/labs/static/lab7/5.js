function main(evt){
    let output = $('output');
    let text = $('.text').val();
    let substr = $('.substr').val();
    let symbol = $('.symbol').val();

    if (!symbol){
        output.append(`<p>Нет буквы</p>`)
        return;
    }
    let res = text.replace(new RegExp(symbol, 'g'), '$&' + substr);
    output.append(`<p>${res}</p>`)
}


function bind(){
    $('input[type="submit"]').click(main);
}

$(document).ready(bind)
