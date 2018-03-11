import { TesteUnitarioPage } from './app.po';

describe('teste-unitario App', () => {
  let page: TesteUnitarioPage;

  beforeEach(() => {
    page = new TesteUnitarioPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
