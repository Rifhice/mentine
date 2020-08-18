import { isAnObject } from "../utils";
import { validateVariable } from "../Variables/validators";
import { Entity } from "./interfaces";

export const validateEntity = (entity: any): Entity => {
  if (!isAnObject(entity)) throw new Error("Should be an object");
  const { name, schema } = entity;
  if (typeof name !== "string") throw new Error("Name should be a string");
  if (!isAnObject(schema)) throw new Error("Schema should be an object");
  if (
    schema.type === "allOf" ||
    schema.type === "anyOf" ||
    schema.type === "oneOf"
  ) {
    for (const value of schema.subSchemas) {
      for (const variable of Object.values(value)) {
        validateVariable(variable as any);
      }
    }
  } else {
    for (const variable of Object.values(schema)) {
      validateVariable(variable as any);
    }
  }
  return entity as Entity;
};
