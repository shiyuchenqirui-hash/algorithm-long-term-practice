// 最长公共子串（动态规划）

// 最长公共子串（非动归）
// 思路：先比较s1、s2的长度，然后取较短的字符串作为遍历基础，判断它是否在较长的字符串中存在，如果存中则直接返回，否则再取下一个长度（同一个长度下存在多种可能字符串）
function compare(str1, str2) {
    let shortStr = str1.length > str2.length ? str2 : str1
    let longStr = str1.length > str2.length ? str1 : str2
    for (let j = shortStr.length; j > 0; j--) {
        for (let i = 0; i <= shortStr.length - j; i++) {
            const temp = shortStr.substr(i, j)
            if (longStr.includes(temp)) {
                return temp
            }
        }
    }
    return ""
}

// 验证代码
const str1 = "abxcxxd"
const str2 = "bcx"
console.log(compare(str1, str2))