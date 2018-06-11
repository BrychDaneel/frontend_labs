class Vector{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    plus(v2){
        return new Vector(this.x + v2.x, this.y + v2.y, this.z + v2.z);
    }

    scalar(v2){
        return this.x * v2.x + this.y * v2.y + this.z * v2.z;
    }

    toString(){
        return `Vector {x : ${this.x}, y : ${this.y}, z : ${this.z}}`
    }

    valueOf(){
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
}

function get(){
    let output = $('output');

    let x1 = parseFloat( $('.x1').val() );
    let y1 = parseFloat( $('.y1').val() );
    let z1 = parseFloat( $('.z1').val() );

    let x2 = parseFloat( $('.x2').val() );
    let y2 = parseFloat( $('.y2').val() );
    let z2 = parseFloat( $('.z2').val() );

    if (isNaN(x1) || isNaN(y1) || isNaN(z1) ||
        isNaN(x2) || isNaN(y2) || isNaN(z2))
    {
        output.append(`<p>Некоректные данные</p>`);
        return;
    }

    let v1 = new Vector(x1, y1, z1);
    let v2 = new Vector(x2, y2, z2);

    return [v1, v2];
}

function plus(){
    let v1, v2;
    let data = get();
    if (!data)
        return;
    [v1, v2] = data;
    let output = $('.plus output');
    output.empty();
    output.append(`<p>Сумма: ${v1.plus(v2)}</p>`);
}

function scalar(){
    let v1, v2;
    let data = get();
    if (!data)
        return;
    [v1, v2] = data;
    let output = $('.scalar output');
    output.empty();
    output.append(`<p>Произведение: ${v1.scalar(v2)}</p>`);
}

function bind(){
    $('.plus input').click(plus);
    $('.scalar input').click(scalar);
}

$(document).ready(bind)
