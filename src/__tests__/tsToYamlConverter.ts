import { VariableObject } from "../CustomVariables/interfaces";
import * as validators from "../CustomVariables/validators";
import {
  PathVariables,
  QueryVariables,
  RequestBody,
  RequestResponses,
  Route,
} from "../Routes/interfaces";
import {
  convertCustomBodyToOpenAPIJsonFormat,
  convertCustomPathVariableToOpenAPIJsonFormat,
  convertCustomQueryVariableToOpenAPIJsonFormat,
  convertCustomResponseToOpenAPIJsonFormat,
  convertCustomRouteToOpenAPIJsonFormat,
  convertCustomVariableToSwaggerVariable,
} from "../tsToYamlConverter";

const doc: Route = {
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
  queryVariables: {
    start: {
      type: "integer",
      description: "Paging start",
      required: true,
      example: 20,
    },
  },
  body: {
    blacklist: {
      type: "boolean",
      description: "blacklisted",
      example: true,
      required: true,
    },
  },
  responses: {
    204: {
      description: "Salut",
    },
  },
};

describe("Test convertCustomVariableToSwaggerVariable", () => {
  const validVariable: VariableObject = {
    type: "object",
    description: "Specific id",
    properties: {
      salut: {
        type: "string",
        description: "hello",
        example: "hi",
        required: true,
      },
      mdr: {
        type: "string",
        description: "hello",
        example: "hi",
        required: false,
      },
    },
    required: true,
  };
  let copyVariable: VariableObject;
  beforeEach(() => (copyVariable = JSON.parse(JSON.stringify(validVariable))));
  test("Should return a valid SwaggerVariable", () => {
    const res = convertCustomVariableToSwaggerVariable(copyVariable);
    expect(res).toEqual({
      type: "object",
      description: copyVariable.description,
      properties: {
        salut: {
          type: "string",
          description: "hello",
          example: "hi",
        },
        mdr: {
          type: "string",
          description: "hello",
          example: "hi",
        },
      },
      required: ["salut"],
    });
  });
});

describe("Test convertCustomPathVariableToOpenAPIJsonFormat", () => {
  const validPathVariables: PathVariables = {
    id: {
      type: "string",
      description: "Specific id",
      example: "3",
      required: true,
    },
    name: {
      type: "string",
      description: "Specific id",
      example: "3",
      required: true,
    },
  };
  let copyPathVariables: PathVariables;
  beforeEach(
    () => (copyPathVariables = JSON.parse(JSON.stringify(validPathVariables)))
  );
  test("Should call validateVariable for each values", () => {
    const spy = jest.spyOn(validators, "validateVariable");
    const func = () =>
      convertCustomPathVariableToOpenAPIJsonFormat(copyPathVariables);
    expect(func).not.toThrow(Error);
    expect(spy).toHaveBeenCalledTimes(2);
  });
  test("Should return a valid array of SwaggerJsonRouteParametersPath", () => {
    const result = convertCustomPathVariableToOpenAPIJsonFormat(
      copyPathVariables
    );
    expect(result).toEqual(
      Object.entries(copyPathVariables).map(
        ([name, { description, type, required }]) => ({
          in: "path",
          name,
          description: description,
          schema: { type: type },
          required: required,
        })
      )
    );
  });
});

describe("Test convertCustomQueryVariableToOpenAPIJsonFormat", () => {
  const validQueryVariables: QueryVariables = {
    start: {
      type: "integer",
      description: "Start of paging",
      required: true,
      example: 0,
    },
    count: {
      type: "integer",
      description: "Count of paging",
      required: false,
      example: 20,
    },
  };
  let copyQueryVariables: QueryVariables;
  beforeEach(
    () => (copyQueryVariables = JSON.parse(JSON.stringify(validQueryVariables)))
  );
  test("Should call validateVariable for each values", () => {
    jest.resetAllMocks();
    const spy = jest.spyOn(validators, "validateVariable");
    const func = () =>
      convertCustomQueryVariableToOpenAPIJsonFormat(copyQueryVariables);
    expect(func).not.toThrow(Error);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test("Should return a valid array of SwaggerJsonRouteParametersQuery", () => {
    const result = convertCustomQueryVariableToOpenAPIJsonFormat(
      copyQueryVariables
    );
    expect(result).toEqual(
      Object.entries(copyQueryVariables).map(
        ([name, { description, type, required }]) => ({
          in: "query",
          name,
          description: description,
          schema: { type: type },
          required: required,
        })
      )
    );
  });
});

describe("Test convertCustomResponseToOpenAPIJsonFormat", () => {
  describe("Convert map of variables", () => {
    const validResponses: RequestResponses = {
      204: {
        description: "No content",
      },
      200: {
        description: "Success",
        response: {
          name: {
            type: "string",
            description: "Name",
            example: "John",
            required: true,
          },
        },
      },
    };
    let copyResponses: RequestResponses;
    beforeEach(
      () => (copyResponses = JSON.parse(JSON.stringify(validResponses)))
    );
    test("Should call validateVariable for each responses", () => {
      jest.resetAllMocks();
      const spy = jest.spyOn(validators, "validateVariable");
      const func = () =>
        convertCustomResponseToOpenAPIJsonFormat(copyResponses);
      expect(func).not.toThrow(Error);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Convert oneOf", () => {
    const validResponses: RequestResponses = {
      201: {
        description: "Success",
        response: {
          type: "oneOf",
          subSchemas: [
            {
              name: {
                type: "string",
                description: "Name",
                example: "John",
                required: true,
              },
            },
            {
              total: {
                type: "string",
                description: "Name",
                example: "John",
                required: true,
              },
            },
          ],
        },
      },
    };
    let copyResponses: RequestResponses;
    beforeEach(
      () => (copyResponses = JSON.parse(JSON.stringify(validResponses)))
    );
    test("Should call validateVariable for each values", () => {
      jest.resetAllMocks();
      const spy = jest.spyOn(validators, "validateVariable");
      const func = () =>
        convertCustomResponseToOpenAPIJsonFormat(copyResponses);
      expect(func).not.toThrow(Error);
      expect(spy).toHaveBeenCalledTimes(2);
    });

    test("Should return a valid SwaggerJsonRouteRequestBody", () => {
      const res = convertCustomResponseToOpenAPIJsonFormat(copyResponses);
      expect(res).toEqual({
        201: {
          description: "Success",
          oneOf: [
            {
              type: "object",
              description: "root",
              required: ["name"],
              properties: {
                name: {
                  type: "string",
                  description: "Name",
                  example: "John",
                },
              },
            },
            {
              type: "object",
              description: "root",
              required: ["total"],
              properties: {
                total: {
                  type: "string",
                  description: "Name",
                  example: "John",
                },
              },
            },
          ],
        },
      });
    });
  });

  describe("Convert anyOf", () => {
    const validResponses: RequestResponses = {
      201: {
        description: "Success",
        response: {
          type: "anyOf",
          subSchemas: [
            {
              name: {
                type: "string",
                description: "Name",
                example: "John",
                required: true,
              },
            },
            {
              total: {
                type: "string",
                description: "Name",
                example: "John",
                required: true,
              },
            },
          ],
        },
      },
    };
    let copyResponses: RequestResponses;
    beforeEach(
      () => (copyResponses = JSON.parse(JSON.stringify(validResponses)))
    );
    test("Should call validateVariable for each values", () => {
      jest.resetAllMocks();
      const spy = jest.spyOn(validators, "validateVariable");
      const func = () =>
        convertCustomResponseToOpenAPIJsonFormat(copyResponses);
      expect(func).not.toThrow(Error);
      expect(spy).toHaveBeenCalledTimes(2);
    });

    test("Should return a valid SwaggerJsonRouteRequestBody", () => {
      const res = convertCustomResponseToOpenAPIJsonFormat(copyResponses);
      expect(res).toEqual({
        201: {
          description: "Success",
          anyOf: [
            {
              type: "object",
              description: "root",
              required: ["name"],
              properties: {
                name: {
                  type: "string",
                  description: "Name",
                  example: "John",
                },
              },
            },
            {
              type: "object",
              description: "root",
              required: ["total"],
              properties: {
                total: {
                  type: "string",
                  description: "Name",
                  example: "John",
                },
              },
            },
          ],
        },
      });
    });
  });
  describe("Convert allOf", () => {
    const validResponses: RequestResponses = {
      201: {
        description: "Success",
        response: {
          type: "allOf",
          subSchemas: [
            {
              name: {
                type: "string",
                description: "Name",
                example: "John",
                required: true,
              },
            },
            {
              total: {
                type: "string",
                description: "Name",
                example: "John",
                required: true,
              },
            },
            {
              total: {
                type: "ref",
                description: "Name",
                ref: "John",
                required: true,
              },
            },
            {
              type: "ref",
              description: "Name",
              ref: "John",
              required: true,
            },
          ],
        },
      },
    };
    let copyResponses: RequestResponses;
    beforeEach(
      () => (copyResponses = JSON.parse(JSON.stringify(validResponses)))
    );
    test("Should call validateVariable for each values", () => {
      jest.resetAllMocks();
      const spy = jest.spyOn(validators, "validateVariable");
      const func = () =>
        convertCustomResponseToOpenAPIJsonFormat(copyResponses);
      expect(func).not.toThrow(Error);
      expect(spy).toHaveBeenCalledTimes(4);
    });

    test("Should return a valid SwaggerJsonRouteRequestBody", () => {
      const res = convertCustomResponseToOpenAPIJsonFormat(copyResponses);
      expect(res).toEqual({
        201: {
          description: "Success",
          allOf: [
            {
              type: "object",
              description: "root",
              required: ["name"],
              properties: {
                name: {
                  type: "string",
                  description: "Name",
                  example: "John",
                },
              },
            },
            {
              type: "object",
              description: "root",
              required: ["total"],
              properties: {
                total: {
                  type: "string",
                  description: "Name",
                  example: "John",
                },
              },
            },
            {
              type: "object",
              description: "root",
              required: ["total"],
              properties: {
                total: {
                  $ref: "John",
                },
              },
            },
            {
              $ref: "John",
            },
          ],
        },
      });
    });
  });
});

describe("Test convertCustomBodyToOpenAPIJsonFormat", () => {
  describe("Convert map of variables", () => {
    const validBody: RequestBody = {
      blacklist: {
        type: "boolean",
        description: "Is blacklisted",
        example: true,
        required: true,
      },
      total: {
        type: "integer",
        description: "Total of blacklist",
        example: 2,
        required: true,
      },
    };
    let copyBody: RequestBody;
    beforeEach(() => (copyBody = JSON.parse(JSON.stringify(validBody))));
    test("Should call validateVariable for each values", () => {
      jest.resetAllMocks();
      const spy = jest.spyOn(validators, "validateVariable");
      const func = () => convertCustomBodyToOpenAPIJsonFormat(copyBody);
      expect(func).not.toThrow(Error);
      expect(spy).toHaveBeenCalledTimes(2);
    });

    test("Should return a valid SwaggerJsonRouteRequestBody", () => {
      const res = convertCustomBodyToOpenAPIJsonFormat(copyBody);
      expect(res).toEqual({
        content: {
          "application/json": {
            schema: {
              type: "object",
              description: "root",
              properties: {
                blacklist: {
                  type: "boolean",
                  description: "Is blacklisted",
                  example: true,
                },
                total: {
                  type: "integer",
                  description: "Total of blacklist",
                  example: 2,
                },
              },
              required: ["blacklist", "total"],
            },
          },
        },
      });
    });
  });

  describe("Convert oneOf", () => {
    const validBody: RequestBody = {
      type: "oneOf",
      subSchemas: [
        {
          blacklist: {
            type: "boolean",
            description: "Is blacklisted",
            example: true,
            required: true,
          },
          total: {
            type: "integer",
            description: "Total of blacklist",
            example: 2,
            required: false,
          },
        },
        {
          total: {
            type: "integer",
            description: "Total of blacklist",
            example: 2,
            required: true,
          },
        },
      ],
    };
    let copyBody: RequestBody;
    beforeEach(() => (copyBody = JSON.parse(JSON.stringify(validBody))));
    test("Should call validateVariable for each values", () => {
      jest.resetAllMocks();
      const spy = jest.spyOn(validators, "validateVariable");
      const func = () => convertCustomBodyToOpenAPIJsonFormat(copyBody);
      expect(func).not.toThrow(Error);
      expect(spy).toHaveBeenCalledTimes(3);
    });

    test("Should return a valid SwaggerJsonRouteRequestBody", () => {
      const res = convertCustomBodyToOpenAPIJsonFormat(copyBody);
      expect(res).toEqual({
        content: {
          "application/json": {
            schema: {
              oneOf: [
                {
                  type: "object",
                  description: "root",
                  required: ["blacklist"],
                  properties: {
                    blacklist: {
                      type: "boolean",
                      description: "Is blacklisted",
                      example: true,
                    },
                    total: {
                      type: "integer",
                      description: "Total of blacklist",
                      example: 2,
                    },
                  },
                },
                {
                  type: "object",
                  description: "root",
                  required: ["total"],
                  properties: {
                    total: {
                      type: "integer",
                      description: "Total of blacklist",
                      example: 2,
                    },
                  },
                },
              ],
            },
          },
        },
      });
    });
  });
  describe("Convert allOf", () => {
    const validBody: RequestBody = {
      type: "allOf",
      subSchemas: [
        {
          blacklist: {
            type: "boolean",
            description: "Is blacklisted",
            example: true,
            required: false,
          },
          total: {
            type: "integer",
            description: "Total of blacklist",
            example: 2,
            required: true,
          },
        },
        {
          total: {
            type: "integer",
            description: "Total of blacklist",
            example: 2,
            required: true,
          },
        },
      ],
    };
    let copyBody: RequestBody;
    beforeEach(() => (copyBody = JSON.parse(JSON.stringify(validBody))));
    test("Should call validateVariable for each values", () => {
      jest.resetAllMocks();
      const spy = jest.spyOn(validators, "validateVariable");
      const func = () => convertCustomBodyToOpenAPIJsonFormat(copyBody);
      expect(func).not.toThrow(Error);
      expect(spy).toHaveBeenCalledTimes(3);
    });

    test("Should return a valid SwaggerJsonRouteRequestBody", () => {
      const res = convertCustomBodyToOpenAPIJsonFormat(copyBody);
      expect(res).toEqual({
        content: {
          "application/json": {
            schema: {
              allOf: [
                {
                  type: "object",
                  description: "root",
                  required: ["total"],
                  properties: {
                    blacklist: {
                      type: "boolean",
                      description: "Is blacklisted",
                      example: true,
                    },
                    total: {
                      type: "integer",
                      description: "Total of blacklist",
                      example: 2,
                    },
                  },
                },
                {
                  type: "object",
                  description: "root",
                  required: ["total"],
                  properties: {
                    total: {
                      type: "integer",
                      description: "Total of blacklist",
                      example: 2,
                    },
                  },
                },
              ],
            },
          },
        },
      });
    });
  });

  describe("Convert anyOf", () => {
    const validBody: RequestBody = {
      type: "anyOf",
      subSchemas: [
        {
          blacklist: {
            type: "boolean",
            description: "Is blacklisted",
            example: true,
            required: true,
          },
          total: {
            type: "integer",
            description: "Total of blacklist",
            example: 2,
            required: true,
          },
        },
        {
          total: {
            type: "integer",
            description: "Total of blacklist",
            example: 2,
            required: true,
          },
        },
        {
          lol: {
            type: "ref",
            ref: "User",
            description: "slol",
            required: true,
          },
        },
        {
          type: "ref",
          ref: "User",
          description: "slol",
          required: true,
        },
      ],
    };
    let copyBody: RequestBody;
    beforeEach(() => (copyBody = JSON.parse(JSON.stringify(validBody))));
    test("Should call validateVariable for each values", () => {
      jest.resetAllMocks();
      const spy = jest.spyOn(validators, "validateVariable");
      const func = () => convertCustomBodyToOpenAPIJsonFormat(copyBody);
      expect(func).not.toThrow(Error);
      expect(spy).toHaveBeenCalledTimes(5);
    });

    test("Should return a valid SwaggerJsonRouteRequestBody", () => {
      const res = convertCustomBodyToOpenAPIJsonFormat(copyBody);
      expect(res).toEqual({
        content: {
          "application/json": {
            schema: {
              anyOf: [
                {
                  type: "object",
                  description: "root",
                  required: ["blacklist", "total"],
                  properties: {
                    blacklist: {
                      type: "boolean",
                      description: "Is blacklisted",
                      example: true,
                    },
                    total: {
                      type: "integer",
                      description: "Total of blacklist",
                      example: 2,
                    },
                  },
                },
                {
                  type: "object",
                  description: "root",
                  required: ["total"],
                  properties: {
                    total: {
                      type: "integer",
                      description: "Total of blacklist",
                      example: 2,
                    },
                  },
                },
                {
                  type: "object",
                  description: "root",
                  required: ["lol"],
                  properties: {
                    lol: {
                      $ref: "User",
                    },
                  },
                },
                {
                  $ref: "User",
                },
              ],
            },
          },
        },
      });
    });
  });
});

describe("Test convertCustomRouteToOpenAPIJsonFormat", () => {
  let routeCopy: Route;
  beforeEach(() => (routeCopy = JSON.parse(JSON.stringify(doc))));

  test("Path should be the top level key", () => {
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(Object.keys(converted)[0]).toEqual(routeCopy.path);
  });
  test("Method should be the first key after the path key", () => {
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(Object.keys(converted[routeCopy.path])[0]).toEqual(routeCopy.method);
  });
  test("Tags should be the first key after the method key and contain one element", () => {
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(Object.keys(converted[routeCopy.path][routeCopy.method])[0]).toEqual(
      "tags"
    );
    expect(converted[routeCopy.path][routeCopy.method]["tags"]).toHaveLength(1);
    expect(converted[routeCopy.path][routeCopy.method]["tags"][0]).toBe(
      routeCopy.tag
    );
  });
  test("Summary should be referenced at the same level as tags", () => {
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(
      Object.keys(converted[routeCopy.path][routeCopy.method]).includes(
        "summary"
      )
    ).toBe(true);
  });
  test("Description should be referenced at the same level as tags", () => {
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(
      Object.keys(converted[routeCopy.path][routeCopy.method]).includes(
        "description"
      )
    ).toBe(true);
  });
  test("Consumes key should be referenced at the same level as tags and have an array containing 'application/json'", () => {
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(
      Object.keys(converted[routeCopy.path][routeCopy.method]).includes(
        "consumes"
      )
    ).toBe(true);
    expect(
      converted[routeCopy.path][routeCopy.method]["consumes"]
    ).toHaveLength(1);
    expect(converted[routeCopy.path][routeCopy.method]["consumes"][0]).toBe(
      "application/json"
    );
  });

  test("Parameters key should be referenced at the same level as tags and have an array containing object representing path variable and query", () => {
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(
      Object.keys(converted[routeCopy.path][routeCopy.method]).includes(
        "parameters"
      )
    ).toBe(true);
    expect(
      converted[routeCopy.path][routeCopy.method]["parameters"]
    ).toBeInstanceOf(Array);
  });
  test("Parameters shouldn't be referenced if there is neither path variables or query", () => {
    delete routeCopy.pathVariables;
    delete routeCopy.queryVariables;
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(
      Object.keys(converted[routeCopy.path][routeCopy.method]).includes(
        "parameters"
      )
    ).toBe(false);
  });
  test("Parameters should contain all path variables in path", () => {
    delete routeCopy.queryVariables;
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(
      Object.keys(converted[routeCopy.path][routeCopy.method]).includes(
        "parameters"
      )
    ).toBe(true);
    expect(
      Object.keys(converted[routeCopy.path][routeCopy.method].parameters)
    ).toHaveLength(1);
    const param = converted[routeCopy.path][routeCopy.method]["parameters"][0];
    expect(param).toEqual({
      in: "path",
      name: "id",
      description: routeCopy.pathVariables.id.description,
      schema: {
        type: routeCopy.pathVariables.id.type,
      },
      required: true,
    });
  });
  test("Parameters should contain all query variables in query", () => {
    delete routeCopy.pathVariables;
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(
      Object.keys(converted[routeCopy.path][routeCopy.method]).includes(
        "parameters"
      )
    ).toBe(true);
    expect(
      Object.keys(converted[routeCopy.path][routeCopy.method].parameters)
    ).toHaveLength(1);
    const param = converted[routeCopy.path][routeCopy.method]["parameters"][0];
    expect(param).toEqual({
      in: "query",
      name: "start",
      description: routeCopy.queryVariables.start.description,
      schema: {
        type: routeCopy.queryVariables.start.type,
      },
      required: routeCopy.queryVariables.start.required,
    });
  });
  test("Request body optional key should be referenced at the same level as tags and have an object representing the body", () => {
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(
      Object.keys(converted[routeCopy.path][routeCopy.method]).includes(
        "requestBody"
      )
    ).toBe(true);
    //@ts-ignore
    delete routeCopy.body;
    const converted2 = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(
      Object.keys(converted2[routeCopy.path][routeCopy.method]).includes(
        "requestBody"
      )
    ).toBe(false);
  });

  test("Responses key should be referenced at the same level as tags and have an object representing the possible responses", () => {
    const converted = convertCustomRouteToOpenAPIJsonFormat(routeCopy);
    expect(
      Object.keys(converted[routeCopy.path][routeCopy.method]).includes(
        "responses"
      )
    ).toBe(true);
  });
});
