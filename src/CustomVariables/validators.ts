import { isAnObject } from "../utils";
import {
  Variable,
  VariableArray,
  VariableBoolean,
  VariableDate,
  VariableInteger,
  VariableNumber,
  VariableObject,
  VariablePassword,
  VariableRef,
  VariableString,
} from "./interfaces";
const YAML = require("json2yaml");

export const validateBaseVariable = (variable: Variable) => {
  const {
    type,
    description,
    required,
    nullable,
    readOnly,
    writeOnly,
  } = variable;
  if (!type) throw new Error("Type is required");
  if (
    ![
      "number",
      "integer",
      "string",
      "password",
      "date",
      "boolean",
      "array",
      "object",
      "oneOf",
      "anyOf",
      "allOf",
      "ref",
    ].includes(type)
  )
    throw new Error("Type is required");
  if (!description) throw new Error("Description is required");
  if (typeof description !== "string")
    throw new Error("Description should be a string");
  if (typeof required === "undefined") throw new Error("Required is required");
  if (typeof required !== "boolean")
    throw new Error("Required should be a boolean");
  if (typeof nullable !== "undefined" && typeof nullable !== "boolean")
    throw new Error("Nullable should be a boolean");
  if (typeof readOnly !== "undefined" && typeof readOnly !== "boolean")
    throw new Error("ReadOnly should be a boolean");
  if (typeof writeOnly !== "undefined" && typeof writeOnly !== "boolean")
    throw new Error("WriteOnly should be a boolean");
};

export const validateStringVariable = (stringVariable: VariableString) => {
  validateBaseVariable(stringVariable);
  const {
    example,
    enum: variableEnum,
    maxLength,
    minLength,
    pattern,
  } = stringVariable;
  if (!example) throw new Error("Example is required");
  if (typeof example !== "string")
    throw new Error("Example should be a string");
  if (variableEnum) {
    if (!Array.isArray(variableEnum)) {
      throw new Error("Enum should be an array");
    }
    if (variableEnum.some((variable) => typeof variable !== "string")) {
      throw new Error("Enum should be an array of strings");
    }
  }
  if (maxLength) {
    if (typeof maxLength !== "number") {
      throw new Error("Max lenght should be a number");
    }
  }
  if (minLength) {
    if (typeof minLength !== "number") {
      throw new Error("Max lenght should be a number");
    }
  }
  if (pattern) {
    if (typeof pattern !== "string") {
      throw new Error("Pattern should be a string");
    }
  }
};

export const validatePasswordVariable = (
  passwordVariable: VariablePassword
) => {
  validateBaseVariable(passwordVariable);
  const { example, maxLength, minLength, pattern } = passwordVariable;
  if (!example) throw new Error("Example is required");
  if (typeof example !== "string")
    throw new Error("Example should be a string");
  if (maxLength) {
    if (typeof maxLength !== "number") {
      throw new Error("Max lenght should be a number");
    }
  }
  if (minLength) {
    if (typeof minLength !== "number") {
      throw new Error("Max lenght should be a number");
    }
  }
  if (pattern) {
    if (typeof pattern !== "string") {
      throw new Error("Pattern should be a string");
    }
  }
};

export const validateDateVariable = (dateVariable: VariableDate) => {
  validateBaseVariable(dateVariable);
  const { example, maxLength, minLength, pattern } = dateVariable;
  if (!example) throw new Error("Example is required");
  if (typeof example !== "string" && !((example as any) instanceof Date))
    throw new Error("Example should be a string or a date");
  if (typeof example === "string" && isNaN(Date.parse(example)))
    throw new Error("Example should be a date");
  if (maxLength) {
    if (typeof maxLength !== "number") {
      throw new Error("Max lenght should be a number");
    }
  }
  if (minLength) {
    if (typeof minLength !== "number") {
      throw new Error("Max lenght should be a number");
    }
  }
  if (pattern) {
    if (typeof pattern !== "string") {
      throw new Error("Pattern should be a string");
    }
  }
};

export const validateNumberVariable = (numberVariable: VariableNumber) => {
  validateBaseVariable(numberVariable);
  const {
    example,
    exclusiveMaximum,
    exclusiveMinimum,
    minimum,
    maximum,
    multipleOf,
  } = numberVariable;
  if (typeof example === "undefined") throw new Error("Example is required");
  if (typeof example !== "number")
    throw new Error("Example should be a number");
  if (exclusiveMaximum) {
    if (typeof exclusiveMaximum !== "number")
      throw new Error("Exclusive maximum should be a number");
  }
  if (exclusiveMinimum) {
    if (typeof exclusiveMinimum !== "number")
      throw new Error("Exclusive minimum should be a number");
  }
  if (minimum) {
    if (typeof minimum !== "number")
      throw new Error("Minimum should be a number");
  }
  if (maximum) {
    if (typeof maximum !== "number")
      throw new Error("Maximum should be a number");
  }
  if (multipleOf) {
    if (typeof multipleOf !== "number")
      throw new Error("MultipleOf should be a number");
  }
};

export const validateBooleanVariable = (booleanVariable: VariableBoolean) => {
  validateBaseVariable(booleanVariable);
  const { example } = booleanVariable;
  if (typeof example === "undefined") throw new Error("Example is required");
  if (typeof example !== "boolean")
    throw new Error("Example should be a boolean");
};

export const validateIntegerVariable = (numberVariable: VariableInteger) => {
  validateBaseVariable(numberVariable);
  const {
    example,
    exclusiveMaximum,
    exclusiveMinimum,
    minimum,
    maximum,
    multipleOf,
  } = numberVariable;
  if (typeof example === "undefined") throw new Error("Example is required");
  if (typeof example !== "number")
    throw new Error("Example should be a number");
  if (exclusiveMaximum) {
    if (typeof exclusiveMaximum !== "number")
      throw new Error("Exclusive maximum should be a number");
  }
  if (exclusiveMinimum) {
    if (typeof exclusiveMinimum !== "number")
      throw new Error("Exclusive minimum should be a number");
  }
  if (minimum) {
    if (typeof minimum !== "number")
      throw new Error("Minimum should be a number");
  }
  if (maximum) {
    if (typeof maximum !== "number")
      throw new Error("Maximum should be a number");
  }
  if (multipleOf) {
    if (typeof multipleOf !== "number")
      throw new Error("MultipleOf should be a number");
  }
};

export const validateObjectVariable = (objectVariable: VariableObject) => {
  validateBaseVariable(objectVariable);
  const { properties } = objectVariable;
  if (!properties) throw new Error("Property 'properties' is required");
  if (!isAnObject(properties))
    throw new Error("Property 'properties' should be a hashmap of variable");
  for (const property of Object.values(properties)) {
    validateVariable(property);
  }
};

export const validateArrayVariable = (arrayVariable: VariableArray) => {
  validateBaseVariable(arrayVariable);
  const { items } = arrayVariable;
  if (!items) throw new Error("Property 'items' is required");
  if (!isAnObject(items))
    throw new Error("Property 'items' should be a variable");
  validateVariable(items);
};

export const validateRefVariable = (refVariable: VariableRef) => {
  validateBaseVariable(refVariable);
  const { ref } = refVariable;
  if (typeof ref !== "string") throw new Error("Ref is a required string");
  if (!ref.startsWith("#/components/"))
    throw new Error("Ref should start with '#/components/'");
};

export const validateVariable = (variable: Variable) => {
  const typeValidatorMap = {
    string: validateStringVariable,
    number: validateNumberVariable,
    integer: validateIntegerVariable,
    password: validatePasswordVariable,
    date: validateDateVariable,
    boolean: validateBooleanVariable,
    array: validateArrayVariable,
    object: validateObjectVariable,
    ref: validateRefVariable,
  };
  if (typeof typeValidatorMap[variable.type] !== "function") {
    throw new Error("Unknown variable type " + JSON.stringify(variable));
  }
  //@ts-ignore
  typeValidatorMap[variable.type](variable);
};
