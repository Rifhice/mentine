import {
  DeleteRoute,
  GetRoute,
  PostRoute,
  PutRoute,
  RequestResponse,
  Route,
} from "../interfaces";
import { validateVariable } from "../SwaggerVariables/validators";
import { isAnObject } from "../utils";

export const validateRequestResponse = (requestResponse: RequestResponse) => {
  const { description, response } = requestResponse;
  if (!description) throw new Error("Description is required");
  if (typeof description !== "string")
    throw new Error("Description should be a string");
  if (response) {
    if (!isAnObject(response)) {
      throw new Error("Response should be an object");
    }
    validateVariable(response);
  }
};

export const validatePostRoute = (postRoute: PostRoute) => {
  validateBaseRouteObject(postRoute);
  const { body } = postRoute;
  if (body) {
    if (!isAnObject(body)) {
      throw new Error("Body should be an object");
    }
    for (const value of Object.values(body)) {
      validateVariable(value);
    }
  }
};

export const validatePutRoute = (putRoute: PutRoute) => {
  validateBaseRouteObject(putRoute);
  const { body } = putRoute;
  if (body) {
    if (!isAnObject(body)) {
      throw new Error("Body should be an object");
    }
    for (const value of Object.values(body)) {
      validateVariable(value);
    }
  }
};

export const validateGetRoute = (getRoute: GetRoute) => {
  return validateBaseRouteObject(getRoute);
};

export const validateDeleteRoute = (deleteRoute: DeleteRoute) => {
  return validateBaseRouteObject(deleteRoute);
};

export const validateRoute = (route: Route) => {
  if (route.method === "get") {
    return validateGetRoute(route);
  } else if (route.method === "post") {
    return validatePostRoute(route);
  } else if (route.method === "put") {
    return validatePutRoute(route);
  } else if (route.method === "delete") {
    return validateDeleteRoute(route);
  }
  throw new Error("Route method unknown");
};

export const validateBaseRouteObject = (doc: Route) => {
  const {
    path,
    method,
    tag,
    summary,
    description,
    pathVariables,
    queryVariables,
    responses,
  } = doc;
  if (!path) throw new Error("Path is required");
  if (typeof path !== "string") throw new Error("Path should be a string");
  if (!method) throw new Error("Method is required");
  if (!["get", "post", "put", "delete"].includes(method))
    throw new Error("Method should be get | post | put | delete");
  if (!tag) throw new Error("Tag is required");
  if (typeof tag !== "string") throw new Error("Tag should be a string");
  if (!summary) throw new Error("Summary is required");
  if (typeof summary !== "string")
    throw new Error("Summary should be a string");
  if (!description) throw new Error("Description is required");
  if (typeof description !== "string")
    throw new Error("Description should be a string");
  if (pathVariables !== undefined) {
    if (!isAnObject(pathVariables))
      throw new Error("Path variables should be an object");
  }
  if (queryVariables !== undefined) {
    if (!isAnObject(queryVariables))
      throw new Error("Query variables should be an object");
  }
  if (!responses || !isAnObject(responses)) {
    throw new Error("Responses is a required object");
  }
  if (!Object.keys(responses).every((code) => +code >= 100 && +code <= 600)) {
    throw new Error("Responses key should be http codes");
  }
  for (const response of Object.values(responses)) {
    validateRequestResponse(response);
  }
};
