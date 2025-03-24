import {expect, test} from "@playwright/test"

test("API Testing - Patch Call 1", async({request})=>{
    const respPut = await request.patch("/booking/1", {
        headers:{
            Authorization:"Basic YWRtaW46cGFzc3dvcmQxMjM="
        },
        data:{
            "firstname" : "Owais",
            "lastname" : "Walker"
        }
    })

    const resput1 = await respPut.json();
    console.log(resput1);

    // Assertions

    expect(respPut.status()).toBe(200);
    expect(respPut.statusText()).toBe("OK");
    expect(respPut.ok()).toBeTruthy();
    expect(resput1).toMatchObject({
        firstname: 'Owais',
        lastname: 'Walker'
      })
});