import { Variable } from "../CustomVariables/interfaces";
import { HttpVerb, ObjectType } from "../interfaces";

export type RequestResponses = {
  [key: number]: RequestResponse;
};

export type RequestResponse = {
  description: string;
  response?: Variable;
};

export type PathVariables = ObjectType<Variable & { required: true }>;

export type QueryVariables = ObjectType<Variable>;

export type RequestBody = ObjectType<Variable>;

export type Route = GetRoute | PostRoute | PutRoute | DeleteRoute;

export interface BaseRoute {
  path: string;
  method: HttpVerb;
  tag: string;
  summary: string;
  description: string;
  pathVariables?: PathVariables;
  queryVariables?: QueryVariables;
  responses: RequestResponses;
}

export interface GetRoute extends BaseRoute {
  method: "get";
}

export interface PostRoute extends BaseRoute {
  method: "post";
  body?: RequestBody;
}

export interface PutRoute extends BaseRoute {
  method: "put";
  body?: RequestBody;
}

export interface DeleteRoute extends BaseRoute {
  method: "delete";
}
