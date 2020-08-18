import * as utils from "../../Variables/converters";
import { convertEntityToOpenApiFormat } from "../converters";
import { Entity } from "../interfaces";

const validEntity: Entity = {
  simplified: true,
  name: "lol",
  schema: {
    date: {
      type: "string",
      description: "lol",
      example: "mdr",
      required: true,
    },
  },
};

describe("Validate Entity", () => {
  test("Should contain the name key as first top level key", () => {
    const result = convertEntityToOpenApiFormat(validEntity);
    expect(Object.keys(result)[0]).toEqual(validEntity.name);
  });
  test("If schema is an ObjectVariable, should call convertVariableToSwaggerVariable", () => {
    const spy = jest.spyOn(utils, "convertVariableToSwaggerVariable");
    convertEntityToOpenApiFormat(validEntity);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  test("If schema is allOf, anyOf or oneOf, should call convertVariableToSwaggerVariable", () => {
    jest.clearAllMocks();
    const spy = jest.spyOn(utils, "convertVariableToSwaggerVariable");
    convertEntityToOpenApiFormat({
      simplified: true,
      name: "lol",
      schema: {
        type: "allOf",
        subSchemas: [
          {
            date: {
              type: "string",
              description: "lol",
              example: "mdr",
              required: true,
            },
          },
        ],
      },
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(
      convertEntityToOpenApiFormat({
        simplified: true,
        name: "lol",
        schema: {
          type: "anyOf",
          subSchemas: [
            {
              date: {
                type: "array",
                description: "lol",
                required: true,
                items: {
                  type: "ref",
                  ref: "lol",
                  description: "lol",
                  required: true,
                },
              },
            },
          ],
        },
      })
    ).toEqual({
      [validEntity.name]: {
        anyOf: [
          {
            type: "object",
            description: "root",
            required: ["date"],
            properties: {
              date: {
                type: "array",
                description: "lol",
                items: {
                  $ref: "lol",
                },
              },
            },
          },
        ],
      },
    });
    expect(spy).toHaveBeenCalledTimes(3);
    convertEntityToOpenApiFormat({
      ...validEntity,
      schema: {
        type: "oneOf",
        subSchemas: [
          {
            type: "ref",
            ref: "lol",
            description: "lol",
            required: true,
          },
        ],
      },
    });
    expect(spy).toHaveBeenCalledTimes(4);
  });
});
