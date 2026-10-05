class ListNode {
  constructor(
    public val: number,
    public next: ListNode | null = null,
  ) {}
}

function removeNthFromEnd(
  head: ListNode | null,
  n: number,
): ListNode | null {
    // 在这里实现
    if(head === null){return head}

  let p1:ListNode | null = head
  let p2:ListNode | null = head
  let flag = -1

//   n > 链表长度
  for(let i=0;i<n;i++){
    if(p1?.next === null){
        p1 = null
        flag = i
     }
    p1 = p1?.next
  }
  if(flag<n){return head}

//   n < 链表长度，双指针
  while(p1.next !=null){
    p1 = p1.next
    p2 = p2.next
  }
  p2.next = p2?.next.next
  
  
  return head 
}

