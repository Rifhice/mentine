import { SwaggerJsonVariable } from "../SwaggerJsonTypes/interfaces";
import { Variable } from "./interfaces";

export const convertVariableToSwaggerVariable = (
  variable: Variable
): SwaggerJsonVariable => {
  const copy: Variable = JSON.parse(JSON.stringify(variable));
  if (copy.type === "object") {
    return {
      ...copy,
      properties: Object.fromEntries(
        Object.entries(copy.properties).map(([name, variable]) => [
          name,
          convertVariableToSwaggerVariable(variable),
        ])
      ),
      required: Object.entries(copy.properties)
        .filter(([name, variable]) => variable.required)
        .map(([name, variable]) => name),
    };
  }
  if (copy.type === "array") {
    const { required, ...swaggerVariable } = copy;
    return {
      ...swaggerVariable,
      items: convertVariableToSwaggerVariable(copy.items),
    };
  }
  if (copy.type === "ref") {
    return {
      $ref: copy.ref,
    };
  }
  const { required, ...swaggerVariable } = copy;
  return swaggerVariable as SwaggerJsonVariable;
};
