import { setupServer } from "msw/node";
import { handlers } from "./todos";
export const server = setupServer(...handlers);