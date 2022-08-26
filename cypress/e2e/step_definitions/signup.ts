import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

const randomNo = () => Cypress._.random(0, 4);
const id = randomNo();

Given(`user is on the signup page`, () => {
  cy.visit(Cypress.config("baseUrl") + `signup`, { timeout: 10000 });
});

// Scenario: User signup already registered account
When(`user inputs all the given field`, () => {
  cy.get(`input[name='emailAddress']`).type(`sqa.hov@gmail.com`);
  cy.get(`input[name='company']`).type(`Testing`);
  cy.get(`.chakra-input__right-element `).click();
  cy.get(`ul[role='listbox'] li:nth-child(${id})`).click();

  cy.get(`button[type='submit']`).click();
});

Then(`user should see status {string}`, (status: string) => {
  cy.get(`div[role='status'] > div > span`, { timeout: 30000 }).should(
    `contain.text`,
    status
  );
});

// Scenario:  User doesnt input email field
When(`user inputs company organization`, () => {
  cy.get(`input[name='company']`).type(`Testing`);
});

When(`user inputs role`, () => {
  cy.get(`.chakra-input__right-element `).click();
  cy.get(`ul[role='listbox'] li:nth-child(${id})`).click();
  cy.get(`button[type='submit']`).click();
});

Then(`the user should see {string}`, (msg: string) => {
  cy.get(`div.chakra-form__error-message`).should(`contain.text`, msg);
});

// Scenario: User doesnt input company/organization
When(`user inputs registered email address`, () => {
  cy.get(`input[name='emailAddress']`).type(`sqa.hov@gmail.com`);
});

// Scenario: User doesnt input role
When(`clicks {string}`, (btn: string) => {
  cy.contains(`button[type='submit']`, btn).click();
});

//  Scenario: When user clicks sign in button
When(`user clicks {string}`, (page: string) => {
  cy.wait(1000);
  cy.contains(`a.chakra-link`, page).click();
});

Then(`user should be redirected to {string} page`, (page: string) => {
  cy.get(`h2.chakra-heading`).should("contain.text", page);
});
