import { Variable } from "./CustomVariables/interfaces";
import { validateVariable } from "./CustomVariables/validators";
import {
  PathVariables,
  QueryVariables,
  RequestBody,
  RequestResponses,
  Route,
} from "./Routes/interfaces";
import { validateRoute } from "./Routes/validators";
import {
  SwaggerJsonRoute,
  SwaggerJsonRouteParametersPath,
  SwaggerJsonRouteParametersQuery,
  SwaggerJsonRouteRequestBody,
  SwaggerJsonVariable,
} from "./SwaggerJsonTypes/interfaces";

const YAML = require("json2yaml");

export const convertCustomVariableToSwaggerVariable = (
  variable: Variable
): SwaggerJsonVariable => {
  if (variable.type === "object") {
    return {
      ...variable,
      properties: Object.fromEntries(
        Object.entries(variable.properties).map(([name, variable]) => [
          name,
          convertCustomVariableToSwaggerVariable(variable),
        ])
      ),
      required: Object.entries(variable.properties)
        .filter(([name, variable]) => variable.required)
        .map(([name, variable]) => name),
    };
  }
  if (variable.type === "array") {
    return {
      ...variable,
      items: convertCustomVariableToSwaggerVariable(variable.items),
    };
  }
  const { required, ...swaggerVariable } = variable;
  return swaggerVariable as SwaggerJsonVariable;
};

export const convertCustomPathVariableToOpenAPIJsonFormat = (
  pathVariables: PathVariables
): Array<SwaggerJsonRouteParametersPath> => {
  for (const variable of Object.values(pathVariables)) {
    validateVariable(variable);
  }
  return Object.entries(pathVariables).map(([name, { description, type }]) => ({
    in: "path",
    name,
    description: description,
    schema: { type: type },
    required: true,
  }));
};

export const convertCustomQueryVariableToOpenAPIJsonFormat = (
  queryVariables: QueryVariables
): Array<SwaggerJsonRouteParametersQuery> => {
  for (const variable of Object.values(queryVariables)) {
    validateVariable(variable);
  }
  return Object.entries(queryVariables).map(
    ([name, { description, type, required }]) => ({
      in: "query",
      name,
      description: description,
      schema: { type: type },
      required: required,
    })
  );
};

export const convertCustomResponseToOpenAPIJsonFormat = (
  responses: RequestResponses
) => {
  for (const response of Object.values(responses)) {
    if (response.response) validateVariable(response.response);
  }
  return responses;
};

export const convertCustomBodyToOpenAPIJsonFormat = (
  body: RequestBody
): SwaggerJsonRouteRequestBody => {
  for (const property of Object.values(body)) {
    validateVariable(property);
  }
  return {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: Object.fromEntries(
            Object.entries(body).map(([name, variable]) => [
              name,
              convertCustomVariableToSwaggerVariable(variable),
            ])
          ),
          description: "root",
          required: Object.entries(body)
            .filter(([name, variable]) => variable.required)
            .map(([name, variable]) => name),
        },
      },
    },
  };
};

export const convertCustomRouteToOpenAPIJsonFormat = (
  doc: Route
): SwaggerJsonRoute => {
  validateRoute(doc);
  const {
    path,
    method,
    tag,
    summary,
    description,
    pathVariables,
    queryVariables,
    //@ts-ignore
    body,
    responses,
  } = doc;
  return {
    [path]: {
      [method]: {
        tags: [tag],
        summary,
        description,
        consumes: ["application/json"],
        ...(pathVariables || queryVariables
          ? {
              parameters: [
                ...(pathVariables
                  ? convertCustomPathVariableToOpenAPIJsonFormat(pathVariables)
                  : []),
                ...(queryVariables
                  ? convertCustomQueryVariableToOpenAPIJsonFormat(
                      queryVariables
                    )
                  : []),
              ],
            }
          : {}),
        ...(body
          ? { requestBody: convertCustomBodyToOpenAPIJsonFormat(body) }
          : {}),
        responses: convertCustomResponseToOpenAPIJsonFormat(responses),
      },
    },
  } as SwaggerJsonRoute;
};

export const convertTsDocToYaml = (doc: SwaggerJsonRoute) => {
  return YAML.stringify(doc).replace("---\n", "");
};
