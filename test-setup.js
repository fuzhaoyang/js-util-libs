const { Blob } = require("buffer");

if (typeof global.Blob === "undefined") global.Blob = Blob;
if (typeof global.atob === "undefined") {
    global.atob = (value) => Buffer.from(value, "base64").toString("binary");
}
if (typeof global.btoa === "undefined") {
    global.btoa = (value) => Buffer.from(value, "binary").toString("base64");
}
