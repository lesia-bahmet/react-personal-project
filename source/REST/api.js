import { MAIN_URL, TOKEN } from './config';

const requestHeaders = {
    headers: {
        'Authorization': TOKEN,
        'Content-type': 'application/json'
    }
};

export const api = {
    fetchTasks: () => fetch(MAIN_URL, {
        ...requestHeaders,
        method: 'GET',
    }).then(response => response.json())
      .then(response => response.data),

    createTask: message => fetch(MAIN_URL, {
        ...requestHeaders,
        method: 'POST',
        body: JSON.stringify({message}),
    }).then(response => response.json())
      .then(response => response.data),

    updateTask: task => fetch(MAIN_URL, {
        ...requestHeaders,
        method: 'PUT',
        body: JSON.stringify([task])
    }).then(response => response.json())
      .then(response => response.data),

    removeTask: id => fetch(`${MAIN_URL}/${id}`, {
        ...requestHeaders,
        method: 'DELETE',
    }).then(() => (void 0)),

    completeAllTasks: tasks => fetch(MAIN_URL, {
        ...requestHeaders,
        method: 'PUT',
        body: JSON.stringify(tasks)
    }).then(response => response.json())
      .then(response => response.data),
};
