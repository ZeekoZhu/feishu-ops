import { getSheetToken } from './utils';

const docUrl =
  'https://test-ciso15gzgfgx.feishu.cn/sheets/shtcnUQqsyPEuWze47yNQs0sQ6d?sheet=699fea';

describe('getSheetToken', () => {
  test('get sheet token', () => {
    const { sheetToken, sheetId } = getSheetToken(docUrl);
    expect(sheetToken).toBe('shtcnUQqsyPEuWze47yNQs0sQ6d');
    expect(sheetId).toBe('699fea');
  });
});
