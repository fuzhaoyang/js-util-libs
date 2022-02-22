// 文件大小格式化
exports.formatSize = (size) => {
    const unitsHash = 'B,KB,MB,GB'.split(',')
    let index = 0
    while (size > 1024 && index < unitsHash.length) {
        size /= 1024
        index++
    }
    return Math.round(size * 100) / 100 + unitsHash[index]
}