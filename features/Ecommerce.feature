Feature: Ecommerce validations

    Scenario: Placing the order
        Given Login to Ecommerce app with "truptisonmale@gmail.com" and "Advik@123"
        When Add "Zara Coat 3" to cart
        Then Verify "Zara Coat 3" is displayed in cart
        When Enter valid details and place the order
        Then Verify order details from order history page