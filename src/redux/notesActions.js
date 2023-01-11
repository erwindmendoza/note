export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTES = 'DELETE_NOTES';
export const EDIT_NOTE = 'EDIT_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

export const addNote = (id, note, date, topic, time, desc) => ({
    type: ADD_NOTE,
    payload: {id, note, date, topic, time, desc}
});

export const editNote = (id, note, date, topic, time, desc) => ({
    type: EDIT_NOTE,
    payload: {id, note, date, topic, time, desc}
});

export const deleteNote = (id) => ({
    type: DELETE_NOTE,
    payload: {id}
});

export const deleteAllNotes = () => ({
    type: DELETE_NOTES
});