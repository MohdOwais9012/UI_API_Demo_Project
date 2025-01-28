import {expect, test} from "@playwright/test"
import ApiJson from "./apidata.json"

test("API Testing - Pass Request body form JSON for Post call", async({request}) => {
    const resPost = await request.post("https://restful-booker.herokuapp.com/booking", {
        data:ApiJson
    })

    const respJson = await resPost.json();
    expect(respJson.booking).toMatchObject(ApiJson)

    expect(respJson.booking.additionalneeds).toEqual(ApiJson.additionalneeds);
})