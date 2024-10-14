document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa estar logado para acessar o dashboard.');
        window.location.href = 'login.html'; 
        return;
    }

    await loadTasks(token);
    setupEventListeners(token);
});

function setupEventListeners(token) {

    document.getElementById('logout-button').addEventListener('click', () => {
        localStorage.removeItem('token');    
        window.location.href = 'login.html';
    });

    document.getElementById('add-task-button').addEventListener('click', () => {
        document.getElementById('add-task-modal').style.display = 'flex';
    });

    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('add-task-modal').style.display = 'none';
    });

    document.getElementById('add-task-form').addEventListener('submit', async (e) => {
        e.preventDefault(); 
        await addTask(token);
        document.getElementById('add-task-modal').style.display = 'none'; 
    });

    document.getElementById('close-edit-modal').addEventListener('click', () => {
        document.getElementById('edit-task-modal').style.display = 'none';
    });

    document.getElementById('edit-task-form').addEventListener('submit', async (e) => {
        e.preventDefault(); 
        const taskId = document.getElementById('edit-task-form').getAttribute('data-task-id');
        await editTask(token, taskId);
        document.getElementById('edit-task-modal').style.display = 'none'; 
    });
}

async function loadTasks(token) {
    try {
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (response.ok) {
            displayTasks(data);
        } else {
            alert(`Erro: ${data.message}`);
        }
    } catch (error) {
        alert('Erro ao carregar as tarefas, tente novamente mais tarde.');
        console.error('Erro:', error);
    }
}

function displayTasks(tasks) {
    const taskList = document.getElementById('tasks-container');
    taskList.innerHTML = '';

    if (!tasks[0]) {
        const msg = document.createElement('h2');
        msg.textContent = 'Sem tarefas para exibir!';
        taskList.appendChild(msg);
        return msg;
    }

    tasks.forEach(task => {
        const taskItem = createTaskItem(task);
        taskList.appendChild(taskItem);
    });
}

function createTaskItem(task) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    const title = document.createElement('h2');
    title.textContent = task.title;

    const status = document.createElement('p');
    status.textContent = `Status: ${task.status === 0 ? 'Pendente' : task.status === 1 ? 'Em Andamento' : 'Concluído'}`;

    const priority = document.createElement('p');
    priority.textContent = `Prioridade: ${task.priority === 0 ? 'Baixa' : task.priority === 1 ? 'Média' : 'Alta'}`;

    const description = document.createElement('p');
    description.textContent = `Descrição: ${task.description}`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.onclick = () => openEditModal(task);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Deletar';
    deleteButton.onclick = () => deleteTask(task._id);

    taskItem.appendChild(title);
    taskItem.appendChild(status);
    taskItem.appendChild(priority);
    taskItem.appendChild(description);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    return taskItem;
}

async function addTask(token) {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let priority = parseInt(document.getElementById('priority'));
    let status = parseInt(document.getElementById('status'));

    try {
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title.value,
                description: description.value,
                priority: priority.value,
                status: status.value,
            }),
        });

        title.value = '';
        description.value = '';
        priority.value = 0;
        status.value = 0;

        const data = await response.json();

        if (response.ok) {
            loadTasks(token); 
        } else {
            alert(`Erro: ${data.message}`);
        }
    } catch (error) {
        alert('Erro ao adicionar a tarefa, tente novamente mais tarde.');
        console.error('Erro:', error);
    }
}

async function editTask(token, taskId) {
    const title = document.getElementById('edit-title').value;
    const description = document.getElementById('edit-description').value;
    const priority = parseInt(document.getElementById('edit-priority').value);
    const status = parseInt(document.getElementById('edit-status').value);

    try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                priority,
                status,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            loadTasks(token); 
        } else {
            alert(`Erro: ${data.message}`);
        }
    } catch (error) {
        alert('Erro ao editar a tarefa, tente novamente mais tarde.');
        console.error('Erro:', error);
    }
}

function openEditModal(task) {
    document.getElementById('edit-title').value = task.title;
    document.getElementById('edit-description').value = task.description;
    document.getElementById('edit-priority').value = task.priority;
    document.getElementById('edit-status').value = task.status;

    document.getElementById('edit-task-form').setAttribute('data-task-id', task._id);

    document.getElementById('edit-task-modal').style.display = 'flex';
}

async function deleteTask(id) {
    const token = localStorage.getItem('token');
    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                loadTasks(token); 
            } else {
                alert(`Erro: ${data.message}`);
            }
        } catch (error) {
            alert('Erro ao deletar a tarefa, tente novamente mais tarde.');
            console.error('Erro:', error);
        }
    }
}
