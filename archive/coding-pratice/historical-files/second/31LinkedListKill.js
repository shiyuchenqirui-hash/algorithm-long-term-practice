// 循环链表 约瑟夫自杀环问题

function Node(item) {
    this.value = item
    this.next = null
}

function LinkedList(n) {
    let point, start, length = 0, count = 1
    while (count <= n) {
        length++
        if (!point) {
            point = new Node(count)
            point.next = point
            start = point
        } else {
            const node = new Node(count)
            point.next = node
            node.next = start
            point = node
        }
        count++
    }
    this.start = start
    this.length = length
}

function solution(n, m) {
    const ll = new LinkedList(n)

    let temp = 0, point = ll.start, pre
    while (ll.length > 2) {
        temp++
        if (temp === m) {
            temp = 0
            pre.next = point.next
            point = point.next
            ll.length--
        } else {
            pre = point
            point = point.next
        }
    }
    return point
}

console.log(solution(41, 3))