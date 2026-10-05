// 21.11.19 知乎一面题

/**
 * 有这样一个结构
 *
 * interface ANode {
 *   name: string
 *   children: ANode[]
 * }
 *
 * 请写一个方法打印该结构 name，测试数据如下，要求打印该测试数据 name 的顺序为 root, child_0, child_1, child_0_0, child_1_0
 *
 */

 const data = {
    name: "root",
    children: [
        {
            name: "child_0",
            children: [
                {
                    name: "child_0_0",
                    children: [],
                },
            ],
        },
        {
            name: "child_1",
            children: [
                {
                    name: "child_1_0",
                    children: [],
                },
            ],
        },
    ],
};

function solution(data) {
    const temp = [data]
    const result = []
    while (temp.length) {
        const node = temp.shift()
        if (node.name) {
            result.push(node.name)
        }
        if (Array.isArray(node.children) && node.children.length > 0) {
            for (let item of node.children) {
                temp.push(item)
            }
        }
    }
    return result.join()

}
console.log(solution(data))