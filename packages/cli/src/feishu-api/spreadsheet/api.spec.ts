import { beforeAll } from 'vitest';
import { getSheetContent } from './api';

const docUrl =
  'https://test-ciso15gzgfgx.feishu.cn/sheets/shtcnUQqsyPEuWze47yNQs0sQ6d?sheet=699fea';
describe('getSheetContent', () => {
  test('get sheet content', async () => {
    const result = await getSheetContent(docUrl);
    expect(result).toBeDefined();
    expect(result).toMatchInlineSnapshot(`
      [
        [
          "key",
          "value",
        ],
        [
          "foo",
          "alice",
        ],
        [
          "bar",
          "bob",
        ],
      ]
    `);
  });
});
