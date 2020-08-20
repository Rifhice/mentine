import { convertEntityToOpenApiFormat } from "./Entity/converters";
import { convertRouteToOpenAPIJsonFormat } from "./Route/converters";
export { Entity } from "./Entity/interfaces";
export { validateEntity } from "./Entity/validators";
export {
  DeleteRoute,
  GetRoute,
  PostRoute,
  PutRoute,
  Route,
} from "./Route/interfaces";
export { validateRoute } from "./Route/validators";
export * from "./Variables/interfaces";

export const convertRouteToOpenApi = (doc: any) => {
  return doc.simplified ? convertRouteToOpenAPIJsonFormat(doc) : doc;
};

export const convertEntityToOpenApi = (doc: any) => {
  return doc.simplified ? convertEntityToOpenApiFormat(doc) : doc;
};
