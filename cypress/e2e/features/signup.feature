Feature: Subsit Signup

  Background:
    Given user is on the signup page
  
  Scenario: User signup already registered account
    When user inputs all the given field
    Then user should see "Email is already in use" status

  Scenario:  User doesnt input email field
    When user inputs company organization
    And user inputs role
    Then the user should see "Email is required"

  Scenario: User doesnt input company/organization
    When user inputs registered email address
    And user inputs role
    Then the user should see "Company must be 2 characters or more"

  Scenario: User doesnt input role
    When user inputs registered email address
    And user inputs company organization
    And clicks "Create an Account"
    Then the user should see "Role must be 2 characters or more"

  Scenario: When user clicks sign in button
    When user clicks "Sign in"
    Then user should be redirected to "Sign In to your Account" page
