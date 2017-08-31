import { StandalonePage } from './app.po';

describe('standalone App', () => {
  let page: StandalonePage;

  beforeEach(() => {
    page = new StandalonePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
