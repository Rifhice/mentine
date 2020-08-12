#!/usr/bin/env node
import { PutRoute } from "./Routes/interfaces";
import {
  convertCustomRouteToOpenAPIJsonFormat,
  convertTsDocToYaml,
} from "./tsToYamlConverter";

const validPutRoute: PutRoute = {
  path: "/api/user/:id/blacklist",
  method: "put",
  tag: "User",
  summary: "lalalla",
  description: "lelelel",
  pathVariables: {
    id: {
      type: "string",
      description: "Id of user",
      example: "3",
      required: true,
    },
  },
  body: {
    total: {
      type: "integer",
      description: "Total of actions",
      example: 12,
      required: true,
    },
    actions: {
      type: "array",
      description: "lol",
      required: true,
      items: {
        type: "object",
        description: "lol",
        required: true,
        properties: {
          sender: {
            type: "string",
            description: "lol",
            example: "me",
            required: true,
          },
          content: {
            type: "object",
            description: "lol",
            required: true,
            properties: {
              value: {
                type: "string",
                description: "lol",
                example: "lol",
                required: true,
              },
              mentions: {
                type: "array",
                description: "lol",
                required: true,
                items: {
                  type: "object",
                  description: "lol",
                  required: true,
                  properties: {
                    user: {
                      type: "string",
                      description: "lol",
                      required: true,
                      example: "example",
                    },
                    value: {
                      type: "string",
                      description: "lol",
                      required: true,
                      example: "example",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  responses: {
    204: {
      description: "Salut",
    },
  },
};

console.log(
  convertTsDocToYaml(convertCustomRouteToOpenAPIJsonFormat(validPutRoute))
);
