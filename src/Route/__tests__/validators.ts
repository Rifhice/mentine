import {
  BaseRoute,
  DeleteRoute,
  GetRoute,
  PostRoute,
  PutRoute,
  RequestResponse,
} from "../interfaces";
import {
  validateBaseRouteObject,
  validatePostRoute,
  validatePutRoute,
  validateRequestResponse,
  validateRoute,
} from "../validators";

describe("Validate route object", () => {
  const validGetRoute: GetRoute = {
    simplified: true,
    path: "/api/user/:id/blacklist",
    method: "get",
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
    responses: {
      204: {
        description: "Salut",
      },
    },
  };
  const validPutRoute: PutRoute = {
    simplified: true,
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
  const validPostRoute: PostRoute = {
    simplified: true,
    path: "/api/user/:id/blacklist",
    method: "post",
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
  const validDeleteRoute: DeleteRoute = {
    simplified: true,
    path: "/api/user/:id/blacklist",
    method: "delete",
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
    responses: {
      204: {
        description: "Salut",
      },
    },
  };

  describe("Test validateRequestResponse", () => {
    const validRequestResponse: RequestResponse = {
      description: "salut",
      response: {
        name: {
          type: "string",
          description: "d",
          example: "salut",
          required: true,
        },
      },
    };

    let copyRequestResponse: RequestResponse;

    beforeEach(
      () =>
        (copyRequestResponse = JSON.parse(JSON.stringify(validRequestResponse)))
    );
    test("Description is a required string", () => {
      const func = () => validateRequestResponse(copyRequestResponse);
      delete copyRequestResponse.description;
      expect(func).toThrowError(Error);
      copyRequestResponse.description = "salut";
      expect(func).not.toThrowError(Error);
      //@ts-ignore
      copyRequestResponse.description = 3;
      expect(func).toThrowError(Error);
      //@ts-ignore
      copyRequestResponse.description = [];
      expect(func).toThrowError(Error);
      //@ts-ignore
      copyRequestResponse.description = {};
      expect(func).toThrowError(Error);
    });
    test("Response is an optionnal variable", () => {
      const func = () => validateRequestResponse(copyRequestResponse);
      delete copyRequestResponse.response;
      expect(func).not.toThrowError(Error);
    });

    test("Response is a valid map of variable", () => {
      const func = () => validateRequestResponse(copyRequestResponse);
      delete copyRequestResponse.response;
      expect(func).not.toThrowError(Error);

      //@ts-ignore
      copyRequestResponse.response = "salut";
      expect(func).toThrowError(Error);
      //@ts-ignore
      copyRequestResponse.response = 3;
      expect(func).toThrowError(Error);
      //@ts-ignore
      copyRequestResponse.response = [];
      expect(func).toThrowError(Error);

      copyRequestResponse.response = {};
      expect(func).not.toThrowError(Error);

      copyRequestResponse.response = {
        //@ts-ignore
        name: {
          type: "string",
          description: "lol",
          example: "mdr",
        },
      };
      expect(func).toThrowError(Error);

      copyRequestResponse.response = {
        name: {
          type: "string",
          description: "lol",
          example: "mdr",
          required: true,
        },
      };
      expect(func).not.toThrowError(Error);
    });

    test("Response is a valid oneOf", () => {
      const func = () => validateRequestResponse(copyRequestResponse);

      copyRequestResponse.response = {
        type: "oneOf",
        subSchemas: [],
        discriminator: "lol",
      };
      expect(func).not.toThrowError(Error);

      copyRequestResponse.response = {
        type: "oneOf",
        subSchemas: [
          {
            name: {
              type: "string",
              description: "delo",
              example: "salut",
              required: true,
            },
          },
        ],
        discriminator: "lol",
      };
      expect(func).not.toThrowError(Error);

      copyRequestResponse.response = {
        type: "oneOf",
        subSchemas: [],
      };
      expect(func).not.toThrowError(Error);

      //@ts-ignore
      copyRequestResponse.response = {
        type: "oneOf",
        discriminator: "lol",
      };
      expect(func).toThrowError(Error);

      //@ts-ignore
      copyRequestResponse.response = {
        type: "oneOf",
        subSchemas: [
          //@ts-ignore
          {
            //@ts-ignore
            type: "string",
            //@ts-ignore
            description: "delo",
          },
        ],
        discriminator: "lol",
      };
      expect(func).toThrowError(Error);
    });
    test("Response is a valid allOf", () => {
      const func = () => validateRequestResponse(copyRequestResponse);

      copyRequestResponse.response = {
        type: "allOf",
        subSchemas: [],
      };
      expect(func).not.toThrowError(Error);

      copyRequestResponse.response = {
        type: "allOf",
        subSchemas: [
          {
            name: {
              type: "string",
              description: "delo",
              example: "salut",
              required: true,
            },
          },
        ],
      };
      expect(func).not.toThrowError(Error);

      copyRequestResponse.response = {
        type: "allOf",
        subSchemas: [],
      };
      expect(func).not.toThrowError(Error);

      //@ts-ignore
      copyRequestResponse.response = {
        type: "allOf",
        subSchemas: [
          //@ts-ignore
          {
            //@ts-ignore
            type: "string",
            //@ts-ignore
            description: "delo",
          },
        ],
        discriminator: "lol",
      };
      expect(func).toThrowError(Error);
    });
    test("Response is a valid anyOf", () => {
      const func = () => validateRequestResponse(copyRequestResponse);

      copyRequestResponse.response = {
        type: "anyOf",
        subSchemas: [],
      };
      expect(func).not.toThrowError(Error);

      copyRequestResponse.response = {
        type: "anyOf",
        subSchemas: [
          {
            name: {
              type: "string",
              description: "delo",
              example: "salut",
              required: true,
            },
          },
        ],
      };
      expect(func).not.toThrowError(Error);

      copyRequestResponse.response = {
        type: "anyOf",
        subSchemas: [],
      };
      expect(func).not.toThrowError(Error);

      //@ts-ignore
      copyRequestResponse.response = {
        type: "anyOf",
      };
      expect(func).toThrowError(Error);

      //@ts-ignore
      copyRequestResponse.response = {
        type: "anyOf",
        subSchemas: [
          //@ts-ignore
          {
            //@ts-ignore
            type: "string",
            //@ts-ignore
            description: "delo",
          },
        ],
        discriminator: "lol",
      };
      expect(func).toThrowError(Error);
    });
  });

  describe("Test validateBaseRouteObject", () => {
    const doc: BaseRoute = {
      simplified: true,
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
      responses: {
        204: {
          description: "Salut",
        },
      },
    };

    let routeCopy: BaseRoute;

    beforeEach(() => (routeCopy = JSON.parse(JSON.stringify(doc))));

    test("Path is a required string", () => {
      const func = () => validateBaseRouteObject(routeCopy);
      delete routeCopy.path;
      expect(func).toThrowError(Error);
      routeCopy.path = "salut";
      expect(func).not.toThrowError(Error);
      //@ts-ignore
      routeCopy.path = 3;
      expect(func).toThrowError(Error);
      //@ts-ignore
      routeCopy.path = [];
      expect(func).toThrowError(Error);
      //@ts-ignore
      routeCopy.path = {};
      expect(func).toThrowError(Error);
    });
    test("Method is required", () => {
      delete routeCopy.method;
      const func = () => validateBaseRouteObject(routeCopy);
      expect(func).toThrowError(Error);
    });
    test("Method can be get | POST | PUT | DELETE", () => {
      const func = () => validateBaseRouteObject(routeCopy);

      routeCopy.method = "post";
      expect(func).not.toThrowError(Error);

      routeCopy.method = "get";
      expect(func).not.toThrowError(Error);

      routeCopy.method = "put";
      expect(func).not.toThrowError(Error);

      routeCopy.method = "post";
      expect(func).not.toThrowError(Error);

      //@ts-ignore
      routeCopy.method = "ANYTHING";
      expect(func).toThrowError(Error);

      delete routeCopy.method;
      expect(func).toThrowError(Error);
    });
    test("Tag is a required string", () => {
      const func = () => validateBaseRouteObject(routeCopy);
      delete routeCopy.tag;
      expect(func).toThrowError(Error);
      routeCopy.tag = "salut";
      expect(func).not.toThrowError(Error);
      //@ts-ignore
      routeCopy.tag = 3;
      expect(func).toThrowError(Error);
      //@ts-ignore
      routeCopy.tag = [];
      expect(func).toThrowError(Error);
      //@ts-ignore
      routeCopy.tag = {};
      expect(func).toThrowError(Error);
    });
    test("Summary is a required string", () => {
      const func = () => validateBaseRouteObject(routeCopy);
      delete routeCopy.summary;
      expect(func).toThrowError(Error);
      routeCopy.summary = "salut";
      expect(func).not.toThrowError(Error);
      //@ts-ignore
      routeCopy.summary = 3;
      expect(func).toThrowError(Error);
      //@ts-ignore
      routeCopy.summary = [];
      expect(func).toThrowError(Error);
      //@ts-ignore
      routeCopy.summary = {};
      expect(func).toThrowError(Error);
    });
    test("Description is required", () => {
      const func = () => validateBaseRouteObject(routeCopy);
      delete routeCopy.description;
      expect(func).toThrowError(Error);
      routeCopy.description = "salut";
      expect(func).not.toThrowError(Error);
      //@ts-ignore
      routeCopy.description = 3;
      expect(func).toThrowError(Error);
      //@ts-ignore
      routeCopy.description = [];
      expect(func).toThrowError(Error);
      //@ts-ignore
      routeCopy.description = {};
      expect(func).toThrowError(Error);
    });
    test("PathVariable is optional", () => {
      delete routeCopy.pathVariables;
      const func = () => validateBaseRouteObject(routeCopy);
      expect(func).not.toThrowError(Error);
    });
    test("PathVariable should be an object", () => {
      const func = () => validateBaseRouteObject(routeCopy);
      //@ts-ignore
      routeCopy.pathVariables = "";
      expect(func).toThrowError(Error);
      //@ts-ignore
      routeCopy.pathVariables = 3;
      expect(func).toThrowError(Error);
      //@ts-ignore
      routeCopy.pathVariables = [];
      expect(func).toThrowError(Error);
    });
    test("QueryVariable is optional", () => {
      delete routeCopy.queryVariables;
      const func = () => validateBaseRouteObject(routeCopy);
      expect(func).not.toThrowError(Error);
    });
    test("QueryVariable should be an object", () => {
      const func = () => validateBaseRouteObject(routeCopy);
      //@ts-ignore
      routeCopy.queryVariables = "";
      expect(func).toThrowError(Error);
      //@ts-ignore
      routeCopy.queryVariables = 3;
      expect(func).toThrowError(Error);
      //@ts-ignore
      routeCopy.queryVariables = [];
      expect(func).toThrowError(Error);
    });
    test("Reponses is required", () => {
      delete routeCopy.responses;
      const func = () => validateBaseRouteObject(routeCopy);
      expect(func).toThrowError(Error);
    });

    test("Responses should be an object", () => {
      const func = () => validateBaseRouteObject(routeCopy);
      //@ts-ignore
      routeCopy.responses = "saklut";
      expect(func).toThrowError(Error);
      //@ts-ignore
      routeCopy.responses = [];
      expect(func).toThrowError(Error);
      //@ts-ignore
      routeCopy.responses = 3;
      expect(func).toThrowError(Error);
    });
    test("Responses key should be valid http code", () => {
      const func = () => validateBaseRouteObject(routeCopy);

      routeCopy.responses = {
        200: {
          description: "salut",
        },
      };
      expect(func).not.toThrowError(Error);

      routeCopy.responses = {
        "200": {
          description: "salut",
        },
      };
      expect(func).not.toThrowError(Error);

      routeCopy.responses = {
        //@ts-ignore
        salut: {
          description: "",
        },
      };
      expect(func).toThrowError(Error);
    });
    test("Responses values should be valid request responses", () => {
      const func = () => validateBaseRouteObject(routeCopy);

      routeCopy.responses = {
        200: {
          description: "",
        },
      };
      expect(func).toThrowError(Error);

      routeCopy.responses = {
        200: {
          description: "salut",
        },
      };
      expect(func).not.toThrowError(Error);

      routeCopy.responses = {
        200: {
          description: "",
          //@ts-ignore
          response: {},
        },
      };
      expect(func).toThrowError(Error);

      routeCopy.responses = {
        200: {
          description: "",
          //@ts-ignore
          response: "",
        },
      };
      expect(func).toThrowError(Error);

      routeCopy.responses = {
        200: {
          description: "",
          //@ts-ignore
          response: 3,
        },
      };
      expect(func).toThrowError(Error);

      routeCopy.responses = {
        200: {
          description: "",
          //@ts-ignore
          response: null,
        },
      };
      expect(func).toThrowError(Error);

      routeCopy.responses = {
        200: {
          description: "",
          response: {
            name: {
              type: "string",
              description: "lol",
              example: "mdr",
              required: true,
            },
          },
        },
      };
      expect(func).toThrowError(Error);
    });
  });

  describe.skip("validate DELETE route", () => {});
  describe.skip("validate GET route", () => {});

  describe("validate POST route", () => {
    let copyPostRoute: PostRoute;

    beforeEach(
      () => (copyPostRoute = JSON.parse(JSON.stringify(validPostRoute)))
    );

    test("Body is an optional valid map of variables", () => {
      const func = () => validatePostRoute(copyPostRoute);
      delete copyPostRoute.body;

      //@ts-ignore
      copyPostRoute.body = "salut";
      expect(func).toThrowError(Error);
      //@ts-ignore
      copyPostRoute.body = 3;
      expect(func).toThrowError(Error);
      //@ts-ignore
      copyPostRoute.body = [];
      expect(func).toThrowError(Error);

      copyPostRoute.body = {};
      expect(func).not.toThrowError(Error);

      copyPostRoute.body = {
        //@ts-ignore
        name: {
          type: "string",
          description: "lol",
          example: "mdr",
        },
      };
      expect(func).toThrowError(Error);

      copyPostRoute.body = {
        name: {
          type: "string",
          description: "lol",
          example: "mdr",
          required: true,
        },
      };
      expect(func).not.toThrowError(Error);

      expect(func).not.toThrowError(Error);
    });

    test("Body is a valid oneOf", () => {
      const func = () => validatePostRoute(copyPostRoute);

      copyPostRoute.body = {
        type: "oneOf",
        subSchemas: [],
        discriminator: "lol",
      };
      expect(func).not.toThrowError(Error);

      copyPostRoute.body = {
        type: "oneOf",
        subSchemas: [
          {
            name: {
              type: "string",
              description: "delo",
              example: "salut",
              required: true,
            },
          },
        ],
        discriminator: "lol",
      };
      expect(func).not.toThrowError(Error);

      copyPostRoute.body = {
        type: "oneOf",
        subSchemas: [],
      };
      expect(func).not.toThrowError(Error);

      //@ts-ignore
      copyPostRoute.body = {
        type: "oneOf",
        discriminator: "lol",
      };
      expect(func).toThrowError(Error);

      //@ts-ignore
      copyPostRoute.body = {
        type: "oneOf",
        subSchemas: [
          //@ts-ignore
          {
            //@ts-ignore
            type: "string",
            //@ts-ignore
            description: "delo",
          },
        ],
        discriminator: "lol",
      };
      expect(func).toThrowError(Error);
    });
    test("Body is a valid allOf", () => {
      const func = () => validatePostRoute(copyPostRoute);

      copyPostRoute.body = {
        type: "allOf",
        subSchemas: [],
      };
      expect(func).not.toThrowError(Error);

      copyPostRoute.body = {
        type: "allOf",
        subSchemas: [
          {
            name: {
              type: "string",
              description: "delo",
              example: "salut",
              required: true,
            },
          },
        ],
      };
      expect(func).not.toThrowError(Error);

      copyPostRoute.body = {
        type: "allOf",
        subSchemas: [],
      };
      expect(func).not.toThrowError(Error);

      //@ts-ignore
      copyPostRoute.body = {
        type: "allOf",
        subSchemas: [
          //@ts-ignore
          {
            //@ts-ignore
            type: "string",
            //@ts-ignore
            description: "delo",
          },
        ],
        discriminator: "lol",
      };
      expect(func).toThrowError(Error);
    });
    test("Body is a valid anyOf", () => {
      const func = () => validatePostRoute(copyPostRoute);

      copyPostRoute.body = {
        type: "anyOf",
        subSchemas: [],
      };
      expect(func).not.toThrowError(Error);

      copyPostRoute.body = {
        type: "anyOf",
        subSchemas: [
          {
            name: {
              type: "string",
              description: "delo",
              example: "salut",
              required: true,
            },
          },
        ],
      };
      expect(func).not.toThrowError(Error);

      copyPostRoute.body = {
        type: "anyOf",
        subSchemas: [],
      };
      expect(func).not.toThrowError(Error);

      //@ts-ignore
      copyPostRoute.body = {
        type: "anyOf",
      };
      expect(func).toThrowError(Error);

      //@ts-ignore
      copyPostRoute.body = {
        type: "anyOf",
        subSchemas: [
          //@ts-ignore
          {
            //@ts-ignore
            type: "string",
            //@ts-ignore
            description: "delo",
          },
        ],
        discriminator: "lol",
      };
      expect(func).toThrowError(Error);
    });
  });

  describe("validate PUT route", () => {
    let copyPutRoute: PutRoute;

    beforeEach(
      () => (copyPutRoute = JSON.parse(JSON.stringify(validPutRoute)))
    );

    test("Body is an optional valid map of variables", () => {
      const func = () => validatePutRoute(copyPutRoute);
      delete copyPutRoute.body;

      //@ts-ignore
      copyPutRoute.body = "salut";
      expect(func).toThrowError(Error);
      //@ts-ignore
      copyPutRoute.body = 3;
      expect(func).toThrowError(Error);
      //@ts-ignore
      copyPutRoute.body = [];
      expect(func).toThrowError(Error);

      copyPutRoute.body = {};
      expect(func).not.toThrowError(Error);

      copyPutRoute.body = {
        //@ts-ignore
        name: {
          type: "string",
          description: "lol",
          example: "mdr",
        },
      };
      expect(func).toThrowError(Error);

      copyPutRoute.body = {
        name: {
          type: "string",
          description: "lol",
          example: "mdr",
          required: true,
        },
      };
      expect(func).not.toThrowError(Error);
    });

    test("Body is a valid oneOf", () => {
      const func = () => validatePutRoute(copyPutRoute);

      copyPutRoute.body = {
        type: "oneOf",
        subSchemas: [],
        discriminator: "lol",
      };
      expect(func).not.toThrowError(Error);

      copyPutRoute.body = {
        type: "oneOf",
        subSchemas: [
          {
            name: {
              type: "string",
              description: "delo",
              example: "salut",
              required: true,
            },
          },
        ],
        discriminator: "lol",
      };
      expect(func).not.toThrowError(Error);

      copyPutRoute.body = {
        type: "oneOf",
        subSchemas: [],
      };
      expect(func).not.toThrowError(Error);

      //@ts-ignore
      copyPutRoute.body = {
        type: "oneOf",
        discriminator: "lol",
      };
      expect(func).toThrowError(Error);

      //@ts-ignore
      copyPutRoute.body = {
        type: "oneOf",
        subSchemas: [
          //@ts-ignore
          {
            //@ts-ignore
            type: "string",
            //@ts-ignore
            description: "delo",
          },
        ],
        discriminator: "lol",
      };
      expect(func).toThrowError(Error);
    });
    test("Body is a valid allOf", () => {
      const func = () => validatePutRoute(copyPutRoute);

      copyPutRoute.body = {
        type: "allOf",
        subSchemas: [],
      };
      expect(func).not.toThrowError(Error);

      copyPutRoute.body = {
        type: "allOf",
        subSchemas: [
          {
            name: {
              type: "string",
              description: "delo",
              example: "salut",
              required: true,
            },
          },
        ],
      };
      expect(func).not.toThrowError(Error);

      copyPutRoute.body = {
        type: "allOf",
        subSchemas: [],
      };
      expect(func).not.toThrowError(Error);

      //@ts-ignore
      copyPutRoute.body = {
        type: "allOf",
        subSchemas: [
          //@ts-ignore
          {
            //@ts-ignore
            type: "string",
            //@ts-ignore
            description: "delo",
          },
        ],
        discriminator: "lol",
      };
      expect(func).toThrowError(Error);
    });
    test("Body is a valid anyOf", () => {
      const func = () => validatePutRoute(copyPutRoute);

      copyPutRoute.body = {
        type: "anyOf",
        subSchemas: [],
      };
      expect(func).not.toThrowError(Error);

      copyPutRoute.body = {
        type: "anyOf",
        subSchemas: [
          {
            name: {
              type: "string",
              description: "delo",
              example: "salut",
              required: true,
            },
          },
        ],
      };
      expect(func).not.toThrowError(Error);

      copyPutRoute.body = {
        type: "anyOf",
        subSchemas: [],
      };
      expect(func).not.toThrowError(Error);

      //@ts-ignore
      copyPutRoute.body = {
        type: "anyOf",
      };
      expect(func).toThrowError(Error);

      //@ts-ignore
      copyPutRoute.body = {
        type: "anyOf",
        subSchemas: [
          //@ts-ignore
          {
            //@ts-ignore
            type: "string",
            //@ts-ignore
            description: "delo",
          },
        ],
        discriminator: "lol",
      };
      expect(func).toThrowError(Error);
    });
  });

  test("Validate route", () => {
    expect(() => validateRoute(validGetRoute)).not.toThrowError(Error);
    expect(() => validateRoute(validPostRoute)).not.toThrowError(Error);
    expect(() => validateRoute(validPutRoute)).not.toThrowError(Error);
    expect(() => validateRoute(validDeleteRoute)).not.toThrowError(Error);
    //@ts-ignore
    expect(() => validateRoute({ method: "lol" })).toThrowError(Error);
    //@ts-ignore
    expect(() => validateRoute()).toThrowError(Error);
  });
});
