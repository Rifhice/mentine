export type HttpVerb = "get" | "post" | "put" | "delete";

export type ObjectType<T> = {
  [key: string]: T;
};
