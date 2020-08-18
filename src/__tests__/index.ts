import * as entityConverters from "../Entity/converters";
import { convertEntityToOpenApi, convertRouteToOpenApi } from "../index";
import * as routeConverters from "../Route/converters";

describe("convertRouteToOpenApi", () => {
  test("Should call convertRouteToOpenAPIJsonFormat once", () => {
    //@ts-ignore
    routeConverters.convertRouteToOpenAPIJsonFormat = jest
      .fn()
      .mockImplementation(() => 0);
    convertRouteToOpenApi({ simplified: true });
    expect(routeConverters.convertRouteToOpenAPIJsonFormat).toBeCalledTimes(1);
  });
  test("Should return the original object", () => {
    const result = convertRouteToOpenApi({ simplified: false });
    expect(result).toEqual({ simplified: false });
  });
});

describe("convertEntityToOpenApi", () => {
  test("Should call convertEntityToOpenApiFormat once", () => {
    //@ts-ignore
    entityConverters.convertEntityToOpenApiFormat = jest
      .fn()
      .mockImplementation(() => 0);
    convertEntityToOpenApi({ simplified: true });
    expect(entityConverters.convertEntityToOpenApiFormat).toBeCalledTimes(1);
  });
  test("Should return the original object", () => {
    const result = convertEntityToOpenApi({ simplified: false });
    expect(result).toEqual({ simplified: false });
  });
});
