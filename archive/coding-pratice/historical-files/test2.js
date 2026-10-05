// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
//   有效字符串需满足：
//   左括号必须用相同类型的右括号闭合。
//   左括号必须以正确的顺序闭合。

//   输入：s = "()[]{}"
//   输出：true
//   输入：s = "([)]"
//   输出：false
//   输入：s = "([])"
//   输出：true

function solution(str){
    const arr = str.split("")
    const temp = []
    let res = false
    for(let i=0,len=arr.length;i<len;i++){
        if(arr[i]==="(" || arr[i]==="[" || arr[i] === "{"){
            temp.push(arr[i])
        }else if(arr[i] === ")"){
            if(temp[temp.length-1] === "("){
                temp.pop()
            }else{
                break
            }
        }else if(arr[i] === "]"){
            if(temp[temp.length-1] === "["){
                temp.pop()
            }else{
                break
            }
        }else if(arr[i] === "}"){
            if(temp[temp.length-1] === "{"){
                temp.pop()
            }else{
                break
            }
        }
    }
    if(temp.length===0){
        res = true
    }
    return res
}