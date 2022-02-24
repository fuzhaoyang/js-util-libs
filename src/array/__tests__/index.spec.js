describe("扁平数据转tree", () => {
    it("arrayToTree", () => {
        const { arrayToTree } = require("../index");
        let arr = [
            { id: 1, name: '部门1', pid: 0 },
            { id: 2, name: '部门2', pid: 1 },
        ]
        const target = [{
            "id": 1,
            "name": "部门1",
            "pid": 0,
            "children": [{
                "id": 2,
                "name": "部门2",
                "pid": 1,
                "children": []
            }]
        }]
        expect(arrayToTree(arr)).toEqual(target);
    });
});