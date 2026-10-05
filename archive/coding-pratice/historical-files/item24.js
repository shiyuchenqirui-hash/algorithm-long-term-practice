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

