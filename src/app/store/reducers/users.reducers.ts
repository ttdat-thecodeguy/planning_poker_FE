import { createReducer, on } from "@ngrx/store";
import { userSignAction, userLoginError, userLogoutAction } from '../actions/users.action';

const initState = {
    auth: {},
    error: {}
};

export const authReducer = createReducer(
    initState, 
    on(userSignAction, (state, {payload}) => {
        return ({...state, 
            auth: payload,
            error: {}
        })
    }),
    on(userLogoutAction, ( state ) =>{ console.log('Logout'); return({...state ,auth: {}, error : {} } ) }),
    on(userLoginError, (state, { payload }) => {
        return  ({...state , auth : {}, error: payload })
    }))