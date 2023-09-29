import { Todo } from '../todos/models/todo.model';

export const Filters = {
    All: 'all',
    Complete: 'complete',
    Pending: 'pending',
};

const state = {
    todos: [],
    filter: Filters.All,
};

const initStore = () => {
    loadStore();
    console.log('InitStore');
};

const loadStore = () => {
    if (!localStorage.getItem('state')) return;

    const { todos = [], filter = Filters.All } = JSON.parse(
        localStorage.getItem('state')
    );
    state.todos = todos;
    state.filter = filter;
};

const saveLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
};

const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Complete:
            return state.todos.filter((todo) => todo.done);
        case Filters.Pending:
            return state.todos.filter((todo) => !todo.done);
        default:
            throw new Error(`Option ${filter} is not valid.`);
    }
};

const addTodo = (description) => {
    if (!description) throw new Error('Description is required');
    state.todos.push(new Todo(description));
    saveLocalStorage();
};

const toggleTodo = (todoId) => {
    state.todos = state.todos.map((todo) => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
    saveLocalStorage();
};

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter((todo) => todo.id !== todoId);
    saveLocalStorage();
};

const deleteComplete = () => {
    state.todos = state.todos.filter((todo) => !todo.done);
    saveLocalStorage();
};

/**
 *
 * @param {filters} newFilter
 */
const setFilter = (newFilter = Filter.All) => {
    state.filter = newFilter;
    saveLocalStorage();
};

const getCurrentFilter = () => {
    return state.filter;
};

export default {
    addTodo,
    deleteComplete,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    toggleTodo,
    setFilter,
    loadStore,
};
