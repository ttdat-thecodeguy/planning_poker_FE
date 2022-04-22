import { createAction, props } from "@ngrx/store";
import { UserSignError } from "src/app/model/user-error.model";
import { UserResponse } from "src/app/model/user-response.model";

export const userSignUpAsGuest = createAction('user sign up as guest',props<{ payload?: UserResponse }>())
export const userSignAction = createAction('user sign',props<{ payload: UserResponse | UserSignError }>());
export const userLogoutAction = createAction('user logout');
export const userLoginError = createAction('login fail', props<{ payload? : any }>());