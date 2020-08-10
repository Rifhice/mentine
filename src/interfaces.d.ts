import { Variable } from "./SwaggerVariables/interfaces";

export type ObjectType<T> = {
  [key: string]: T;
};

export type RequestResponses = {
  [key: number]: RequestResponse;
};

export type RequestResponse = {
  description: string;
  response?: Variable;
};

export type Route = GetRoute | PostRoute | PutRoute | DeleteRoute;

export interface BaseRoute {
  path: string;
  method: "get" | "post" | "put" | "delete";
  tag: string;
  summary: string;
  description: string;
  pathVariables?: ObjectType<Omit<Variable, "required">>;
  queryVariables?: ObjectType<Variable>;
  responses: RequestResponses;
}

export interface GetRoute extends BaseRoute {
  method: "get";
}

export interface PostRoute extends BaseRoute {
  method: "post";
  body?: ObjectType<Variable>;
}

export interface PutRoute extends BaseRoute {
  method: "put";
  body?: ObjectType<Variable>;
}

export interface DeleteRoute extends BaseRoute {
  method: "delete";
}
