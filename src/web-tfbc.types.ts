export interface WebTFBCConfig {
  expired: number;
  filePath: string;
  encoding: BufferEncoding;
}

export const WebTFBCDefaultConfig: WebTFBCConfig = {
  expired: 50000,
  filePath: "./web-tfbc-cache/",
  encoding: "utf-8",
};
