// 最长公共子串（动态规划）
// 最长公共子串
// 递归公式  c[i,j] = c[i-1,j-1] + 1
{
    function solution(list_a, list_b) {
        local_max = 0; //最大值所处的位置(是表格中的最大值所处的位置)
        extend_max = 0; // 最大值所占的长度

        let list_dp = [] // 二维dp
        // 初始化二维数组 : (默认全部初始化为0)
        for (let i = 0; i <= list_a.length; i++) {
            list_dp[i] = [];
            for (let j = 0; j <= list_b.length; j++) {
                list_dp[i][j] = 0;
            }
        }

        /*
        下面的循环是从1开始的.因为记录各个可能性的动态表的二维数组是多一行与一列的.
        这一行与一列的多出是因为有list-a 或者list_b 等于0个字符串的对比情况.
        */
        for (let i = 1; i <= list_a.length; i++) {
            for (let j = 1; j <= list_b.length; j++) {
                if (list_a[i - 1] === list_b[j - 1]) { // 表格与字符串下标的对应.因为字符串下标是从0开始的
                    list_dp[i][j] = list_dp[i - 1][j - 1] + 1; // 递推公式: list_[i][j] = list[i-1][j-1] + 1
                    if (list_dp[i][j] > extend_max) {
                        local_max = i;
                        extend_max = list_dp[i][j];
                    }
                }
                // else { // 默认初始化为0.这里就不用再赋值了
                //     list_dp[i][j] = 0;
                // }
            }
        }
        console.log(list_dp);
        return {
            local_max,
            extend_max,
        }
    }

    // 以下为验证代码
    let list_a = ['A', 'B', 'C', 'A', 'D', 'B', 'B'];
    let list_b = ['B', 'C', 'E', 'D', 'B', 'B'];
    const res = solution(list_a, list_b)
    console.log(res.local_max); // 表格中的最大值所处的位置(非数组下标位，是辅助数组中的位置。因为有0行/列，所以比实际下标位大1)
    console.log(res.local_max - res.extend_max); // 起始位置(数组下标位置)
    console.log(res.extend_max);// 最大值所占用的长度
}

// 最长公共子串（非动归）
// 思路：先比较s1、s2的长度，然后取较短的字符串作为遍历基础，判断它是否在较长的字符串中存在，如果存中则直接返回，否则再取下一个长度（同一个长度下存在多种可能字符串）
{
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
}