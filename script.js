  
    function addTodo() {
        const todoInput = document.getElementById('todo-input');
        const date=document.getElementById('todo-date')
        const todoText = todoInput.value.trim();
        const deadline = date.value
        if (todoText !== '' && deadline) {
            const todoItem = { text: todoText, complete: false, deadline: deadline };
            saveTodo(todoItem);
            todoInput.value = '';
            displayTodos();
        }
        else{
            alert('Task or Date is missing')
        }
    }

    function saveTodo(todoItem) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todoItem);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function displayTodos() {
        const todosContainer = document.getElementById('todos');
        todosContainer.innerHTML = '';

        const todos = JSON.parse(localStorage.getItem('todos')) || [];

        todos.forEach((todo, index) => {
            const todoDiv = document.createElement('div');
            todoDiv.className = `todo-item ${todo.complete ? 'complete' : ''} ${isMissed(todo.deadline, todo.complete) ? 'missed' : ''}`;
            todoDiv.innerHTML = `
                <span>${todo.text}</span>
                <span>${todo.deadline ? 'Deadline: ' + todo.deadline : ''}</span>
                <button onclick="toggleComplete(${index})">${todo.complete ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTodo(${index})">Delete</button>
            `;
            todosContainer.appendChild(todoDiv);
        });
    }

    function toggleComplete(index) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos[index].complete = !todos[index].complete;
        localStorage.setItem('todos', JSON.stringify(todos));
        displayTodos();
    }
    
    function deleteTodo(index) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        displayTodos();
    }

    function isMissed(deadline, complete) {
        if (deadline && !complete) {
            const today = new Date();
            const deadlineDate = new Date(deadline);
            return deadlineDate < today;
        }
        return false;
    }

    
    displayTodos();