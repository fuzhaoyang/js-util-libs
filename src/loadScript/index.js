//动态加载外部script，默认异步加载
exports.loadScript = (urlArry) => {
    // 如果是数组
    const promiseList = []
    urlArry.forEach((item) => {
      const p = new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = item
        script.onload = () => {
          resolve(script)
        }
        script.onerror = () => {
          reject(script)
        }
        const head = document.getElementsByTagName('head')[0];
        (head || document.body).appendChild(script)
      })
      promiseList.push(p)
    })
    return Promise.all(promiseList)
};