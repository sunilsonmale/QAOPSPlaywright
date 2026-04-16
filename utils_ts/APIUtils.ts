import { APIRequestContext } from "@playwright/test";

export class APIUtils {

    apiContext: APIRequestContext;
    loginPayload: { userEmail: string, userPassword: string };


    constructor(apiContext: APIRequestContext, loginPayload: { userEmail: string, userPassword: string }) {

        this.apiContext = apiContext;
        this.loginPayload = loginPayload;


    }



    async getToken() {

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            }

        )

        // expect(loginResponse.ok()).toBeTruthy();

        const loginResponseJson = await loginResponse.json();

        console.log(loginResponseJson);


        let token = loginResponseJson.token;
        const userId = loginResponseJson.userId;
        let message = loginResponseJson.message;


        console.log(token);

        console.log(userId);

        console.log(message);

        //expect(message === "Login Successfully").toBeTruthy();

        return token;

    }


    // async createOrder(orderPayload: [{orders:{country:string, productOrderedId:string}}]) {

    async createOrder(orderPayload: {
        orders: { country: string; productOrderedId: string }[];
    }) {

        let response: { token: string, orderId: string } = { token: "", orderId: "" };

        response.token = await this.getToken();

        console.log(response);

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,

                headers: {
                    'Authorization': response.token,
                    'Content-Type': "application/json"

                }
            }

        )

        //expect(orderResponse.ok()).toBeTruthy();

        const orderResponseJson = await orderResponse.json();

        console.log(orderResponseJson);

        let orderIdarr = orderResponseJson.orders;

        // orderId = orderIdarr[0];

        response.orderId = orderIdarr[0];

        // message = orderResponseJson.message;

        const productIdResponse = orderResponseJson.productOrderId;


        // console.log(orderId);

        //console.log(message);

        // expect(message === "Order Placed Successfully").toBeTruthy();

        console.log(productIdResponse[0]);
        // console.log(productId)

        // expect(productId === productIdResponse[0]).toBeTruthy();


        return response;

    }
}