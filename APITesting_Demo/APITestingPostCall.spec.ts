import {expect, test} from "@playwright/test"

test("API Testing - Post Call 1", async({request})=>{
    const resp1 = await request.post("/booking", {
        data:{
            "firstname" : "Jim",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        }
    })
    const jsonresp1 = await resp1.json();
    console.log(jsonresp1);
   expect(resp1.status()).toBe(200);
   expect(resp1.statusText()).toBe("OK");
   expect(resp1.ok()).toBeTruthy();

    expect(jsonresp1.booking).toMatchObject({
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
        additionalneeds: 'Breakfast'
    })

    expect(jsonresp1.booking.additionalneeds).toEqual("Breakfast");
})

test("API with UI Verification", async({request})=>{
    const resp2 =  await request.post("https://api.demoblaze.com/addtocart", {
        data:{"id":"1ee38b2c-9a27-6534-4e91-d457ec5f72cd","cookie":"user=11e9cf91-bc86-f42d-795a-71a6113b06ff","prod_id":3,"flag":false}
    })
    expect(resp2.status()).toBe(200);

})