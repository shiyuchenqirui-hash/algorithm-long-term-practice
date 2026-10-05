class Task {
    constructor() {
        this.tasks = []
        this.flag = false
    }
    add(fn, context, ...args) {
        this.tasks.push({ fn, context, args })
        return this
    }
    async run() {
        this.flag = true
        if (this.tasks.length > 0) {
            const task = this.tasks.shift()
            task.fn.call(task.context, () => {
                if (this.flag) { this.run() }
            }, ...task.args)
        }
    }
    stop() {
        this.flag = false
    }
}

function task1(next) {
    setTimeout(() => {
        console.log(1)
        next()
    }, 1000)
}
function task2(next, b) {
    setTimeout(() => {
        console.log(b)
        next()
    }, 1000)
}
let task = new Task()
task.add(task1).add(task2, null, 3)
task.run()