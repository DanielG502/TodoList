import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos } from './use-cases/render-todo-useCases';
import { renderPending } from './use-cases/render-pending-useCases';


const ElementIDs = {
    clearCompleteButton: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
};

/**
 * @param {string} elementId
 */
export const App = (elementId) => {
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    };

    const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCountLabel);
    };

    // cuando la funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompleteButton = document.querySelector(
        ElementIDs.clearCompleteButton
    );
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);

    // Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]'); //buscamos el elemento padre
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const DestroyElement = event.target.className === 'destroy'; //buscamos por class id
        const element = event.target.closest('[data-id]');
        if (!element || !DestroyElement) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    clearCompleteButton.addEventListener('click', () => {
        todoStore.deleteComplete();
        displayTodos();
    });

    filtersLIs.forEach((element) => {
        element.addEventListener('click', (element) => {
            filtersLIs.forEach((el) => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Complete);
                    break;
            }
            displayTodos();
        });
    });
};
