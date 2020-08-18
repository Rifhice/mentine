import {
  SwaggerJsonRoute,
  SwaggerJsonRouteParametersPath,
  SwaggerJsonRouteParametersQuery,
  SwaggerJsonRouteRequestBody,
  SwaggerJsonRouteResponses,
} from "../SwaggerJsonTypes/interfaces";
import { convertVariableToSwaggerVariable } from "../Variables/converters";
import { VariableRef } from "../Variables/interfaces";
import { validateVariable } from "../Variables/validators";
import {
  PathVariables,
  QueryVariables,
  RequestBody,
  RequestResponses,
  Route,
} from "./interfaces";
import { validateRoute } from "./validators";

export const convertPathVariableToOpenAPIJsonFormat = (
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

export const convertQueryVariableToOpenAPIJsonFormat = (
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

export const convertResponseToOpenAPIJsonFormat = (
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
              convertVariableToSwaggerVariable(variable),
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

export const convertBodyToOpenAPIJsonFormat = (
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
                ? convertVariableToSwaggerVariable(schema as VariableRef)
                : {
                    type: "object",
                    description: "root",
                    properties: Object.fromEntries(
                      Object.entries(schema).map(([name, variable]) => [
                        name,
                        convertVariableToSwaggerVariable(variable),
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
                convertVariableToSwaggerVariable(variable),
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

export const convertRouteToOpenAPIJsonFormat = (
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
                  ? convertPathVariableToOpenAPIJsonFormat(pathVariables)
                  : []),
                ...(queryVariables
                  ? convertQueryVariableToOpenAPIJsonFormat(queryVariables)
                  : []),
              ],
            }
          : {}),
        ...(body ? { requestBody: convertBodyToOpenAPIJsonFormat(body) } : {}),
        responses: convertResponseToOpenAPIJsonFormat(responses),
      },
    },
  } as SwaggerJsonRoute;
};
