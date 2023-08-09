const puppeteer = require("puppeteer");

jest.setTimeout(180000);

let browser = null;
let page = null;
describe("Header tests", () => {
  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
    });
    page = await browser.newPage();
    await page.goto("localhost:3000");
  });

  afterEach(async () => {
    await browser.close();
  });
  test("Renders the header logo", async () => {
    const text = await page.$eval("a.brand-logo", (el) => el.innerHTML);
    expect(text).toEqual("Blogster");
  });

  test("Clicking login will start the auth flow", async () => {
    await page.click(".right a");

    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
  });
});
