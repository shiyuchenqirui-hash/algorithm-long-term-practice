# 旧编程题练习归档

这里保存旧 `coding-pratice` 的技术代码快照，迁移日期：2026-10-04。目录名沿用原仓库拼写，便于追溯。2026-10-05 准备公开版本时，原始 Git bundle 改为仅保留在私有备份中。

旧仓库曾有清空练习文件的提交，所以不能只复制最新目录就认为保存了全部练习。公开版本保留以下四部分：

| 目录 | 内容 | 使用边界 |
| --- | --- | --- |
| `current/` | 迁移时本地 HEAD 的 4 个文件 | 最新已提交目录快照 |
| `historical-files/` | 从提交历史提取的 98 个 JS/TS 文件路径 | 每个路径取历史中最新添加或修改的版本；不是同一提交下的完整工程，不保证可以组合运行 |
| `uncommitted-local/` | `a.js`、`pratice.ts`、`pratice2.ts` 三份本地草稿 | 源仓库未提交文件，单独保留，不冒充历史提交成果 |
| `history/file-provenance.json` | 文件来源索引 | 记录原提交号和 blob 哈希；原提交不在公开仓库历史内 |

## 如何继续学习

先按题型查阅 `historical-files/`，其中保留原来的 `first/`、`second/`、`works/` 等路径。旧代码作为复习素材，不代表当前已验证正确。

需要重新练习时，在长期练习仓库按专题新增实现，独立验证后记录到根目录的 `PROGRESS.md`；不直接覆盖这份归档。与算法无关的 Promise、深拷贝等题目也保留原样，可作为 JavaScript 基础练习参考。

## 来源与验证

- 基准：本地 `master`，迁移时 HEAD 短 SHA 为 `b8a7c08`。
- 私有备份中的 `coding-pratice.bundle` 保存所有原本地 refs 可达的历史，共 71 个提交；不包含在公开版本中。
- `history/file-provenance.json` 记录每个历史文件的原路径、来源提交和 blob 哈希。
- 已提交文件逐个校验 blob 哈希；三份草稿校验字节一致。
- 已验证 bundle，并在临时目录克隆恢复。未运行旧代码测试，也未据此判断题解正确性。
- 上述验证为迁移时的历史记录，不代表本次运行了代码测试。

如需恢复真实的提交快照，需要先取得私有备份中的 bundle，再执行（目标目录必须尚不存在）：

```sh
git clone /path/to/private-backup/coding-pratice.bundle /tmp/coding-pratice-restored
git -C /tmp/coding-pratice-restored log --all --oneline
```

然后在恢复的仓库中查看所需提交；不要把 `historical-files/` 当作某一次历史提交的原貌。
