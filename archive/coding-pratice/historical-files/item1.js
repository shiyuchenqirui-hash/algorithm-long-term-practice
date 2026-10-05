// 并发控制器，同一时间只有5个请求
window.download = (url, params) => {
    return new Promise((resolve, reject) => {
        let t = setTimeout(() => {
            resolve(url)
        }, 300)
    })
}

const request = function (options = { pool: 5 }) {
    const { pool } = options // 最大并发限制
    let count = 0 // 当前占用并发数量
    const tasks = []

    async function run() {
        if (tasks.length == 0) { // 无任务则len占用量减1，这样新增任务的时候，可以使用
            count--
            return
        }
        const { url, params, resolve } = tasks.shift()
        const res = await window.download(url, params)
        run()
        resolve(res)
    }

    return (url, params) => {
        return new Promise((resolve) => {
            tasks.push({ url, params, resolve })
            if (count < pool) {
                count++
                run()
            }
        })
    }
}

const requestAjax = request({ pool: 5 })

for (let i = 0; i < 20; i++) {
    requestAjax(`https://www.baidu.com/${i}`, {}).then((res) => {
        console.log(res)
    })
}
