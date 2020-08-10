export const isAnObject = (value: any) =>
  typeof value === "object" && value !== null && !Array.isArray(value);
