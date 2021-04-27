import CharacterPage from "./CharacterPage";
import { mockSearch } from "../services/mockAxios";
import {
  act,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import mockCharacterData from "../mocks/mockSearchCharacterData.json";

describe("Character Page", () => {
  describe("List", () => {
    it("should display results", () => {
      mockSearch("/characters", mockCharacterData, 200, {
        link: `<https://www.anapioficeandfire.com/api/characters?page=2&pageSize=10>; rel="next", <https://www.anapioficeandfire.com/api/characters?page=1&pageSize=10>; rel="first", <https://www.anapioficeandfire.com/api/characters?page=214&pageSize=10>; rel="last"`,
      });

      act(() => {
        render(<CharacterPage />);
      });

      mockCharacterData.forEach((char) => {
        expect(screen.queryAllByText(char.name || "Unknown")).toHaveLength(0);
      });

      return waitForElementToBeRemoved(
        document.querySelector("div.ant-skeleton")
      ).then(() => {
        mockCharacterData.forEach((char) => {
          expect(screen.queryAllByText(char.name || "Unknown")).toHaveLength(1);
        });
      });
    });
  });
});
