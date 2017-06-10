import axios from 'axios';

// Types
export const CREATE_TODO = 'CREATE_TODO';
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS';
export const CREATE_TODO_FAIL = 'CREATE_TODO_FAIL';
export const FETCH_TODOS = 'FETCH_TODOS';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAIL = 'FETCH_TODOS_FAIL';

const initialState = {
  loading: false,
  error: false,
  todos: []
}

// Reducer
export function todos(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_TODO:
      return { ...state, loading: true };
    case CREATE_TODO_SUCCESS:
      return { ...state, loading: false, error: false, todos: action.todos };
    case CREATE_TODO_FAIL:
      return { ...state, loading: false, error: true };

    case FETCH_TODOS:
      return { ...state, loading: true };
    case FETCH_TODOS_SUCCESS:
      return { ...state, loading: false, error: false, todos: action.todos };
    case FETCH_TODOS_FAIL:
      return { ...state, loading: false, error: true };
  }

  return state;
}

// Actions creators
export function createTodo(todo) {
  return (dispatch) => {
    dispatch({ type: CREATE_TODO });

    return axios
      .post('http://localhost:3001/todos', todo)
      .then(({ data }) => {
        dispatch({ type: CREATE_TODO_SUCCESS, todos: data });
      })
      .catch(() => dispatch({ type: CREATE_TODO_FAIL }));
  };
}

export function fetchTodos() {
  return (dispatch) => {
    dispatch({ type: FETCH_TODOS });

    return axios
      .get('http://localhost:3001/todos')
      .then(({ data }) => {
        dispatch({ type: FETCH_TODOS_SUCCESS, todos: data });
      })
      .catch(() => dispatch({ type: FETCH_TODOS_FAIL }));
  };
}
