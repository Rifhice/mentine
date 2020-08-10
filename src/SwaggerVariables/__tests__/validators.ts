import {
  Variable,
  VariableArray,
  VariableBoolean,
  VariableDate,
  VariableInteger,
  VariableNumber,
  VariableObject,
  VariablePassword,
  VariableString,
} from "../interfaces";
import {
  validateArrayVariable,
  validateBaseVariable,
  validateBooleanVariable,
  validateDateVariable,
  validateIntegerVariable,
  validateNumberVariable,
  validateObjectVariable,
  validatePasswordVariable,
  validateStringVariable,
} from "../validators";

describe("Test validateBaseVariable", () => {
  const validVariable: Variable = {
    type: "string",
    description: "Salut",
    required: true,
    example: "mdrr",
  };
  let copyValidVariable: Variable;

  beforeEach(
    () => (copyValidVariable = JSON.parse(JSON.stringify(validVariable)))
  );

  test("Type is required", () => {
    delete copyValidVariable.type;
    const func = () => validateBaseVariable(copyValidVariable);
    expect(func).toThrowError(Error);
  });
  test("Description is a required string", () => {
    const func = () => validateBaseVariable(copyValidVariable);
    //@ts-ignore
    copyValidVariable.description = true;
    expect(func).toThrowError(Error);
    delete copyValidVariable.description;
    expect(func).toThrowError(Error);
  });
  test("Required is a required boolean", () => {
    const func = () => validateBaseVariable(copyValidVariable);
    //@ts-ignore
    copyValidVariable.required = "true";
    expect(func).toThrowError(Error);
    delete copyValidVariable.required;
    expect(func).toThrowError(Error);
  });
  test("Nullable is an optionnal boolean", () => {
    const func = () => validateBaseVariable(copyValidVariable);
    //@ts-ignore
    copyValidVariable.nullable = "true";
    expect(func).toThrowError(Error);
  });
  test("ReadOnly is an optionnal boolean", () => {
    const func = () => validateBaseVariable(copyValidVariable);
    //@ts-ignore
    copyValidVariable.readOnly = "true";
    expect(func).toThrowError(Error);
  });
  test("WriteOnly is an optionnal boolean", () => {
    const func = () => validateBaseVariable(copyValidVariable);
    //@ts-ignore
    copyValidVariable.writeOnly = "true";
    expect(func).toThrowError(Error);
  });

  describe("Validate string variable", () => {
    const validStringVariable: VariableString = {
      type: "string",
      description: "Salut",
      required: true,
      example: "mdrr",
    };

    let copyStringVariable: VariableString;

    beforeEach(
      () =>
        (copyStringVariable = JSON.parse(JSON.stringify(validStringVariable)))
    );

    test("Example is a required string", () => {
      const func = () => validateStringVariable(copyStringVariable);
      //@ts-ignore
      copyStringVariable.example = true;
      expect(func).toThrowError(Error);
      delete copyStringVariable.example;
      expect(func).toThrowError(Error);
    });
    test("Enum is an optionnal array of strings", () => {
      const func = () => validateStringVariable(copyStringVariable);
      //@ts-ignore
      copyStringVariable.enum = true;
      expect(func).toThrowError(Error);
      //@ts-ignore
      copyStringVariable.enum = [3];
      expect(func).toThrowError(Error);
      copyStringVariable.enum = ["salut"];
      expect(func).not.toThrowError(Error);
      delete copyStringVariable.enum;
      expect(func).not.toThrowError(Error);
    });
    test("Maxlength is an optionnal number", () => {
      const func = () => validateStringVariable(copyStringVariable);
      //@ts-ignore
      copyStringVariable.maxLength = "3";
      expect(func).toThrowError(Error);
      copyStringVariable.maxLength = 3;
      expect(func).not.toThrowError(Error);
      delete copyStringVariable.maxLength;
      expect(func).not.toThrowError(Error);
    });
    test("MinLength is an optionnal number", () => {
      const func = () => validateStringVariable(copyStringVariable);
      //@ts-ignore
      copyStringVariable.minLength = "3";
      expect(func).toThrowError(Error);
      copyStringVariable.minLength = 3;
      expect(func).not.toThrowError(Error);
      delete copyStringVariable.minLength;
      expect(func).not.toThrowError(Error);
    });
    test("Pattern is an optionnal regex", () => {
      const func = () => validateStringVariable(copyStringVariable);
      //@ts-ignore
      copyStringVariable.pattern = 3;
      expect(func).toThrowError(Error);
      copyStringVariable.pattern = "/salut/";
      expect(func).not.toThrowError(Error);
      delete copyStringVariable.pattern;
      expect(func).not.toThrowError(Error);
    });
  });

  describe("Validate number variable", () => {
    const validNumberVariable: VariableNumber = {
      type: "number",
      description: "Salut",
      required: true,
      example: 3,
    };

    let copyNumberVariable: VariableNumber;

    beforeEach(
      () =>
        (copyNumberVariable = JSON.parse(JSON.stringify(validNumberVariable)))
    );

    test("Example is a required number", () => {
      const func = () => validateNumberVariable(copyNumberVariable);
      //@ts-ignore
      copyNumberVariable.example = true;
      expect(func).toThrowError(Error);
      copyNumberVariable.example = 3;
      expect(func).not.toThrowError(Error);
      delete copyNumberVariable.example;
      expect(func).toThrowError(Error);
    });
    test("Exclusive maximum is a required number", () => {
      const func = () => validateNumberVariable(copyNumberVariable);
      //@ts-ignore
      copyNumberVariable.exclusiveMaximum = true;
      expect(func).toThrowError(Error);
      copyNumberVariable.exclusiveMaximum = 3;
      expect(func).not.toThrowError(Error);
      delete copyNumberVariable.exclusiveMaximum;
      expect(func).not.toThrowError(Error);
    });
    test("Exclusive minimum is a required number", () => {
      const func = () => validateNumberVariable(copyNumberVariable);
      //@ts-ignore
      copyNumberVariable.exclusiveMinimum = true;
      expect(func).toThrowError(Error);
      copyNumberVariable.exclusiveMinimum = 3;
      expect(func).not.toThrowError(Error);
      delete copyNumberVariable.exclusiveMinimum;
      expect(func).not.toThrowError(Error);
    });
    test("Minimum is a required number", () => {
      const func = () => validateNumberVariable(copyNumberVariable);
      //@ts-ignore
      copyNumberVariable.minimum = true;
      expect(func).toThrowError(Error);
      copyNumberVariable.minimum = 3;
      expect(func).not.toThrowError(Error);
      delete copyNumberVariable.minimum;
      expect(func).not.toThrowError(Error);
    });
    test("Maximum is a required number", () => {
      const func = () => validateNumberVariable(copyNumberVariable);
      //@ts-ignore
      copyNumberVariable.maximum = true;
      expect(func).toThrowError(Error);
      copyNumberVariable.maximum = 3;
      expect(func).not.toThrowError(Error);
      delete copyNumberVariable.maximum;
      expect(func).not.toThrowError(Error);
    });
    test("MultipleOf is a required number", () => {
      const func = () => validateNumberVariable(copyNumberVariable);
      //@ts-ignore
      copyNumberVariable.multipleOf = true;
      expect(func).toThrowError(Error);
      copyNumberVariable.multipleOf = 3;
      expect(func).not.toThrowError(Error);
      delete copyNumberVariable.multipleOf;
      expect(func).not.toThrowError(Error);
    });
  });
  describe("Validate integer variable", () => {
    const validIntegerVariable: VariableInteger = {
      type: "integer",
      description: "Salut",
      required: true,
      example: 3,
    };

    let copyIntegerVariable: VariableInteger;

    beforeEach(
      () =>
        (copyIntegerVariable = JSON.parse(JSON.stringify(validIntegerVariable)))
    );

    test("Example is a required number", () => {
      const func = () => validateIntegerVariable(copyIntegerVariable);
      //@ts-ignore
      copyIntegerVariable.example = true;
      expect(func).toThrowError(Error);
      copyIntegerVariable.example = 3;
      expect(func).not.toThrowError(Error);
      delete copyIntegerVariable.example;
      expect(func).toThrowError(Error);
    });
    test("Exclusive maximum is a required number", () => {
      const func = () => validateIntegerVariable(copyIntegerVariable);
      //@ts-ignore
      copyIntegerVariable.exclusiveMaximum = true;
      expect(func).toThrowError(Error);
      copyIntegerVariable.exclusiveMaximum = 3;
      expect(func).not.toThrowError(Error);
      delete copyIntegerVariable.exclusiveMaximum;
      expect(func).not.toThrowError(Error);
    });
    test("Exclusive minimum is a required number", () => {
      const func = () => validateIntegerVariable(copyIntegerVariable);
      //@ts-ignore
      copyIntegerVariable.exclusiveMinimum = true;
      expect(func).toThrowError(Error);
      copyIntegerVariable.exclusiveMinimum = 3;
      expect(func).not.toThrowError(Error);
      delete copyIntegerVariable.exclusiveMinimum;
      expect(func).not.toThrowError(Error);
    });
    test("Minimum is a required number", () => {
      const func = () => validateIntegerVariable(copyIntegerVariable);
      //@ts-ignore
      copyIntegerVariable.minimum = true;
      expect(func).toThrowError(Error);
      copyIntegerVariable.minimum = 3;
      expect(func).not.toThrowError(Error);
      delete copyIntegerVariable.minimum;
      expect(func).not.toThrowError(Error);
    });
    test("Maximum is a required number", () => {
      const func = () => validateIntegerVariable(copyIntegerVariable);
      //@ts-ignore
      copyIntegerVariable.maximum = true;
      expect(func).toThrowError(Error);
      copyIntegerVariable.maximum = 3;
      expect(func).not.toThrowError(Error);
      delete copyIntegerVariable.maximum;
      expect(func).not.toThrowError(Error);
    });
    test("MultipleOf is a required number", () => {
      const func = () => validateIntegerVariable(copyIntegerVariable);
      //@ts-ignore
      copyIntegerVariable.multipleOf = true;
      expect(func).toThrowError(Error);
      copyIntegerVariable.multipleOf = 3;
      expect(func).not.toThrowError(Error);
      delete copyIntegerVariable.multipleOf;
      expect(func).not.toThrowError(Error);
    });
  });

  describe("Validate password variable", () => {
    const validPasswordVariable: VariablePassword = {
      type: "password",
      description: "Salut",
      required: true,
      example: "mdrr",
    };

    let copyPasswordVariable: VariablePassword;

    beforeEach(
      () =>
        (copyPasswordVariable = JSON.parse(
          JSON.stringify(validPasswordVariable)
        ))
    );

    test("Example is a required string", () => {
      const func = () => validatePasswordVariable(copyPasswordVariable);
      //@ts-ignore
      copyPasswordVariable.example = true;
      expect(func).toThrowError(Error);
      copyPasswordVariable.example = "true";
      expect(func).not.toThrowError(Error);
      delete copyPasswordVariable.example;
      expect(func).toThrowError(Error);
    });
    test("Maxlength is an optionnal number", () => {
      const func = () => validatePasswordVariable(copyPasswordVariable);
      //@ts-ignore
      copyPasswordVariable.maxLength = "3";
      expect(func).toThrowError(Error);
      copyPasswordVariable.maxLength = 3;
      expect(func).not.toThrowError(Error);
      delete copyPasswordVariable.maxLength;
      expect(func).not.toThrowError(Error);
    });
    test("MinLength is an optionnal number", () => {
      const func = () => validatePasswordVariable(copyPasswordVariable);
      //@ts-ignore
      copyPasswordVariable.minLength = "3";
      expect(func).toThrowError(Error);
      copyPasswordVariable.minLength = 3;
      expect(func).not.toThrowError(Error);
      delete copyPasswordVariable.minLength;
      expect(func).not.toThrowError(Error);
    });
    test("Pattern is an optionnal regex", () => {
      const func = () => validatePasswordVariable(copyPasswordVariable);
      //@ts-ignore
      copyPasswordVariable.pattern = 3;
      expect(func).toThrowError(Error);
      copyPasswordVariable.pattern = "/salut/";
      expect(func).not.toThrowError(Error);
      delete copyPasswordVariable.pattern;
      expect(func).not.toThrowError(Error);
    });
  });

  describe("Validate date variable", () => {
    const validDateVariable: VariableDate = {
      type: "date",
      description: "Salut",
      required: true,
      example: "01 Jan 1970 00:00:00 GMT",
    };

    let copyDateVariable: VariableDate;

    beforeEach(
      () => (copyDateVariable = JSON.parse(JSON.stringify(validDateVariable)))
    );

    test("Example is a required string", () => {
      const func = () => validateDateVariable(copyDateVariable);
      //@ts-ignore
      copyDateVariable.example = true;
      expect(func).toThrowError(Error);
      copyDateVariable.example = "true";
      expect(func).toThrowError(Error);
      copyDateVariable.example = new Date();
      expect(func).not.toThrowError(Error);
      copyDateVariable.example = "01 Jan 1970 00:00:00 GMT";
      expect(func).not.toThrowError(Error);
      delete copyDateVariable.example;
      expect(func).toThrowError(Error);
    });
    test("Maxlength is an optionnal number", () => {
      const func = () => validateDateVariable(copyDateVariable);
      //@ts-ignore
      copyDateVariable.maxLength = "3";
      expect(func).toThrowError(Error);
      copyDateVariable.maxLength = 3;
      expect(func).not.toThrowError(Error);
      delete copyDateVariable.maxLength;
      expect(func).not.toThrowError(Error);
    });
    test("MinLength is an optionnal number", () => {
      const func = () => validateDateVariable(copyDateVariable);
      //@ts-ignore
      copyDateVariable.minLength = "3";
      expect(func).toThrowError(Error);
      copyDateVariable.minLength = 3;
      expect(func).not.toThrowError(Error);
      delete copyDateVariable.minLength;
      expect(func).not.toThrowError(Error);
    });
    test("Pattern is an optionnal regex", () => {
      const func = () => validateDateVariable(copyDateVariable);
      //@ts-ignore
      copyDateVariable.pattern = 3;
      expect(func).toThrowError(Error);
      copyDateVariable.pattern = "/salut/";
      expect(func).not.toThrowError(Error);
      delete copyDateVariable.pattern;
      expect(func).not.toThrowError(Error);
    });
  });

  describe("Validate boolean variable", () => {
    const validBooleanVariable: VariableBoolean = {
      type: "boolean",
      description: "Salut",
      required: true,
      example: true,
    };

    let copyBooleanVariable: VariableBoolean;

    beforeEach(
      () =>
        (copyBooleanVariable = JSON.parse(JSON.stringify(validBooleanVariable)))
    );

    test("Example is a required boolean", () => {
      const func = () => validateBooleanVariable(copyBooleanVariable);
      //@ts-ignore
      copyBooleanVariable.example = "true";
      expect(func).toThrowError(Error);
      copyBooleanVariable.example = true;
      expect(func).not.toThrowError(Error);
      copyBooleanVariable.example = false;
      expect(func).not.toThrowError(Error);
      delete copyBooleanVariable.example;
      expect(func).toThrowError(Error);
    });
  });

  describe("Validate object variable", () => {
    const validObjectVariable: VariableObject = {
      type: "object",
      description: "Salut",
      required: true,
      properties: {
        name: {
          type: "string",
          description: "slt",
          example: "yo",
          required: true,
        },
      },
    };

    let copyObjectVariable: VariableObject;

    beforeEach(
      () =>
        (copyObjectVariable = JSON.parse(JSON.stringify(validObjectVariable)))
    );

    test("Properties is a required hashmap of variables", () => {
      const func = () => validateObjectVariable(copyObjectVariable);

      expect(func).not.toThrowError(Error);

      delete copyObjectVariable.properties;
      expect(func).toThrowError(Error);

      //@ts-ignore
      copyObjectVariable.properties = "true";
      expect(func).toThrowError(Error);
      //@ts-ignore
      copyObjectVariable.properties = 2;
      expect(func).toThrowError(Error);
      //@ts-ignore
      copyObjectVariable.properties = [];
      expect(func).toThrowError(Error);
      //@ts-ignore
      copyObjectVariable.properties = { type: "string" };
      expect(func).toThrowError(Error);
    });
  });
  describe("Validate array variable", () => {
    const validArrayVariable: VariableArray = {
      type: "array",
      description: "kappa",
      required: true,
      items: {
        type: "object",
        description: "hey",
        required: true,
        properties: {
          sender: {
            type: "string",
            description: "ah",
            example: "me",
            required: true,
          },
          content: {
            type: "object",
            description: "lol",
            required: true,
            properties: {
              value: {
                type: "string",
                description: "kappa",
                example: "lol",
                required: true,
              },
              mentions: {
                type: "array",
                description: "kappa",
                required: true,
                items: {
                  type: "object",
                  description: "kappa",
                  required: true,
                  properties: {
                    user: {
                      type: "string",
                      description: "kappa",
                      required: true,
                      example: "pff",
                    },
                    value: {
                      type: "string",
                      description: "kappa",
                      required: true,
                      example: "pff",
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    let copyArrayVariable: VariableArray;

    beforeEach(
      () => (copyArrayVariable = JSON.parse(JSON.stringify(validArrayVariable)))
    );

    test("Items is a required variable", () => {
      const func = () => validateArrayVariable(copyArrayVariable);

      expect(func).not.toThrowError(Error);

      delete copyArrayVariable.items;
      expect(func).toThrowError(Error);

      //@ts-ignore
      copyArrayVariable.items = "true";
      expect(func).toThrowError(Error);
      //@ts-ignore
      copyArrayVariable.items = 2;
      expect(func).toThrowError(Error);
      //@ts-ignore
      copyArrayVariable.items = [];
      expect(func).toThrowError(Error);
      //@ts-ignore
      copyArrayVariable.items = { type: "string" };
      expect(func).toThrowError(Error);
    });
  });
});
