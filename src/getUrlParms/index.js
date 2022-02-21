//获取url参数:
exports.getUrlParms = (key) =>{
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
          var pair = vars[i].split("=");
          if(pair[0] == key){return pair[1];}
  }
  return(false);
}