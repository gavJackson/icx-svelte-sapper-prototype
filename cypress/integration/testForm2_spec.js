describe('testForm2.json', () => {
	beforeEach(() => {
		cy.visit('/view/assets-views-testForm2.json')
	});

	it('Renders the header', () => {
		cy.contains('h1', 'Virtual List Test form')
	});

	it('Renders data components', () => {
		cy.contains('label', 'First name')
		cy.contains('label', 'Last name')
		cy.contains('label', 'Date of birth')
		cy.contains('label', 'Phone number')
		cy.contains('label', 'Mobile number')
	});

});