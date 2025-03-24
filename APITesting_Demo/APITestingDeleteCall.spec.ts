import {test, expect} from "@playwright/test"

test("Delete Call For API Testing", async({request}) =>{
     const respDelete = await request.delete("/booking/4");
     expect(respDelete.status()).toBe(201);

     const respDelTest = await respDelete.text();
     console.log(respDelTest);
     expect(respDelTest).toEqual("Created");
})