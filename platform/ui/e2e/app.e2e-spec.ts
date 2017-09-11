import { HiotPage } from "./app.po";

describe("hiot App", () => {
  let page: HiotPage;

  beforeEach(() => {
    page = new HiotPage();
  });

  it("should display welcome message", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("Welcome to app!!");
  });
});
