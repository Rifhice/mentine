export type BaseVariableType = {
  required: boolean;
  description: string;
  nullable?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
};

export interface VariableNumber extends BaseVariableType {
  type: "number";
  example: number;
  maximum?: number;
  minimum?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
  multipleOf?: number;
}
export interface VariableInteger extends BaseVariableType {
  type: "integer";
  example: number;
  maximum?: number;
  minimum?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
  multipleOf?: number;
}
export interface VariableString extends BaseVariableType {
  type: "string";
  example: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  enum?: string[];
}

export interface VariablePassword extends BaseVariableType {
  type: "password";
  example: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface VariableDate extends BaseVariableType {
  type: "date";
  example: Date | string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface VariableBoolean extends BaseVariableType {
  type: "boolean";
  example: boolean;
}

export interface VariableArray extends BaseVariableType {
  type: "array";
  items: Variable;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
}

export interface VariableObject extends BaseVariableType {
  type: "object";
  properties: {
    [key: string]: Variable;
  };
  minProperties?: number;
  maxProperties?: number;
}

export interface VariableRef extends BaseVariableType {
  type: "ref";
  ref: string;
}

export type Variable =
  | VariableString
  | VariableNumber
  | VariableInteger
  | VariableBoolean
  | VariableDate
  | VariablePassword
  | VariableArray
  | VariableObject
  | VariableRef;

export interface oneOf<T> {
  type: "oneOf";
  subSchemas: T[];
  discriminator?: string;
}

export interface anyOf<T> {
  type: "anyOf";
  subSchemas: T[];
}

export interface allOf<T> {
  type: "allOf";
  subSchemas: T[];
}
