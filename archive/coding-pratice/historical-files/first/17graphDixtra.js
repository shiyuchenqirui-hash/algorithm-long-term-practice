// 迪克斯特拉算法（有向无环图正权路径）
// 核心思路：循环，找到目前开销最小的节点，更新其邻居节点，直到遍历处理了图中所有节点，再倒推输出最短路径
function find(graph, start, end) {
    const costs = {} // 记录消费栈
    const preList = {} // 记录最短消耗下前一个节点
    const marked = [start] // 记录已经处理过的节点（更新其邻居节点的消耗）

    // 初始化 costs ，preList
    for (let item of Object.keys(graph)) {
        if(Object.keys(graph[start]).includes(item)){
            costs[item] = graph[start][item]
            preList[item] = start 
        }else{
            costs[item] = Infinity
        }
    }

    // 循环对每个节点做更新邻居节点最小消费处理
    let node = findMin(costs)
    while (node) {
        for (let item of Object.keys(graph[node])) {
            if (costs[node] + graph[node][item] < costs[item]) {
                costs[item] = costs[node] + graph[node][item]
                preList[item] = node
            }
        }
        marked.push(node)
        node = findMin(costs)
    }

    // 工具函数：找到costs辅助结构中未处理过的最小消耗的节点
    function findMin(costs) {
        let min = Infinity, key
        for (let item of Object.keys(costs)) {
            if (costs[item] < min && !marked.includes(item)) {
                min = costs[item]
                key = item
            }
        }
        return key
    }

    // 根据处理好的数据结构，倒推输出最后路径
    const minPath = [preList[end], end]
    let pre = preList[end]
    while (pre !== start) {
        minPath.unshift(preList[pre])
        pre = preList[pre]
    }
    return {
        minPath,
        minCost:costs[end]
    }
}

// 验证代码，其中graph是有向无环图
const graph = {}
graph.start = {
    A: 6,
    B: 2
}
graph.A = {
    end: 1
}
graph.B = {
    A: 3,
    end: 5
}
graph.end = {}
console.log(find(graph, "start", "end"))