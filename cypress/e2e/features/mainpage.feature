Feature: Subsit Mainpage

  Background: 
    Given user is on the Mainpage

  Scenario Outline: When user click on the <button> button
    When user click "<button>"
    Then user should be redirected to "<page>"
      Examples:
        | button  | page  |
        | Sign In | login |
        | Try subsit for free  | signup |