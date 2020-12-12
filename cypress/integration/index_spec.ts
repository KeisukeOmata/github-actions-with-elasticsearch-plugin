describe('タイトルのテスト', () => {
  it('タイトルが「Blog」である', () => {
    cy.visit('/')
    cy.title().should('include', 'Blog')
  })
})

export {}
