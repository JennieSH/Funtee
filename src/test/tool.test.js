import React from "react";
import renderer from "react-test-renderer";
import Tool from "../components/homepage/tool";

test("Snapshot for authBtn Component", () => {
  const guest = renderer.create(<Tool/>).toJSON();
  expect(guest).toMatchSnapshot();
});