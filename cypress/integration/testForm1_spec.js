describe('testForm1.json', () => {
	beforeEach(() => {
		cy.visit('/view/assets-views-testForm1.json')
	});

	it('Renders the header', () => {
		cy.contains('h1', 'Test form')
		cy.contains('p', 'This is a test form...')
	});

	it('Renders data components', () => {
		cy.contains('label', 'First name')
		cy.get('[data-short-code="FIRST_NAME"] > .input-container > .help-description').contains('This is your first name dummy!!!!')
		cy.contains('label', 'Last name')
		cy.contains('label', 'Date of birth')
		cy.contains('label', 'Phone number')
		cy.contains('label', 'Mobile number')
	});

	it('The date picker works', () => {
		cy.get('#DOB').focus()
		cy.get('[data-day="1"] > .pika-button').click()
		cy.get('#DOB').invoke('val').should('contain','01')
	});

	it('Data components are grouped', () => {
		cy.get('[data-short-code="PERSONAL_DETAILS_GROUP"]').parents('[data-short-code="COLUMN_GROUP"]')
		cy.get('[data-short-code="CONTACT_DETAILS_GROUP"]').parents('[data-short-code="COLUMN_GROUP"]')

	});

	it('Should match previous screenshot "testForm1.json"', () => {
		cy.matchImageSnapshot();
	});

});