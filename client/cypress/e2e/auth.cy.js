describe('Simple UI smoke', () => {
  it('loads the app and shows heading', () => {
    // assumes you run the client at http://localhost:3000 during manual test runs
    cy.visit('/');
    cy.contains('Example MERN Testing App');
  });
});
