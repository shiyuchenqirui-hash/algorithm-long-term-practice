// 题目：
// var binaryTree = new BinaryTree([-3, 4, -6, 2, 0, -100]);
// console.log(binaryTree.LFR()); //[-100, -6, -3, 0, 2, 4]

// solution：二叉搜索树(BST) + 二叉树中序遍历

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  // 递归
  insert(key) {
    const node = new Node(key);
    const insertNode = (root, node) => {
      if (root.key > node.key) {
        root.left ? insertNode(root.left, node) : (root.left = node); // 中间递归，最后基线条件
      } else {
        root.right ? insertNode(root.right, node) : (root.right = node);
      }
    };
    if (this.root) {
      insertNode(this.root, nokjde);
    } else {
      this.root = node;
    }
    return this;
  }
  // 二叉树中序遍历
  middleOrderTree() {
    var result = [];
    const middleOrder = (root) => {
      root.left && middleOrder(root.left);
      result.push(root.key);
      root.right && middleOrder(root.right);
      return result;
    };
    return middleOrder(this.root);
  }
  arrayToTree(arr) {
    for (var i = 0; i < arr.length; i++) {
      this.insert(arr[i]);
    }
    return this;
  }
}

// 验证代码
var binaryTree = new BinarySearchTree().arrayToTree([-3, 4, -6, 2, 0, -100]);
console.log(binaryTree.middleOrderTree()); //[-100, -6, -3, 0, 2, 4]
