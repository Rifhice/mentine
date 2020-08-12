import {
  VariableBoolean,
  VariableDate,
  VariableInteger,
  VariableNumber,
  VariablePassword,
  VariableString,
} from "../CustomVariables/interfaces";
import { HttpVerb, ObjectType } from "../interfaces";

export type SwaggerJsonBaseVariableType = {
  description: string;
  nullable?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
};

export interface SwaggerJsonVariableObject extends SwaggerJsonBaseVariableType {
  type: "object";
  properties: {
    [key: string]: SwaggerJsonVariable;
  };
  required: string[];
  minProperties?: number;
  maxProperties?: number;
}

export interface SwaggerJsonVariableArray extends SwaggerJsonBaseVariableType {
  type: "array";
  items: SwaggerJsonVariable;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
}

export type SwaggerJsonVariableRef = {
  $ref: string;
};

export type SwaggerJsonVariable =
  | VariableString
  | VariableNumber
  | VariableInteger
  | VariableBoolean
  | VariableDate
  | VariablePassword
  | SwaggerJsonVariableArray
  | SwaggerJsonVariableObject
  | SwaggerJsonVariableRef;

export interface SwaggerJsonRouteParametersPath {
  in: "path";
  name: string;
  description: string;
  schema: { type: string };
  required: true;
}

export interface SwaggerJsonRouteParametersQuery {
  in: "query";
  name: string;
  description: string;
  schema: { type: string };
  required: boolean;
}

export interface SwaggerJsonRouteRequestBody {
  content: {
    "application/json": {
      schema:
        | SwaggerJsonVariable
        | { oneOf: SwaggerJsonVariable[] }
        | { allOf: SwaggerJsonVariable[] }
        | { anyOf: SwaggerJsonVariable[] }
        | SwaggerJsonVariableRef;
    };
  };
}

export type SwaggerJsonRouteResponse = {
  description: string;
  response?:
    | ObjectType<SwaggerJsonVariable>
    | { oneOf: SwaggerJsonVariable[] }
    | { allOf: SwaggerJsonVariable[] }
    | { anyOf: SwaggerJsonVariable[] }
    | SwaggerJsonVariableRef;
};

export type SwaggerJsonRouteResponses = {
  [key: number]: SwaggerJsonRouteResponse;
};

export interface SwaggerJsonRoute {
  [path: string]: {
    [method in HttpVerb]: {
      tags: string[];
      summary: string;
      description: string;
      consumes: ["application/json"];
      parameters?: Array<
        SwaggerJsonRouteParametersPath | SwaggerJsonRouteParametersQuery
      >;
      requestBody?: SwaggerJsonRouteRequestBody;
      responses: SwaggerJsonRouteResponses;
    };
  };
}
