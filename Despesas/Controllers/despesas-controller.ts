import { ResponseToolkit } from '@hapi/hapi'
import { CreateDespesasRequest, DespesasIdRequest, UpdateDespesasRequest, UserLogin } from '../Interface/despesas-interface';
import * as Boom from '@hapi/boom';
import * as DespesasService from '../service/despesas-service';
import * as moment from 'moment';

export const getDespesas = async (request: UserLogin, responseToolkit: ResponseToolkit) => {
    await verifyUsers(request.headers.user, request.headers.password);
    const despesas = await DespesasService.getAllDespesas(request.headers.user);

    return responseToolkit.response(despesas).code(200);
}

export const getDespesasById = async (request: DespesasIdRequest, responseToolkit: ResponseToolkit) => {
    const { id } = request.params;

    await verifyUsers(request.headers.user, request.headers.password);
    await verifyOwner(request.headers.user, id);

    const despesas = await DespesasService.getDespesasByIdentifier(id);

    if (!despesas) {
        throw Boom.badRequest(`Despesa not found: ${id}`);
    }

    return responseToolkit.response(despesas).code(200);
}

export const createDespesas = async (request: CreateDespesasRequest, responseToolkit: ResponseToolkit) => {
    const { id, description, date, value } = request.payload;

    await verifyUsers(request.headers.user, request.headers.password);

    if(description.length > 191){
        throw Boom.badRequest('Description is too long!');
    }
    if(moment(date) > moment()){
        throw Boom.badRequest('Date is in future!');
    }
    if(Math.sign(value)){
        throw Boom.badRequest('Negative value!');
    }

    const despesasCreate = await DespesasService.createDespesas({
        id, description, date, value, userId: request.headers.user
    });


    return responseToolkit.response(despesasCreate).code(201);

};

export const updateDespesas = async (request: UpdateDespesasRequest, responseToolkit: ResponseToolkit) => {
    const {  id, description, date, value } = request.payload;

    await verifyUsers(request.headers.user, request.headers.password);
    
    await verifyOwner(request.headers.user, id);
    if(description.length > 191){
        throw Boom.badRequest('Description is too long!');
    }
    if(moment(date) > moment()){
        throw Boom.badRequest('Date is in future!');
    }
    if(Math.sign(value)){
        throw Boom.badRequest('Negative value!');
    }

    const despesasUpdate = await DespesasService.updateDespesas({
        id, description, date, value
    });

    return responseToolkit.response(despesasUpdate).code(201);
};

export const deleteDespesas = async (request: DespesasIdRequest, responseToolkit: ResponseToolkit) => {
    const { id } = request.params;
    await verifyUsers(request.headers.user, request.headers.password);
    await verifyOwner(request.headers.user, id);

    const despesas = await DespesasService.getDespesasByIdentifier(id);

    if (!despesas) {
        throw Boom.notFound(`Despesas not find: ${id}`);
    }

    await DespesasService.deleteDespesas(id);

    return responseToolkit.response(`Despesas Deleted: ${id}`).code(200);
}

const verifyUsers = async (user, password) => {
    const verifyUser = await DespesasService.verifyUserAndPassword(user, password);

    if(!verifyUser){
        throw Boom.notFound(`User not found: ${user}`);
    }
    if(verifyUser.status === false){
        throw Boom.badRequest('Wrong password!');
    }
    return;
}

const verifyOwner = async (user, id) => {
    const verifyUser = await DespesasService.verifyOwner(user, id);

    if(!verifyUser){
        throw Boom.notFound(`User not owner of Despesa!`);
    }

    return;
}