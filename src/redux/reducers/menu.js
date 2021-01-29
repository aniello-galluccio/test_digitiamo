const menuReducer = (state = 'ABOUT', action) => {
    switch (action.type) {
        case 'ABOUT':
            return 'ABOUT';
        case 'MUSIC':
            return 'MUSIC';
        case 'WORK':
            return 'WORK';
        default:
            return state;
    }
}

export default menuReducer;