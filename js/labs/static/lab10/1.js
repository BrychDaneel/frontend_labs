class TreeNode{
    constructor(weight){
        this.weight = weight;
    }

    valueOf(){
        return this.weight;
    }

    static leaf(symb, weight){
        let res = new TreeNode(weight);
        res.symb = symb;
        return res;
    }

    static plus(tn1, tn2){
        let res = new TreeNode(tn1.weight + tn2.weight);
        res.left = tn1;
        res.right = tn2;
        return res;
    }

    find(symb){

        if (this.symb === symb)
            return [];

        if (this.symb)
            return;

        let res = this.left.find(symb);
        if (res)
            return [0].concat(res);

        res = this.right.find(symb);
        if (res)
            return [1].concat(res);
    }
}


function main(){

    let output = $('.frenc output');
    output.empty();

    let text = $('.in').val();

    let symbs = new Set(text);
    let cnt = new Map();
    symbs.forEach((c) => cnt.set(c, text.match(new RegExp(c, 'g')).length));

    $('.frenc thead tr').empty();
    $('.frenc tbody tr').empty();
    [...cnt.keys()]
        .sort()
        .forEach(
            function (c){
                $('.frenc thead tr').append(`<th>${c}</th>`);
                $('.frenc tbody tr').append(`<td>${cnt.get(c)}</td>`);
            }
        )

    let nodes = new Set([...cnt.keys()].map( c => TreeNode.leaf(c, cnt.get(c)) ));

    while (nodes.size > 1){
        let n1 = [...nodes.values()].reduce(
            (min, n) => min.weight > n.weight ? n : min
        );
        nodes.delete(n1);

        let n2 = [...nodes.values()].reduce(
            (min, n) => min.weight > n.weight ? n : min
        );
        nodes.delete(n2);

        nodes.add(TreeNode.plus(n1, n2));
    }

    let node = nodes.values().next().value;

    let table = new Map([...cnt.keys()].map(
        c => [c, node.find(c).join('')]
    ));

    $('.res thead tr').empty();
    $('.res tbody tr').empty();
    [...cnt.keys()]
        .sort()
        .forEach(
            function (c){
                $('.res thead tr').append(`<th>${c}</th>`);
                $('.res tbody tr').append(`<td>${table.get(c)}</td>`);
            }
        );

    let res = [...text].map(c => table.get(c)).join('');
    $('.encode').text(res);
}

function bind(){
    $('input[type="submit"]').click(main);
}

$(document).ready(bind)
