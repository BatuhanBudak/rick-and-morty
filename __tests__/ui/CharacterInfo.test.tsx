import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CharacterInfo from "../../components/CharacterInfo";

describe("CharacterInfo", () => {
  test("renders correctly with props", async () => {
    render(
      <CharacterInfo
        thumbUrl="https://rickandmortyapi.com/api/character/avatar/361.jpeg"
        name="rick"
        status="alive"
        species="human"
        origin="earth"
        location="mars"
      />
    );

    const listElements = screen.getAllByRole("listitem");
    expect(listElements).toHaveLength(4);
  });
  test("renders correctly with all props", async () => {
    render(
      <CharacterInfo
        thumbUrl="https://rickandmortyapi.com/api/character/avatar/361.jpeg"
        name="rick"
        status="alive"
        species="human"
        origin="earth"
        location="mars"
        type="humanoid"
      />
    );

    const listElements = screen.getAllByRole("listitem");
    expect(listElements).toHaveLength(5);
  });
});
