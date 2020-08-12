import { Variable, VariableRef } from "./CustomVariables/interfaces";
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
  SwaggerJsonRouteResponses,
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
  if (variable.type === "ref") {
    return {
      $ref: variable.ref,
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
): SwaggerJsonRouteResponses => {
  const returnValue: SwaggerJsonRouteResponses = {};
  for (const [code, response] of Object.entries(responses)) {
    if (!response.response) {
      returnValue[code] = {
        description: response.description,
      };
    } else if (
      response.response.type === "oneOf" ||
      response.response.type === "anyOf" ||
      response.response.type === "allOf"
    ) {
      for (const schema of response.response.subSchemas) {
        if (schema.type === "ref") {
          validateVariable(schema as VariableRef);
        } else
          for (const variable of Object.values(schema)) {
            validateVariable(variable);
          }
      }
      returnValue[code] = {
        description: response.description,
        [response.response.type]: response.response.subSchemas.map((schema) =>
          schema.type === "ref"
            ? convertCustomVariableToSwaggerVariable(schema as VariableRef)
            : {
                type: "object",
                properties: Object.fromEntries(
                  Object.entries(schema).map(([name, variable]) => [
                    name,
                    convertCustomVariableToSwaggerVariable(variable),
                  ])
                ),
                description: "root",
                required: Object.entries(schema)
                  .filter(([name, variable]) => variable.required)
                  .map(([name, variable]) => name),
              }
        ),
      };
    } else {
      for (const variable of Object.values(response.response)) {
        validateVariable(variable);
      }
      returnValue[code] = {
        description: response.description,
        response: {
          type: "object",
          description: "root",
          properties: Object.fromEntries(
            Object.entries(response.response).map(([name, variable]) => [
              name,
              convertCustomVariableToSwaggerVariable(variable),
            ])
          ),
          required: Object.entries(response.response)
            .filter(([name, variable]) => variable.required)
            .map(([name, variable]) => name),
        },
      };
    }
  }
  return returnValue;
};

export const convertCustomBodyToOpenAPIJsonFormat = (
  body: RequestBody
): SwaggerJsonRouteRequestBody => {
  if (body.type === "oneOf" || body.type === "anyOf" || body.type === "allOf") {
    for (const schema of body.subSchemas) {
      if (schema.type === "ref") {
        validateVariable(schema as VariableRef);
      } else
        for (const variable of Object.values(schema)) {
          validateVariable(variable);
        }
    }
    return {
      content: {
        "application/json": {
          //@ts-ignore
          schema: {
            [body.type]: body.subSchemas.map((schema) =>
              schema.type === "ref"
                ? convertCustomVariableToSwaggerVariable(schema as VariableRef)
                : {
                    type: "object",
                    description: "root",
                    properties: Object.fromEntries(
                      Object.entries(schema).map(([name, variable]) => [
                        name,
                        convertCustomVariableToSwaggerVariable(variable),
                      ])
                    ),
                    required: Object.entries(schema)
                      .filter(([name, variable]) => variable.required)
                      .map(([name, variable]) => name),
                  }
            ),
          },
        },
      },
    };
  } else {
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
  }
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
