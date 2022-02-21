test('测试选择算法', () => {
    const selectionSort = require('../index');
    const arr = [5, 2, 3, 1, 4];
    const res = selectionSort(arr);
  
    expect(res)
        .toStrictEqual([1, 2, 3, 4, 5]);
  });