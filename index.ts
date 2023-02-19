import { Server } from '@hapi/hapi';
import { initRoutes } from './Despesas/Routes/despesas-routes';

export const init = (server: Server)=>{
    initRoutes(server);
}