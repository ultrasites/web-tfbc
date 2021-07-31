import { readFileSync, unlink } from "fs";
import { WebTFBC } from "./web-tfbc";

describe("web-tfbc", () => {
  it("should cache a simple string", async () => {
    const cache = new WebTFBC();
    const content = await cache.cache<string>("test", "test");
    expect(content).toEqual("test");
  });

  it("should cache simple string as expired", async () => {
    const cache = new WebTFBC({
      filePath: "./src/testfiles/",
      encoding: "utf-8",
      expired: 1000,
    });
    const content = await cache.cache<string>("expiredFile", "expiredFile");

    expect(content).toEqual("expiredFile");
  });

  it("should cache html file", async () => {
    const htmlFile = readFileSync("./src/testfiles/test.html", {
      encoding: "utf-8",
    });

    const cache = new WebTFBC();
    const content = await cache.cache<string>("htmlTest", htmlFile);

    expect(content).toMatchSnapshot();
  });

  it("should cache dom", async () => {
    document.body.innerHTML =
      '<div id="cache">' +
      '  <span id="username" />' +
      '  <button id="button" />' +
      "</div>";

    const cache = new WebTFBC();
    const content = await cache.cache<HTMLElement>(
      "htmlElement",
      document.getElementById("cache")!
    );

    expect(content).toMatchSnapshot();
  });

  afterEach(async () => {
    await unlink("./web-tfbc-cache", () => {});
  });
});
