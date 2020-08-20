import { convertEntityToOpenApiFormat } from "./Entity/converters";
import { convertRouteToOpenAPIJsonFormat } from "./Route/converters";
export * from "./Entity/interfaces";
export * from "./Entity/validators";
export * from "./interfaces";
export * from "./Route/interfaces";
export * from "./Route/validators";
export * from "./Variables/interfaces";

export const convertRouteToOpenApi = (doc: any) => {
  return doc.simplified ? convertRouteToOpenAPIJsonFormat(doc) : doc;
};

export const convertEntityToOpenApi = (doc: any) => {
  return doc.simplified ? convertEntityToOpenApiFormat(doc) : doc;
};
