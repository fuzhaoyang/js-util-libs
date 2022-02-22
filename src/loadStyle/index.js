// 加载样式文件
exports.loadStyle = (url) => {
    try {
      document.createStyleSheet(url);
    } catch (e) {
      var cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.type = "text/css";
      cssLink.href = url;
      var head = document.getElementsByTagName("head")[0];
      head.appendChild(cssLink);
    }
  }
  