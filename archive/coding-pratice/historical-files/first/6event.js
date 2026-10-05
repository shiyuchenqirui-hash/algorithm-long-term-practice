// 新建event类，具备 on、once等方法
class Event {
    constructor() {
        this.cbs = {}
        this.onceCbs = {}
    }
    on(event, callback) {
        if (this.cbs.hasOwnProperty(event)) {
            this.cbs[event].push(callback)
        } else {
            this.cbs[event] = [callback]
        }
    }
    once(event, callback) {
        if (this.onceCbs.hasOwnProperty(event)) {
            this.onceCbs[event].push(callback)
        } else {
            this.onceCbs[event] = [callback]
        }
    }
    trigger(event) {
        if (this.cbs.hasOwnProperty(event)) {
            const cbs = this.cbs[event]
            for (let cb of cbs) {
                cb.apply(this)
            }
        }
        if (this.onceCbs.hasOwnProperty(event)) {
            const cbs = this.onceCbs[event]
            while (cbs.length) {
                cbs.shift().apply(this)
            }
        }
    }
    remove(event, fun) {
        if (this.cbs.hasOwnProperty(event)) {
            for (let i = 0, len = this.cbs[event].length; i < len; i++) {
                if (this.cbs[event][i] === fun) {
                    this.cbs[event].splice(i, 1)
                }
            }
        }
        if (this.onceCbs.hasOwnProperty(event)) {
            for (let i = 0, len = this.onceCbs[event].length; i < len; i++) {
                if (this.onceCbs[event][i] === fun) {
                    this.onceCbs[event].splice(i, 1)
                }
            }
        }
    }
    removeAll(event) {
        if (event) {
            this.cbs[event] = []
            this.onceCbs[event] = []
        } else {
            this.cbs = {}
            this.onceCbs = {}
        }
    }
}

// 以下为验证代码
const eve = new Event()
const fun1 = () => { console.log("trigger click1") }
eve.on("click", fun1)
eve.on("click", () => { console.log("trigger click2") })
eve.once("click", () => { console.log("trigger click once") })
eve.remove("click", fun1)
eve.trigger("click")
eve.trigger("click")


