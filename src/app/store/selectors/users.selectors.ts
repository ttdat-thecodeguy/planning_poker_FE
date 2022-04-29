import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/users.reducers'

export const getAuthState = createFeatureSelector<UserState>('auth')

export const getAuthSpectorMode = createSelector(
    getAuthState,
    (state : UserState) => state.auth.spectorMode
)