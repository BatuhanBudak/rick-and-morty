import { render, screen } from "@testing-library/react";
import Card from "../../components/Card";
import "@testing-library/jest-dom";

describe("Card", () => {
  test("renders correctly with props", () => {
    render(
      <Card
        title={"Test"}
        imgUrl={"https://rickandmortyapi.com/api/character/avatar/361.jpeg"}
      />
    );

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveTextContent("Test");
    expect(screen.getByTestId("image")).toBeInTheDocument();
  });
});
