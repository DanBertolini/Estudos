import { IframeLessPage } from './app.po';

describe('iframe-less App', () => {
  let page: IframeLessPage;

  beforeEach(() => {
    page = new IframeLessPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
