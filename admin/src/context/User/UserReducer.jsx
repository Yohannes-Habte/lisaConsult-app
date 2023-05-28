import React from 'react'

// Object
export const USER_ACTION = {
    SIGNIN: "SIGNIN",
    SIGNOUT: "SIGNOUT",
}

const UserReducer = (state, action) => {
    switch(action.type) {
        case USER_ACTION.SIGNIN:
            return {...state, user: action.payload}
        case USER_ACTION.SIGNOUT:
            return {...state, user: action.payload}
        default:
            return state;
    }
 
}

export default UserReducer
