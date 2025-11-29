describe('Navigation', () => {
    it('should navigate to the about page', () => {
        cy.visit('/');
        cy.get('a[href="/about"]').click();
        cy.url().should('include', '/about');
        cy.contains('About Me');
    });

    it('should navigate to the projects page', () => {
        cy.visit('/');
        cy.get('a[href="/projects"]').click();
        cy.url().should('include', '/projects');
        cy.contains('Featured Projects');
    });
});

describe('Contact Form', () => {
    it('should submit the contact form', () => {
        cy.visit('/contact');
        cy.get('input[name="name"]').type('Test User');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('textarea[name="message"]').type('Hello, this is a test message.');
        cy.get('button[type="submit"]').click();
        cy.contains('Message sent successfully!', { timeout: 10000 });
    });
});
