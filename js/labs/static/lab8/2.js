function createMatrix(n, m){
    res = [];
    for (let i=0; i<n; i++){
        s = [];
        res.push(s);
        for (let ii=0; ii<m; ii++)
            s.push(Math.floor(Math.random() * 100))
    }
    return res;
}

function outMatrix(output, mat){
    output.empty();
    for (let s of mat){
        output.append(`<p>`);
        for (let a of s){
            str = a.toFixed(2);
            while (str.length < 5)
                str = "0" + str;
            output.append(`${str}, `);
        }
        output.append(`</p>`);
    }

}

function sort(mat){
    let n = mat.length;
    let m = mat[0].length;
    for (let i=0; i<n; i++)
        for (let ii=i+1; ii<n; ii++)
            if (Math.max(...mat[i]) > Math.max(...mat[ii])){
                let w = mat[i];
                mat[i] = mat[ii];
                mat[ii] = w;
            }
}

function main(evt){
    let output = $('output');

    let n = parseInt( $('.n').val() );
    let m = parseInt( $('.m').val() );

    if (isNaN(n) || isNaN(m)){
        output.append(`<p>Некоректные данные</p>`);
        return;
    }

    let mat = createMatrix(n, m);
    outMatrix($('.matrix'), mat);

    sort(mat);

    outMatrix($('.result'), mat);
}


function bind(){
    $('input[type="submit"]').click(main);
}

$(document).ready(bind)
