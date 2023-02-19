import { Server } from "@hapi/hapi"
import * as Validations from '../Validations/despesas-validations'
import * as Controller from '../Controllers/despesas-controller'

export const initRoutes = (server: Server) => {
    server.route([
        {
            method: 'GET',
            path: '/despesas',
            handler: Controller.getDespesas,
            options: {
                validate: {
                    headers: Validations.UserLogin
                }
            }
        },
        {
            method: 'GET',
            path: '/despesas/{id}',
            handler: Controller.getDespesasById,
            options: {
                validate: {
                    params: Validations.DespesasId,
                    headers: Validations.UserLogin
                }
            }
        },
        {
            method: 'POST',
            path: '/despesas',
            handler: Controller.createDespesas,
            options: {
                validate: {
                    params: Validations.DespesasPayload,
                    headers: Validations.UserLogin
                }
            }
        },
        {
            method: 'PUT',
            path: '/despesas',
            handler: Controller.updateDespesas,
            options: {
                validate: {
                    payload: Validations.DespesasUpdate,
                    headers: Validations.UserLogin
                }
            }
        },
        {
            method: 'DELETE',
            path: '/despesas/{id}',
            handler: Controller.deleteDespesas,
            options: {
                validate: {
                    params: Validations.DespesasId,
                    headers: Validations.UserLogin
                }
            }
        }
    ])
};