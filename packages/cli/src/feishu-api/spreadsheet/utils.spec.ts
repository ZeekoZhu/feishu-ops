import { expect } from 'vitest';
import { getSheetToken, spreadsheetToJson } from './utils';

const docUrl =
  'https://test-ciso15gzgfgx.feishu.cn/sheets/shtcnUQqsyPEuWze47yNQs0sQ6d?sheet=699fea';

describe('getSheetToken', () => {
  test('get sheet token', () => {
    const { sheetToken, sheetId } = getSheetToken(docUrl);
    expect(sheetToken).toBe('shtcnUQqsyPEuWze47yNQs0sQ6d');
    expect(sheetId).toBe('699fea');
  });

  test('bad case', () => {
    const result = getSheetToken('123');
    expect(result).toBeNull();
  });
});

describe('spreadsheetToJson', () => {
  test('2d array to json', () => {
    const sheet = [
      ['a', 'b', 'c'],
      ['1', '2', '3'],
      ['4', '5', '6'],
    ];
    const json = spreadsheetToJson(sheet);
    expect(json).toStrictEqual([
      { a: '1', b: '2', c: '3' },
      { a: '4', b: '5', c: '6' },
    ]);
  });
  test('empty array', () => {
    const sheet = [];
    const json = spreadsheetToJson(sheet);
    expect(json).toStrictEqual([]);
  });

  test('headers only', () => {
    const sheet = [['a', 'b', 'c']];
    const json = spreadsheetToJson(sheet);
    expect(json).toStrictEqual([]);
  });
});
