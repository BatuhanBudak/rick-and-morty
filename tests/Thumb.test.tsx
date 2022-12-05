import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Thumb from "../components/Thumb";

describe("AutoComplete", () => {
  test("renders correctly with props", async () => {
    render(
      <Thumb
        imgUrl={"https://rickandmortyapi.com/api/character/avatar/361.jpeg"}
      />
    );

    expect(screen.getByTestId("image")).toBeInTheDocument();
  });
});
