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

// 中序优先遍历 - 递归
function traverse3(root) {
    const res = []
    inner(root)
    return res
    function inner(node) {
        if (node) {
            node.left && inner(node.left);
            res.push(node.val);
            node.right && inner(node.right);
        }
    }
}

// 中序优先遍历 - 辅助栈
function traverse4(root) {
    let result = []; // 存储结果
    let stack = []; // 使用栈进行遍历
    let current = root; // 使用节点进行遍历

    // 遍历的过程中，可能出现current为空，而stack中有元素，即为遍历到树的最底端。
    // 也可能出现current有值而stack为空的情况，如遍历到二叉树的根节点。
    while (current || stack.length) {
        // 步骤1：不断向左下遍历节点，同时将所有节点入栈
        while (current) {
            stack.push(current);
            current = current.left;
        }

        // 步骤2：当向左下方走到底之后，先取出最左下角的节点
        current = stack.pop();
        // 步骤3：保存左下角节点的值
        result.push(current.val);
        // 步骤4：遍历右节点。
        // 如果此时右节点为空，则会回到步骤2，注意current会变为最近未取值的根节点。
        // 以动画为例，如果步骤4的current为节点5，回到步骤2后，current会变为1，并且取值后就遍历到了节点3。
        // 如果右节点不为空，则继续向下遍历。
        current = current.right;
    }
    return result;
}

// 验证代码
console.log(traverse1(root))
console.log(traverse2(root))
console.log(traverse3(root))
console.log(traverse4(root))