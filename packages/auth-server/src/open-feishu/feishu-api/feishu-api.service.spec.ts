import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { FeishuApiService, getSheetToken } from "./feishu-api.service";

const docUrl =
  "https://test-ciso15gzgfgx.feishu.cn/sheets/shtcnUQqsyPEuWze47yNQs0sQ6d?sheet=699fea";
describe("FeishuApiService", () => {
  let service: FeishuApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          envFilePath: [".env.local"],
        }),
      ],
      providers: [FeishuApiService],
    }).compile();

    service = module.get<FeishuApiService>(FeishuApiService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getTenantToken", () => {
    test("get tenant token", async () => {
      const token = await service.getTenantToken();
      expect(token).toBeDefined();
    });
    test("cache tenant token", async () => {
      const token = await service.getTenantToken();
      const token2 = await service.getTenantToken();
      expect(token).toBe(token2);
    });
  });

  describe("getSheetToken", () => {
    test("get sheet token", () => {
      const { sheetToken, sheetId } = getSheetToken(docUrl);
      expect(sheetToken).toBe("shtcnUQqsyPEuWze47yNQs0sQ6d");
      expect(sheetId).toBe("699fea");
    });
  });
});
