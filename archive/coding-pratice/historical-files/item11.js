// 遍历二叉树（深度优先、广度优先）

// 基底代码
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)
root.left.left.left = new TreeNode(6)

// 深度优先遍历
function traverse1(root) {
    const result = []
    const temp = [root]
    while (temp.length) {
        const node = temp.pop()
        result.push(node.val)
        if (node.right) temp.push(node.right)
        if (node.left) temp.push(node.left)
    }
    return result
}

// 广度优先遍历
function traverse2(root) {
    const result = []
    const temp = [root]
    while (temp.length) {
        const node = temp.shift()
        result.push(node.val)
        if (node.left) temp.push(node.left)
        if (node.right) temp.push(node.right)
    }
    return result
}

console.log(traverse1(root))
console.log(traverse2(root))