import {
  VariableBoolean,
  VariableDate,
  VariableInteger,
  VariableNumber,
  VariablePassword,
  VariableString,
} from "../CustomVariables/interfaces";
import { HttpVerb } from "../interfaces";
import { RequestResponse } from "../Routes/interfaces";

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

export type SwaggerJsonVariable =
  | VariableString
  | VariableNumber
  | VariableInteger
  | VariableBoolean
  | VariableDate
  | VariablePassword
  | SwaggerJsonVariableArray
  | SwaggerJsonVariableObject;

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
      schema: SwaggerJsonVariable;
    };
  };
}

export type SwaggerJsonRouteResponses = {
  [key: number]: RequestResponse;
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
