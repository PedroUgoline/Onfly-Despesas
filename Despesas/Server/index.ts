import * as Hapi from '@hapi/hapi';
import * as fs from 'fs';

export const initServer = async () =>{
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: process.env.BASE_URI || 'localhost',
        debug: {
            request: [
                'error'
            ]
        }
    });

    initApi(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);


    return server;
};

export const initApi = (server) => {
    fs.readdirSync('./src/api').forEach(folder => {
        const {init} = require('../api/'+folder);

        init(server);

        console.log(`Register routes of ${folder}`)
    });

    console.log('Registered routes!')
}