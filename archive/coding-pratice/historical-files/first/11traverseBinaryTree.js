// 遍历二叉树（深度优先/先序遍历、广度优先、分层遍历、中序、后序列）

// 节点类型定义
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

console.log(MiddleTraverseStack(root))

// 1 深度优先遍历（先序） | 辅助栈
function dFTraverseStack(root) {
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

// 2 深度优先遍历（先序） | 递归
function dFTraverseRecursion(root) {
    const res = []
    inner(root)
    return res
    function inner(node) {
        res.push(node.val)
        node.left && inner(node.left)
        node.right && inner(node.right)
    }
}

// 3 广度优先遍历（层次遍历）| 辅助队列 （没有找到当前的数据结构下递归的方案）
function bFTraverseQueue(root) {
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

/**
  * 4 分层遍历（并按照层级放到不同数组） 递归（其递归是深度遍历的递归方案）
  */
function levelOrder(root) {
    const result = []
    inner(root, 0)
    return result
    function inner(node, level) {
        if (result.length < level + 1) {
            result[level] = []
        }
        result[level].push(node.val)
        node.left && inner(node.left, level + 1)
        node.right && inner(node.right, level + 1)
    }
}

// 5 中序优先遍历 - 递归
function MiddleTraverseRecursion(root) {
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

// 6 中序优先遍历 - 辅助栈
function MiddleTraverseStack(root) {
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

// 7 后续遍历 | 递归
function PostTraverseRecursion(root) {
    const res = []
    inner(root)
    return res
    function inner(root) {
        root.right && inner(root.right)
        root.left && inner(root.left)
        res.push(root.val)
    }
}
