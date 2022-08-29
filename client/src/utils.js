import _ from "lodash";

// combine query params; to be used for data caching
export function combineQueries(obj = {}) {
  obj = _.pick(obj, ["perPage", "page", "company"]);
  const keys = Object.keys(obj);
  const values = keys.map((key) => obj[key]);
  return values.join("-");
}
