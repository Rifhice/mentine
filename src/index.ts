import { Route } from "./interfaces";
const YAML = require("json2yaml");

export const convertCustomRouteToOpenAPIJsonFormat = (doc: Route) => {
  const { path, method, tag, summary, description } = doc;
  return {
    [path]: {
      [method]: {
        tags: [tag],
        summary,
        description,
        consumes: ["application/json"],
      },
    },
  };
};

export const convertTsDocToYaml = (doc: Route) => {};

// const doc: Route = {
//   path: "/api/user/:id/blacklist",
//   method: "PUT",
//   tag: "User",
//   summary: "lalalla",
//   description: "lelelel",
//   pathVariables: {
//     id: {
//       type: "string",
//       description: "Id of user",
//     },
//   },
//   body: {
//     total: {
//       type: "integer",
//       description: "Total of actions",
//       example: 12,
//       required: true,
//     },
//     actions: {
//       type: "array",
//       description: "",
//       required: true,
//       items: {
//         type: "object",
//         description: "",
//         required: true,
//         properties: {
//           sender: {
//             type: "string",
//             description: "",
//             example: "me",
//             required: true,
//           },
//           content: {
//             type: "object",
//             description: "",
//             required: true,
//             properties: {
//               value: {
//                 type: "string",
//                 description: "",
//                 example: "lol",
//                 required: true,
//               },
//               mentions: {
//                 type: "array",
//                 description: "",
//                 required: true,
//                 items: {
//                   type: "object",
//                   description: "",
//                   required: true,
//                   properties: {
//                     user: {
//                       type: "string",
//                       description: "",
//                       required: true,
//                       example: "",
//                     },
//                     value: {
//                       type: "string",
//                       description: "",
//                       required: true,
//                       example: "",
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   },
//   responses: {
//     204: {
//       description: "Salut",
//     },
//   },
// };
