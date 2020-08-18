import { convertEntityToOpenApiFormat } from "./Entity/converters";
import { convertRouteToOpenAPIJsonFormat } from "./Route/converters";

export const convertRouteToOpenApi = (doc: any) => {
  return doc.simplified ? convertRouteToOpenAPIJsonFormat(doc) : doc;
};

export const convertEntityToOpenApi = (doc: any) => {
  return doc.simplified ? convertEntityToOpenApiFormat(doc) : doc;
};
