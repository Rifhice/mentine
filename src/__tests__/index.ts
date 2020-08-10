import { convertCustomRouteToOpenAPIJsonFormat } from "..";
import { BaseRoute, Route } from "../interfaces";

const doc: BaseRoute = {
  path: "/api/user/:id/blacklist",
  method: "put",
  tag: "User",
  summary: "lalalla",
  description: "lelelel",
  pathVariables: {
    id: {
      type: "string",
      description: "Id of user",
    },
  },
  responses: {
    204: {
      description: "Salut",
    },
  },
};

describe("Test convertCustomRouteToOpenAPIJsonFormat", () => {
  let routeCopy: Route;
  beforeEach(() => (routeCopy = JSON.parse(JSON.stringify(doc))));

  test("Path should be the top level key", () => {
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(Object.keys(converted)[0]).toEqual(routeCopy.path);
  });
  test("Method should be the first key after the path key", () => {
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(Object.keys(converted[routeCopy.path])[0]).toEqual(routeCopy.method);
  });
  test("Tags should be the first key after the method key and contain one element", () => {
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(Object.keys(converted[routeCopy.path][routeCopy.method])[0]).toEqual(
      "tags"
    );
    expect(converted[routeCopy.path][routeCopy.method]["tags"]).toHaveLength(1);
    expect(converted[routeCopy.path][routeCopy.method]["tags"][0]).toBe(
      routeCopy.tag
    );
  });
  test("Summary should be referenced at the same level as tags", () => {
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(
      Object.keys(converted[routeCopy.path][routeCopy.method]).includes(
        "summary"
      )
    ).toBe(true);
  });
  test("Description should be referenced at the same level as tags", () => {
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(
      Object.keys(converted[routeCopy.path][routeCopy.method]).includes(
        "description"
      )
    ).toBe(true);
  });
  test("Consumes key should be referenced at the same level as tags and have an array containing 'application/json'", () => {
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(
      Object.keys(converted[routeCopy.path][routeCopy.method]).includes(
        "consumes"
      )
    ).toBe(true);
    expect(
      converted[routeCopy.path][routeCopy.method]["consumes"]
    ).toHaveLength(1);
    expect(converted[routeCopy.path][routeCopy.method]["consumes"][0]).toBe(
      "application/json"
    );
  });
});

describe("Test convertTsDocToYaml", () => {});
