const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    const sortedIds = sortProductsByPrice(products, 'asc').map(p => p.id);
    expect(sortedIds).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    const sortedIds = sortProductsByPrice(products).map(p => p.id);
    expect(sortedIds).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const filtered = products.filter(p => [1, 3, 4].includes(p.id));
    const sortedIds = sortProductsByPrice(filtered, 'asc').map(p => p.id);
    expect(sortedIds).toEqual([3, 4, 1]);
  });

  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    const sortedIds = sortProductsByPrice(products, 'desc').map(p => p.id);
    expect(sortedIds).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const filtered = products.filter(p => [3, 1, 4].includes(p.id));
    const sortedIds = sortProductsByPrice(filtered, 'desc').map(p => p.id);
    expect(sortedIds).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const filtered = products.filter(p => [5, 2, 6].includes(p.id));
    const sortedIds = sortProductsByPrice(filtered, 'desc').map(p => p.id);
    expect(sortedIds).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const filtered = products.filter(p => [1, 3, 4].includes(p.id));
    sortProductsByPrice(filtered, 'asc');    
    expect(filtered.map(p => p.id)).toEqual([1, 3, 4]); // проверяем на мутацию
  });

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const filtered = products.filter(p => [1, 3, 4].includes(p.id));
    sortProductsByPrice(filtered, 'desc');
    expect(filtered.map(p => p.id)).toEqual([1, 3, 4]); // проверяем на мутацию
  });

  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    const ids = products.map(p => p.id);
    sortProductsByPrice(products);
    expect(products.map(p => p.id)).toEqual(ids);
  });
});
