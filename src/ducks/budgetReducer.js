import axios from "axios";

let initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA'
const ADD_PURCHASE = 'ADD_PURCHASE'
const REMOVE_PURCHASE = 'REMOVE_PURCHASE'

export const requestBudgetData = () => {
    let budgetData = axios.get('/api/budget-data').then(res => res.data)
    return {
        type: REQUEST_BUDGET_DATA,
        payload: budgetData
    }
}

export const addPurchase = (price, description, category) => {
    let purchaseData = axios.post('/api/budget-data/purchase', {description, price, category}).then(res => res.data)
    return {
        type: ADD_PURCHASE,
        payload: purchaseData
    }
}

export const removePurchase = (id) => {
    let purchases = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data)
    return {
        type: REMOVE_PURCHASE,
        payload: purchases
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action
    switch(type) {
        case REQUEST_BUDGET_DATA + '_PENDING':
            return { ...state, loading: true}
        case REQUEST_BUDGET_DATA + '_FULFILLED':
            return { ...state, ...payload, loading: false}
        case ADD_PURCHASE + '_PENDING':
            return { ...state, loading: true}
        case ADD_PURCHASE + '_FULFILLED':
            return { ...state, purchases: payload, loading: false}
        case REMOVE_PURCHASE + '_PENDING':
            return { ...state, loading: true}
        case REMOVE_PURCHASE + '_FULFILLED':
            return { ...state, purchases: payload, loading: false}
        default:
            return state
    }
}