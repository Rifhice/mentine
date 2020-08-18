import { ObjectType } from "../interfaces";
import {
  allOf,
  anyOf,
  oneOf,
  Variable,
  VariableRef,
} from "../Variables/interfaces";

export interface Entity {
  simplified: true;
  name: string;
  schema:
    | ObjectType<Variable>
    | oneOf<ObjectType<Variable> | VariableRef>
    | allOf<ObjectType<Variable> | VariableRef>
    | anyOf<ObjectType<Variable> | VariableRef>;
}
