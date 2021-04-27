import CharacterCard from "./CharacterCard.jsx";
import { render, screen } from "@testing-library/react";
import mockSearchCharacterData from "../mocks/mockSearchCharacterData.json";

const walder = mockSearchCharacterData[1];

describe("Character Card", () => {
  it("should not display data if loading", () => {
    const wrapper = render(<CharacterCard data={walder} loading />);
    expect(wrapper.queryAllByText(walder.name)).toHaveLength(0);
  });

  it("should display data if not loading", () => {
    const wrapper = render(<CharacterCard data={walder} loading={false} />);
    expect(wrapper.queryAllByText(walder.name)).toHaveLength(1);
  });

  it("should display 'None' if no title or  alias", () => {
    const data = {
      ...walder,
      titles: [""],
      aliases: [],
    };
    const wrapper = render(<CharacterCard data={data} loading={false} />);
    expect(wrapper.queryAllByText("None")).toHaveLength(2);
  });
});
