import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given(`user is on the login page`, () => {
  cy.visit(Cypress.config("baseUrl") + `login`, { timeout: 10000 });
});

// Scenario Outline: User inputs wrong email shows message prompt
When(`user inputs {string}`, (email: string) => {
  cy.get(`input[name='email']`).type(email);
  cy.get(`button[type='submit']`).click();
});

Then(`user should see {string}`, (msg: string) => {
  cy.get(`div.chakra-form__error-message`, { timeout: 30000 }).should(
    `contain.text`,
    msg
  );
});

// Scenario Outline: User inputs email that shows the status prompt- already on signup process

// Scenario: User click resend code
When(`user inputs registered email`, () => {
  cy.get(`input[name='email']`).type("sqa.hov@gmail.com");
  cy.get(`button[type='submit']`).click();
});

When(`click {string}`, (code: string) => {
  cy.contains(`.chakra-link`, code).click();
});

Then(`user should see {string} status`, (status: string) => {
  cy.get(`div[role='status'] > div > span`).should(`contain.text`, status);
});

// Scenario: User click change email address
Then(`user should redirect back to login page`, () => {
  cy.url().should(`contains`, "login");
});

Then(`email field is shown`, () => {
  cy.get(`input[name='email']`).should("be.visible");
});

// Scenario: User inputs invalid otp code
When(`user inputs invalid code`, () => {
  const otp = "123456";
  cy.get(`input[name='email']`).type("sqa.hov@gmail.com");
  cy.get(`button[type='submit']`).click();

  cy.contains(`h2`, "Sign In to your Account").should("be.visible");
  cy.get(`.chakra-form-control div input`).each(($element, index) => {
    cy.wrap($element).type(otp.toString()[index]);
  });
});

// Scenario: When user clicks create an account button - already on signup process
