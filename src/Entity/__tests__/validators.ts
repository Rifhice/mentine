import * as utils from "../../Variables/validators";
import { validateEntity } from "../validators";

describe("Validate Entity", () => {
  test("Should be an object", () => {
    expect(() => validateEntity(3)).toThrowError(Error);
    expect(() => validateEntity(null)).toThrowError(Error);
    expect(() => validateEntity([])).toThrowError(Error);
    expect(() => validateEntity(undefined)).toThrowError(Error);
    expect(() => validateEntity("undefined")).toThrowError(Error);
  });
  test("Should contain a name and a schema property", () => {
    expect(() => validateEntity({})).toThrowError(Error);
    expect(() => validateEntity({ name: "lol" })).toThrowError(Error);
    expect(() => validateEntity({ schema: {} })).toThrowError(Error);
  });
  test("Name should be a string", () => {
    expect(() => validateEntity({ name: 3, schema: {} })).toThrowError(Error);
    expect(() => validateEntity({ name: {}, schema: {} })).toThrowError(Error);
    expect(() => validateEntity({ name: null, schema: {} })).toThrowError(
      Error
    );
    expect(() => validateEntity({ name: [], schema: {} })).toThrowError(Error);
    expect(() => validateEntity({ name: undefined, schema: {} })).toThrowError(
      Error
    );
    expect(() =>
      validateEntity({ name: "undefined", schema: {} })
    ).not.toThrowError(Error);
  });
  test("If schema is an ObjectVariable, should call validateVariable", () => {
    const spy = jest.spyOn(utils, "validateVariable");
    validateEntity({
      name: "3",
      schema: {
        date: {
          type: "string",
          description: "lol",
          example: "mdr",
          required: true,
        },
      },
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
  test("If schema is allOf, anyOf or oneOf, should call validateVariable", () => {
    jest.resetAllMocks();
    const spy = jest.spyOn(utils, "validateVariable");
    validateEntity({
      name: "3",
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
  });
});
