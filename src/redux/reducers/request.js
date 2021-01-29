const requestReducer = (state = {}, action) => {
    switch (action.type) {
        case 'insertNewRequest':
            state = action.request;
            return state;
        default:
            return state;
    }
}

export default requestReducer;