import { render, screen } from "@testing-library/react";
import Card from "../components/Card";
import "@testing-library/jest-dom";

describe("AutoComplete", () => {
  test("renders correctly with props", () => {
    render(
      <Card
        title={"Test"}
        imgUrl={"https://rickandmortyapi.com/api/character/avatar/361.jpeg"}
      />
    );

    expect(screen.getByTestId("heading")).toBeInTheDocument();
    expect(screen.getByTestId("heading")).toHaveTextContent("Test");
  });
});
