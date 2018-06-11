class Task extends Array{

    constructor(title, description, start, end){
        super();
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
    }

    toString(prefix=''){
        let res = '';
        res += prefix + '[TASK]' + '\n';
        res += prefix + `Title: ${this.title }` + '\n';
        res += prefix + `Description: ${this.description}` + '\n';
        res += prefix + `Start: ${this.start}` + '\n';
        res += prefix + `End: ${this.end}` + '\n';

        if (this.length > 0)
            res += prefix + 'Subtasks:'

        prefix += '\t';
        for (let t of this){
            res += '\n';
            res += t.toString(prefix);
            res += '\n';
        }
        return res;
    }
}


class ProgressTask extends Task{
    constructor(title, description, start, end, progress, completed){
        super(title, description, start, end);
        this.progress = progress;
        this.completed = completed;
    }

    static fromTask(task, progress, completed){
        return new ProgressTask(
            task.title,
            task.description,
            task.start,
            task.end,
            progress,
            completed,
        )
    }

    toString(prefix=''){
        let res = Task.prototype.toString.call(this, prefix);
        res = res.replace(/\[\w*\]/, '[ProgressTask]');
        res += prefix + `Progress: ${this.progress}` + '\n';
        res += prefix + `Comleted: ${this.completed}` + '\n';
        return res;
    }
}

function main(){
    let output = $('output');
    let title = 'Сделать лабу';
    let description = 'Выполнить поставленное руководителем задание';
    let start = new Date(2017, 1, 15);
    let end = new Date(2017, 1, 20);
    let t = new Task(title, description, start, end);
    t.push(new Task('t1', 'd1', new Date(2017, 1, 11), new Date(2017, 1, 12)));
    t2 = new Task('t2', 'd2', new Date(2017, 1, 12), new Date(2017, 1, 13))
    t.push(ProgressTask.fromTask(t2, 0.5, false));
    output.append(`<pre>${t}</pre>`);
}

$(document).ready(main)
