function main(evt){
    text = $('.text').val();
    if (/[^01]/.test(text)){
        $('output').append('<p>Некорректная строка</p>');
        return;
    }

    $('output').empty();
    for (m of text.match(/((00)+|(11)+)/g)){
        $('output').append(`<p>${m}</p>`)
    }
}


function bind(){
    $('.submit').click(main);
}

$(document).ready(bind)
