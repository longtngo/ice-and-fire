import { searchCharacters } from "./characterApi";
import { mockSearch } from "./mockAxios";

describe("characterApi", () => {
  it("should attached id and parse for last page", () => {
    mockSearch("/characters", [{ url: "/characters/1" }]);

    return searchCharacters().then((result) => {
      expect(result.data.characters[0].id).toBe(1);
      expect(result.data.lastPage).toBe(45);
    });
  });
});
