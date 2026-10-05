// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
// 1 2 3 4 输出 2 1 4 3
// 输入：head = [1,2,3,4] 输出：[2,1,4,3]
// 输入：head = [] 输出：[]
// 输入：head = [1] 输出：[1]

function Node(val) {
  this.val = val;
  this.next = null;
}
function arrayToL(array) {
  if (array.length === 0) {
    return new Node(null);
  } else {
    let link, start;
    while (array.length) {
      const item = array.shift();
      if (link) {
        link.next = new Node(item);
        link = link.next;
      } else {
        link = new Node(item);
        start = link;
      }
    }
    return start;
  }
}

// 两两置换，并且是节点的对调（而非值）
function trans(root) {
  if (!root.next) {
    return root.val === null ? [] : [root.val];
  } else {
    let start = root.next,
      pre = null;
    while (root) {
      // 链表中的两个节点对调
      let first = root,
        second = root.next;
      if (second) {
        first.next = second.next;
        second.next = root;
        if (pre) {
          pre.next = second;
        }
        pre = first;
        root = first.next;
      } else {
        break;
      }
    }
    // 返回结果数组
    const res = [];
    while (start) {
      start.val && res.push(start.val);
      start = start.next;
    }
    return res;
  }
}

// 验证代码
console.log(arrayToL([1, 2, 3, 4]), trans(arrayToL([1, 2, 3, 4])));
console.log(trans(arrayToL([])));
console.log(trans(arrayToL([1])));
