Feature: Subsit Login

  Background:
    Given user is on the login page

  Scenario Outline: User inputs wrong email shows message prompt
    When user inputs "<email>"
    Then user should see "<msgprompt>"
      Examples:
        | email  | msgprompt  |
        | sqahov  | Invalid email address |
        | {enter} | Email is required |

  Scenario Outline: User inputs email that shows the status prompt
    When user inputs "<email>"
    Then user should see status "<status>"
      Examples:
        | email  |  status  |
        | unreg@gmail.com | user with the specified email address does not exist. |
        | sqa.hov@gmail.com | Code sent.  |

  Scenario: User click resend code
    When user inputs registered email
    And click "Resend the code"
    Then user should see "Resent OTP successfully." status

  Scenario: User click change email address
    When user inputs registered email
    And click "Change email address"
    Then user should redirect back to login page
    And email field is shown

  Scenario: User inputs invalid otp code
    When user inputs invalid code
    Then user should see "OTP is invalid." status