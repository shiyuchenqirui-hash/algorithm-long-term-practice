// 题目：
// var binaryTree = new BinarySearchTree([-3, 4, -6, 2, 0, -100]);
// console.log(binaryTree.LFR()); //[-100, -6, -3, 0, 2, 4]
// solution：二叉搜索树(BST) + 二叉树中序遍历

function Node(val) {
    this.val = val
    this.left = null
    this.right = null
}
function BinarySearchTree(array) {
    let root = null
    array.forEach((item) => {
        if (!root) {
            root = new Node(item)
        } else {
            let point = root
            let node = new Node(item)
            while (true) {
                if (item < point.val) {
                    if (point.left === null) {
                        point.left = node
                        break
                    } else {
                        point = point.left
                    }
                }
                if (item > point.val) {
                    if (point.right === null) {
                        point.right = node
                        break
                    } else {
                        point = point.right
                    }
                }
            }
        }
    })
    this.root = root
}

BinarySearchTree.prototype.LFR = function () {
    let res = []
    function lfr(root){
        if(root.left){lfr(root.left)}
        res.push(root.val)
        if(root.right){lfr(root.right)}
    }
    lfr(this.root)
    return res
}

// 验证代码
const tree = new BinarySearchTree([-3, 4, -6, 2, 0, -100])
console.log(tree.LFR());

// 1 2 3 
