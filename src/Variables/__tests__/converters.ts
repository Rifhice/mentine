import { convertVariableToSwaggerVariable } from "../converters";
import { VariableObject } from "../interfaces";

describe("Test convertVariableToSwaggerVariable", () => {
  const validVariable: VariableObject = {
    type: "object",
    description: "Specific id",
    properties: {
      salut: {
        type: "string",
        description: "hello",
        example: "hi",
        required: true,
      },
      mdr: {
        type: "string",
        description: "hello",
        example: "hi",
        required: false,
      },
    },
    required: true,
  };
  let copyVariable: VariableObject;
  beforeEach(() => (copyVariable = JSON.parse(JSON.stringify(validVariable))));

  test("Should return a valid SwaggerVariable", () => {
    const res = convertVariableToSwaggerVariable(copyVariable);
    expect(res).toEqual({
      type: "object",
      description: copyVariable.description,
      properties: {
        salut: {
          type: "string",
          description: "hello",
          example: "hi",
        },
        mdr: {
          type: "string",
          description: "hello",
          example: "hi",
        },
      },
      required: ["salut"],
    });
  });
  test("Should return a valid SwaggerVariable", () => {
    const res = convertVariableToSwaggerVariable({
      type: "array",
      description: "Specific id",
      items: {
        type: "string",
        description: "hello",
        example: "hi",
        required: true,
      },
      required: true,
    });
    expect(res).toEqual({
      type: "array",
      description: copyVariable.description,
      items: {
        type: "string",
        description: "hello",
        example: "hi",
      },
    });
  });
});
