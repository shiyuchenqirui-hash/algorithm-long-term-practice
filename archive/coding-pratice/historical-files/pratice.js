// 题目基底代码
function Node(val) {
  this.val = val;
  this.next = null;
}
const l1 = new Node(1);
l1.next = new Node(2);
l1.next.next = new Node(3);
l1.next.next.next = new Node(5);
const l2 = new Node(2);
l2.next = new Node(3);
l2.next.next = new Node(4);
// 以下为作答，核心思路为反转链表+头插法，用指针做辅助；代码应该尽量简洁。
function deal(l1, l2) {
  // 反转链表
  while (l1.next) {
    l1.next.pre = l1;
    l1 = l1.next;
  }
  while (l2.next) {
    l2.next.pre = l2;
    l2 = l2.next;
  }
  // 头插法
  let result = null;
  while (l1 || l2) {
    const pre = new Node((l1 ? l1.val : 0) + (l2 ? l2.val : 0));
    pre.next = result;
    result = pre;
    l1 = l1 ? l1.pre : l1;
    l2 = l2 ? l2.pre : l2;
  }
  return result;
}
deal(l1, l2);
