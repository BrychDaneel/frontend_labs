function checkPassword(){
    let pwd1 = $('.pwd1').val();
    let pwd2 = $('.pwd2').val();
    if (pwd1 !== pwd2){
        $('.errors .mismatch').show();
        return false;
    }
}

function bind(){
    $('input[type="submit"]').click(checkPassword);
}

$(document).ready(bind)
