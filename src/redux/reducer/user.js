import {Types} from '../actionMethodes/types';

export const userReducer = (state = null, action) => {
    if (action.type == Types.signIn) {
        return action.payload
    }

    else if (action.type == Types.updateProfile) {
        return {
            ...state, name: action.payload.name, phone: action.payload.phone
        }
    }
    else if (action.type == Types.logOut)
        return null;
    return state;
}


export const userLanguage = (state = null, action) => {
    if (action.type == Types.setLanguage) {
        return {
            id: action.payload.id,
            language: action.payload.language,
            code: action.payload.code
        }
    }

    else if (action.type == Types.logOut)
        return null;
    return state;
}

export const userLocation = (state = null, action) => {
    if (action.type == Types.setLocation)
        return action.payload
    else if (action.type == Types.logOut)
        return null;
    return state;
}

export const allLanguages = (state = null, action) => {
    if (action.type == Types.getLanguages) {
        return action.payload.map(({ id, code, language }) => ({ id, code, language }));
    }
    return state;
}

export const userAddresses = (state = [], action) => {
    if (action.type == Types.getAddresses) {
        return action.payload;
    }
    return state;
}

export const fcmToken = (state = null, action) => {
    if (action.type == Types.saveToken) {
        return action.payload
    }
    else if (action.type == Types.logOut)
        return null;
    return state;
}