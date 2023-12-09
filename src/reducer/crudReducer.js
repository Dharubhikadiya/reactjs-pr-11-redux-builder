let initialState = {
    users: localStorage.getItem('crud') ? JSON.parse(localStorage.getItem('crud')) : [],
    user: {}
}

const Crud = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_RECORD':
            let insertRecord = action.payload;
            let allrecord = [...state.users, insertRecord];
            localStorage.setItem('crud', JSON.stringify(allrecord));
            return {
                ...state,
                users: allrecord
            }
        case 'DELETE_RECORD':
            let deleteRecord = state.users.filter((val) => {
                return val.id !== action.payload
            })
            localStorage.setItem('crud', JSON.stringify(deleteRecord));
            alert("Record successfully delete");
            return {
                ...state,
                users: deleteRecord
            }
        case 'EDIT_RECORD':
            let edit = state.users.find((val) => {
                return val.id === action.payload;
            })
            return {
                ...state,
                user: edit
            }
        case 'UPDATE_RECORD':
            let update = state.users.map((val) => {
                if (val.id === action.payload.id) {
                    return {
                        ...val,
                        name: action.payload.name,
                    }
                }
                return val;
            })
            localStorage.setItem('crud', JSON.stringify(update));
            return {
                ...state,
                users: update
            }
        default:
            return state;
    }
}

export default Crud;