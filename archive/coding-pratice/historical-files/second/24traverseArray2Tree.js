// 笔试题1：
const arr = [
    { "province": "四川省", "city": "成都市", "county": "金牛区" },
    { "province": "四川省", "city": "绵阳市", "county": "平武县" },
    { "province": "上海市", "city": "上海市", "county": "长宁区" },
];
// 将上述结构，转成如下结构：
[{
    key: 'province',
    name: '四川省',
    children: [{
        key: 'city',
        name: '成都市',
        children: [{
            key: 'county',
            name: '金牛区',
        }],
    }, {
        key: 'city',
        name: '绵阳市',
        children: [{
            key: 'county',
            name: '平武县',
        }],
    }],
}]

// 核心思路：逐层处理，无特殊思路
function solution(arr) {
    const res = []
    for (let item of arr) {
        // 省
        let province = res.find((temp) => {
            return temp === item.province
        })
        if (!province) {
            province = { key: "province", name: item.province, children: [] }
            res.push(province)
        }
        // 市
        const cityList = province.children
        let city = cityList.find((temp) => {
            return temp === item.city
        })
        if (!city) {
            city = { key: "city", name: item.city, children: [] }
            cityList.push(city)
        }
        // 区
        const countyList = city.children
        let county = countyList.find((temp) => {
            return temp === item.county
        })
        if (!county) {
            county = { key: "county", name: item.county}
            countyList.push(county)
        }
    }
    return res
}
console.log(JSON.stringify(solution(arr)));
