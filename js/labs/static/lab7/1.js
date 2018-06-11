function isRect(rect){
    let ex = rect[0].x === rect[1].x;
    for (i=0; i<3; i++){
        if (ex && rect[i].x !== rect[i+1].x)
            return false;
        if (!ex && rect[i].y !== rect[i+1].y)
            return false;
        if (rect[i] === rect[i+1])
            return false;
        ex = ex ? false : true;
    }

    return ex ? rect[3].x === rect[0].x : rect[3].y === rect[0].y;
}

function check(evt){
    let output = $(".rect .output");
    output.empty()
    let points = []
    for (i=1; i<=4; i++){
        let x = $(`.rect .p${i} .x`).val();
        let y = $(`.rect .p${i} .y`).val();

        if (!x || !y){
            output.append('ОШАБКА: Пустые данные');
            return false;
        }

        if (!isFinite(x) || !isFinite(y)){
            output.append('ОШАБКА: Неверные данные');
            return false;
        }
        points.push({x: x, y: y});
    }

    if (isRect(points)){
        output.append('<p>Это прямоугольник</p>');
        return true;
    }
    else{
        output.append('<p>Это НЕ прямоугольник</p>');
        return false;
    }

}

function inr(evt){
    let output = $(".point .output");
    if (!check()){
        output.append('<p>Прямоугольник не корректен</p>');
        return;
    }

    let points = []
    for (i=1; i<=4; i++){
        let x = parseFloat($(`.rect .p${i} .x`).val());
        let y = parseFloat($(`.rect .p${i} .y`).val());
        points.push({x: x, y: y});
    }


    let x = parseFloat($(`.point .x`).val());
    let y = parseFloat($(`.point .y`).val());
    if (!x || !y){
        output.append('ОШАБКА: Пустые данные');
        return false;
    }
    if (!isFinite(x) || !isFinite(y)){
        output.append('ОШАБКА: Неверные данные');
        return false;
    }

    let minX = Math.min(...points.map(p => p.x));
    let maxX = Math.max(...points.map(p => p.x));
    let minY = Math.min(...points.map(p => p.y));
    let maxY = Math.max(...points.map(p => p.y));

    if (minX <= x && x <= maxX && minY <= y && y <= maxY)
        output.append('<p>Точка принадлежит прямоугольнику</p>');
    else
        output.append('<p>Тока НЕ принадлежит прямоугольнику</p>');
}

function bind(){
    $('.check').click(() => check());
    $('.in').click(inr);
}

$(document).ready(bind)
