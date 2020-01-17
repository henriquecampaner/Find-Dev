import http from 'http';
import app from './app';

import { setupWebsocket } from './websocket';

const server = http.Server(app);
// to extract http server

setupWebsocket(server);

server.listen(3333);
