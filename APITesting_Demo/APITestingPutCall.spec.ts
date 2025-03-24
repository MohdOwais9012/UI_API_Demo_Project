import {expect, test} from "@playwright/test"

test("API Testing - Put Call 1", async({request})=>{
    const respPut = await request.put("/booking/1", {
        headers:{
            Authorization:"Basic YWRtaW46cGFzc3dvcmQxMjM="
        },
        data:{
            "firstname" : "Allan",
            "lastname" : "Walker",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Pan Cakes"
        }
    })

    const resput1 = await respPut.json();
    console.log(resput1);

    // Assertions

    expect(respPut.status()).toBe(200);
    expect(respPut.statusText()).toBe("OK");
    expect(respPut.ok()).toBeTruthy();
    expect(resput1).toMatchObject({
        firstname: 'Allan',
        lastname: 'Walker',
        totalprice: 111,
        depositpaid: true,
        bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
        additionalneeds: 'Pan Cakes'
      })

      expect(resput1.additionalneeds).toEqual("Pan Cakes");

      // Get call just to check the updated details.

      const respGet = await request.get("https://restful-booker.herokuapp.com/booking/1");
      console.log(await respGet.json());
      expect(await respGet.json()).toMatchObject({
        firstname: 'Allan',
        lastname: 'Walker',
        totalprice: 111,
        depositpaid: true,
        bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
        additionalneeds: 'Pan Cakes'
      })
});