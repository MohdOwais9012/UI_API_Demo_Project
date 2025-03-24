import {test, request, APIRequestContext, expect} from "@playwright/test";

let reqContext2: APIRequestContext
test.beforeAll("Before All the Test", async()=>{
    reqContext2 = await request.newContext({
        baseURL:"https://restful-booker.herokuapp.com",
        extraHTTPHeaders:{
            Accept:"application/json"
        }
    })
})

test("API Testing Get Practice 1", async({request})=>{
    const resp1 = await request.get("https://restful-booker.herokuapp.com/booking", {
        headers:{
            Accept:"application/json"
        }
    });
    console.log(await resp1.json());

})

test("API Testing Get Practice 2", async()=>{
    const reqContext = await request.newContext({
        baseURL:"https://restful-booker.herokuapp.com",
        extraHTTPHeaders:{
            Accept:"application/json"
        }
    });
    const resp1 = await reqContext.get("/booking");
    console.log(await resp1.json());

})

test("API Testing Get Practice 3", async()=>{
    const resp1 = await reqContext2.get("/booking");
    console.log(await resp1.json());

})

test("API Testing Get Practice 4", async({request})=>{
    const resp1 = await request.get("/booking");
    console.log(await resp1.json());

})

test("API Testing Get Practice 5", async({request})=>{
    const resp1 = await request.get("/booking/143");
    console.log(await resp1.json());

})

// Using query parameters
test("API Testing Get Practice 6", async({request})=>{
    const resp1 = await request.get("/booking",{
        params:{
            firstname:"John",
            lastname:"Smith"
        }
    });
    console.log(await resp1.json());

})

// Assertions on the API's

test("API Testing Get Practice 7", async({request})=>{
    const resp1 = await request.get("/booking/141");
    console.log(await resp1.json());
    // if we want to check the status code
    expect(resp1.status()).toBe(200);
    // if we want to check that rep1 is coming
    expect(resp1.ok()).toBeTruthy();
    // if we want to check the exact data
    expect(await resp1.json()).toMatchObject({
        firstname: 'John',
        lastname: 'Smith',
        totalprice: 111,
        depositpaid: true,
        bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
        additionalneeds: 'Breakfast'
      })
})

// API testing using UI
test("API Testing using UI", async({request, page})=>{
    const resp2 = await request.get("https://api.demoblaze.com/entries");
    const jsonresp2 = await resp2.json();
    console.log(jsonresp2.Items[0].title)
    await page.goto("https://www.demoblaze.com");
    await expect(page.getByRole('link', { name: 'Samsung galaxy s6'})).toHaveText(jsonresp2.Items[0].title);
})

 