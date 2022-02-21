test('测试插入排序', () => {
  const insertSort = require('../index');
  const arr = [3, 4, 1, 2];
  const res = insertSort(arr);

  expect(res)
    .toStrictEqual([1, 2, 3, 4]);
});