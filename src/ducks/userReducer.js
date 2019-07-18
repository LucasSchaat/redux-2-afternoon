import axios from 'axios'

let initialState = {
    email: null,
    firstName: null,
    lastName: null
}

const REQUEST_USER_DATA = 'REQUEST_USER_DATA'

export const requestUserData = () => {
    let userData = axios.get('/auth/user-data').then(res => res.data)
    return {
        type: REQUEST_USER_DATA,
        payload: userData
    }
}

export default function reducer(state = initialState, action) {
    let { type, payload } = action
    switch(type) {
        case REQUEST_USER_DATA + '_FULFILLED':
            return {
                email: payload.user.email,
                firstName: payload.user.firstName,
                lastName: payload.user.lastName
            }
        default:
            return state
    }
}