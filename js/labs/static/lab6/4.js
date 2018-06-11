let weekNames = {
        1: 'Понедельник',
        2: 'Вторник',
        3: 'Среда',
        4: 'Четверг',
        5: 'Пятница',
        6: 'Субота',
        7: 'Воскресение',
};

let year = [,31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let startWeekDay = 4;

function main(evt){

    let output = $('#output');
    let month = $('#month').val();
    let day = $('#day').val();

    let w = startWeekDay, d = 1, m = 1;

    if (! (month > 0 && day > 0)){
        output.append('<p>Некорректные данные</p>');
        return;
    }

    while (d != day || m != month){

        w = w % 7 + 1;
        d += 1;
        if (d > year[m]){
            d = 1;
            m += 1;
        }
        if (m > month || m > 12){
            output.append('<p>Неправильная дата</p>');
            return;
        }
    }

    let wname = weekNames[w].toLowerCase();
    output.append(`<p>Это ${wname}</p>`);
}

function bind(){
    $('#submit').click(main);
}

$(document).ready(bind)
