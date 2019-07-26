describe('General application navigation', () => {
	beforeEach(() => {
		cy.visit('/')
	});

	it('has the correct <h1>', () => {
		cy.contains('h1', 'Great success!')
	});

	it('navigates to /about', () => {
		cy.get('nav a').contains('about').click();
		cy.url().should('include', '/about');
	});

	it('navigates to /blog', () => {
		cy.get('nav a').contains('blog').click();
		cy.url().should('include', '/blog');
	});
	it('navigates to /view', () => {
		cy.get('nav a').contains('view').click();
		cy.contains('h1', 'Sample Views')
		cy.url().should('include', '/view');
	});
});