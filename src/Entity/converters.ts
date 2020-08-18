import { convertVariableToSwaggerVariable } from "../Variables/converters";
import { VariableRef } from "../Variables/interfaces";
import { Entity } from "./interfaces";

export const convertEntityToOpenApiFormat = (entity: Entity) => {
  const copy: Entity = JSON.parse(JSON.stringify(entity));
  const { name, schema } = copy;
  return {
    [name]: {
      ...(schema.type === "allOf" ||
      schema.type === "oneOf" ||
      schema.type === "anyOf"
        ? {
            [schema.type]: schema.subSchemas.map((schema) =>
              schema.type === "ref"
                ? convertVariableToSwaggerVariable(schema as VariableRef)
                : {
                    type: "object",
                    properties: Object.fromEntries(
                      Object.entries(schema).map(([name, variable]) => [
                        name,
                        convertVariableToSwaggerVariable(variable),
                      ])
                    ),
                    description: "root",
                    required: Object.entries(schema)
                      .filter(([name, variable]) => variable.required)
                      .map(([name, variable]) => name),
                  }
            ),
          }
        : {
            type: "object",
            properties: Object.fromEntries(
              Object.entries(schema).map(([name, variable]) => [
                name,
                convertVariableToSwaggerVariable(variable),
              ])
            ),
            description: "root",
            required: Object.entries(schema)
              .filter(([name, variable]) => variable.required)
              .map(([name, variable]) => name),
          }),
    },
  };
};
