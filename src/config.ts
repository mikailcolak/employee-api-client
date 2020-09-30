import { env } from "process";

function ensureTrailingSlash(target: string) {
  if (target.endsWith("/")) return target;
  return `${target}/`;
}

export default {
  apiEndpoint: ensureTrailingSlash(env.PUBLIC_URL || "http://localhost:8080/")
}
