import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given(`user is on the Mainpage`, () => {
  cy.visit(`/`);
});

When(`user click {string}`, (btn: string) => {
  cy.contains(`a`, btn, { timeout: 10000 }).eq(0).click();
});

Then(`user should be redirected to {string}`, (page: string) => {
  cy.url().should(`contains`, page);
});
