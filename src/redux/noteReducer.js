import { ADD_NOTE, DELETE_NOTE, DELETE_NOTES, EDIT_NOTE } from "./notesActions";

const initialState = {
    notes:[]
};

const notesReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_NOTE: {
            const { id, note, data, topic, time, desc } = action.payload;
            return {
                ...state,
                notes: [...state.notes, {id, note, data, topic, time, desc}]
            }
        }
        case EDIT_NOTE: {
            const { id, note, data, topic, time, desc } = action.payload;
            return {
                ...state,
                notes: state.notes.map((n) => (n.id === id ? {...n, note, data, topic, time, desc} :n))
            }
        }
        case DELETE_NOTE: {
            const { id } = action.payload;
            return {
                ...state,
                notes: state.notes.filter((n) => n.id !== id)
            }
        }
        case DELETE_NOTES: {
            return {
                ...state,
                notes:[],
            }
        }
        default:
            return state;
    }
}

export default notesReducer;