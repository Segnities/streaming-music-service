import { setupServer } from "msw/node";

import { discoverHandler, topChartsHandler } from "./handlers";

const discoverServer = setupServer(...discoverHandler);
const topChartsServer = setupServer(...topChartsHandler);

export {discoverServer, topChartsServer }