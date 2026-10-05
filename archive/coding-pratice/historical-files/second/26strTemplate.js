// 简易字符串模板引擎

// 数据源
const data1 = {
    asd: {
        ddd: {
            e: 'b'
        },
    },
};
const data2 = {
    ccc: 666
}

const template = (str, data) => {
    const path = /\(?=${)\.?(?=\})/g.exec(str)[0]
    str.replace(path, getData(path, data))

    function getData(path, data) {
        path = path.split(".")
        let res = ""
        if (path.length > 0) {
            res = data[path[0]]
        }
        if (path.length > 1) {
            return getData(path.slice(1).join("."), res)
        } else {
            return res
        }
    }
}

// 以下为验证带代码
console.log(template('pre_${data.asd.ddd.e}_tail', data1));
// pre_b_tail
console.log(template('pre_${data.ccc}_tail', data2));
// pre_666_tail