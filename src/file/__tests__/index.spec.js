const {
  downloadFile,
  readFileAsText,
  blobToBase64,
  base64ToBlob,
} = require("../index");

describe("file 工具", () => {
  const originalFileReader = global.FileReader;
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;

  afterEach(() => {
    global.FileReader = originalFileReader;
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
    delete global.document;
  });

  it("base64ToBlob", async () => {
    const blob = base64ToBlob("aGk=", "text/plain");
    expect(blob.type).toBe("text/plain");
    await expect(blob.text()).resolves.toBe("hi");
  });

  it("blobToBase64 去掉 data: 前缀", async () => {
    global.FileReader = class {
      readAsDataURL() {
        this.result = "data:text/plain;base64,aGk=";
        this.onload();
      }
    };
    await expect(blobToBase64(new Blob(["hi"]))).resolves.toBe("aGk=");
  });

  it("readFileAsText", async () => {
    global.FileReader = class {
      readAsText(file) {
        this.result = file.text;
        this.onload();
      }
    };
    await expect(readFileAsText({ text: "hello" })).resolves.toBe("hello");
  });

  it("downloadFile 创建并清理链接", () => {
    const link = { click: jest.fn() };
    global.document = {
      createElement: () => link,
      body: { appendChild: jest.fn(), removeChild: jest.fn() },
    };
    URL.createObjectURL = jest.fn(() => "blob:mock");
    URL.revokeObjectURL = jest.fn();

    downloadFile("hello", "a.txt", "text/plain");

    expect(link.download).toBe("a.txt");
    expect(link.href).toBe("blob:mock");
    expect(link.click).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:mock");
  });
});
