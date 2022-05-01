import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { userSignAction, userLoginError, userLogoutAction, userSpectatorModeAction, refreshTokenAction } from '../actions/users.action';


export interface UserState {
    auth : any,
    error : any
}

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
    }),
    on(userSpectatorModeAction, ( state, { payload } ) => {
        return ({...state, auth: {
            ...state.auth,
            spectorMode: payload
        }})
    }), 
    on(refreshTokenAction, (state,  {payload} ) => {
        return ({...state, auth: {
            ...state.auth,
            token: payload
        }})
    })  )