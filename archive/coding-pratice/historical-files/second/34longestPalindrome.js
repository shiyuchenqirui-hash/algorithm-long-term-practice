// 给你一个字符串 s，找到 s 中最长的回文子串。

// 验证代码
const str = "cbbd"
console.log(longestPalindrome(str))

function longestPalindrome(s) {
    let res = ""
    for (let i = 0; i < s.length; i++) {
        let temp1 = findMax(i, i)
        let temp2 = s[i] ===s[i+1] ? findMax(i, i + 1):""
        res = res.length < temp1.length ? temp1 : res;
        res = res.length < temp2.length ? temp2 : res;
    }
    return res

    // 查找i&j为中心的最长回文串
    function findMax(i, j) {
        while(i>0 && j<s.length && s[i-1]===s[j+1]){
            i--
            j++
        }
        return s.slice(i,j+1)
    }
};