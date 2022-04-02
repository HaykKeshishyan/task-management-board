import { createAction } from '../../../Helpers/redux-helper';

const SET_TASKS = 'tasksDuck/SET_TASKS';
const ADD_TASK = 'tasksDuck/ADD_TASK';
const EDIT_TASK = 'tasksDuck/EDIT_TASK';

export const setTasks = createAction(SET_TASKS);
export const addTask = createAction(ADD_TASK);
export const editTask = createAction(EDIT_TASK);

const initialState = {
    tasks: [{ tasks_detail: {} }],
};

const TasksDuck = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_TASKS:
            return { ...state, tasks: [...payload] };
        case ADD_TASK:
            return { ...state, tasks: [...state.tasks, payload] };
        case EDIT_TASK:
            const index = state.tasks.findIndex(({ id }) => id === payload.id)
            state.tasks.splice(index, 1, payload)
            return { ...state, tasks: [...state.tasks] }
        default:
            return state;
    }
};

export default TasksDuck;
