 // 获取 html 文本中转化为 html 后的纯文本信息
exports.getHtmlText = source => {
    return source.replace(/<style[^>]*>[\d\D]*<\/style>|<[^>]*>/g, "");
}
  