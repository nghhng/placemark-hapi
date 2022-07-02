import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { maggie, testCategories, testPlacemarks } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark API tests", () => {
  setup(async () => {
    await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    await placemarkService.deleteAllUsers();
    await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
  });
  teardown(async () => {
    await placemarkService.deleteAllUsers();
  });

  test("create a placemark", async () => {
    const returnedCategory = await placemarkService.createCategory(testCategories[0]);
    await placemarkService.makePlacemark(returnedCategory._id, testPlacemarks[0]);
    const returnedPlacemarks = await placemarkService.getPlacemarks(returnedCategory._id);
    console.log(returnedPlacemarks);
    assert.equal(returnedPlacemarks.length, 1);
    assertSubset(returnedPlacemarks[0], testPlacemarks[0]);
  });
});
