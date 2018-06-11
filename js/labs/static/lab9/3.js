class People{

    constructor(name, age, weight, height, habits, sex){
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.habits = habits;
        this.sex = sex;
    }

    static fromObj(obj){
        return new People(obj.name, obj.age,
                          obj.weight, obj.height, obj.habits, obj.sex
                         );
    }

    isEqual(minAge, maxAge, minHeight, maxHeight, minWeight, maxWeight, sex){
        return (
            minAge <= this.age && this.age <= maxAge &&
            minHeight <= this.height && this.height <= maxHeight &&
            minWeight <= this.weight && this.weight <= maxWeight &&
            this.sex == sex
        );
    }

    toString(){
        let res = '[People]';
        res += `\nИмя: ${this.name}`;
        res += `\nПол: ${this.sex ? 'мужской' : 'женский'}`;
        res += `\nВозраст: ${this.age}`;
        res += `\nРост: ${this.height}`;
        res += `\nВес: ${this.weight}`;
        res += `\nО себе:\n ${this.habits}\n`;
        return res;
    }
}



function findMatchs(minAge, maxAge, minHeight, maxHeight, minWeight, maxWeight, sex){
    $.getJSON('/peoples/list').done(
        function( data ){
            output = $('output');
            data
                .map((o) => People.fromObj(o))
                .filter((p) => p.isEqual(minAge, maxAge, minHeight, 
                                         maxHeight, minWeight, maxWeight, sex))
                .forEach((p) => output.append(`<pre>${p}</pre>`));
        }
    );
}

function main(){

    let output = $('output');
    output.empty();

    let minAge = parseFloat( $('.minAge').val() );
    let maxAge = parseFloat( $('.maxAge').val() );

    let minHeight = parseFloat( $('.minHeight').val() );
    let maxHeight = parseFloat( $('.maxHeight').val() );

    let minWeight = parseFloat( $('.minWeight').val() );
    let maxWeight = parseFloat( $('.maxWeight').val() );

    let sex = $('.sex').is(':checked');

    if (isNaN(minAge) || isNaN(maxAge) || isNaN(minHeight) || 
        isNaN(maxHeight) || isNaN(minWeight) || isNaN(maxWeight))
    {
        output.append('<p>Ошибка ввода</p>')
        return;
    }

    findMatchs(minAge, maxAge, minHeight, maxHeight, minWeight, maxWeight, sex);
}

function bind(){
    $('input[type="submit"]').click(main);
}

$(document).ready(bind)
