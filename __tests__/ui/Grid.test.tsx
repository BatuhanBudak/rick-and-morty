import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Grid from "../../components/Grid";
import Card from "../../components/Card";

describe("Grid", () => {
  test("renders correctly with props", async () => {
    render(<Grid title="Test" />);

    const headingEle = screen.getByRole("heading");
    expect(headingEle).toBeInTheDocument();
    expect(headingEle).toHaveTextContent("Test");
  });

  test("renders correctly with children", async () => {
    render(
      <Grid title="Test">
        <Card
          title={"Test"}
          imgUrl={"https://rickandmortyapi.com/api/character/avatar/361.jpeg"}
        />
        <Card
          title={"Test"}
          imgUrl={"https://rickandmortyapi.com/api/character/avatar/361.jpeg"}
        />
        <Card
          title={"Test"}
          imgUrl={"https://rickandmortyapi.com/api/character/avatar/361.jpeg"}
        />
      </Grid>
    );

    const gridChild = screen.getAllByTestId("grid-child");
    expect(gridChild).toHaveLength(3);
  });
});
