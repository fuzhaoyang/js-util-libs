// 格式化日期 dateFormat("YYYY-mm-dd HH:MM：SS", date)
exports.dateFormat = (fmt, timeStamp) => {
    let ret;
    const date = new Date(timeStamp);
    const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    let k;
    for (k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(
                ret[1],
                ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
            );
        }
    }
    return fmt;
};


exports.beforeDateFormat = function(current) {
    if (!current) {
        return;
    }
    //将字符串转换成时间格式
    let timePublish = new Date(current);
    let timeNow = new Date();
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let month = day * 30;
    let year = month * 12;
    let diffValue = timeNow - timePublish;
    let diffMonth = diffValue / month;
    let diffWeek = diffValue / (7 * day);
    let diffDay = diffValue / day;
    let diffHour = diffValue / hour;
    let diffMinute = diffValue / minute;
    let diffYear = diffValue / year;
    if (diffValue < 0) {
        result = "刚刚";
    } else if (diffYear > 1) {
        result = parseInt(diffYear) + "年前";
    } else if (diffMonth > 1) {
        result = parseInt(diffMonth) + "月前";
    } else if (diffWeek > 1) {
        result = parseInt(diffWeek) + "周前";
    } else if (diffDay > 1) {
        result = parseInt(diffDay) + "天前";
    } else if (diffHour > 1) {
        result = parseInt(diffHour) + "小时前";
    } else if (diffMinute > 1) {
        result = parseInt(diffMinute) + "分钟前";
    } else {
        result = "刚刚发表";
    }
    return result;
};