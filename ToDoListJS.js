const task_input = document.getElementById('task-input')
const add_btn = document.getElementById('add-btn')
const task_list = document.getElementById('task-list')
const Comp_task_list = document.getElementById('id-comp-task-list')
const search_input = document.querySelector('#search-input')
const search_btn = document.querySelector('#search-btn')
const search_comp_input = document.querySelector('#search-comp-input')
const search_comp_btn = document.querySelector('#search-comp-btn')

let comp_tasks = [];
let pending_tasks = [];

function remove(i) {
    const compIndex = comp_tasks.indexOf(i);
    if (compIndex !== -1) {
        comp_tasks.splice(compIndex, 1);
    }
    const index = pending_tasks.indexOf(i);
    if (index !== -1) {
        pending_tasks.splice(index, 1);
    }
}

window.onbeforeunload = function () {
    localStorage.setItem('pending_tasks_list', JSON.stringify(pending_tasks));
    localStorage.setItem('comp_tasks_list', JSON.stringify(comp_tasks));
};

window.onload = function () {
    let pending = JSON.parse(localStorage.getItem('pending_tasks_list')) || [];
    let completed = JSON.parse(localStorage.getItem('comp_tasks_list')) || [];

    pending.forEach(i => {
        let task = localStorage.getItem(i);
        if (task !== null) {
            addTask(null, task, i);
        }
    });

    completed.forEach(i => {
        let task = localStorage.getItem(i);
        if (task !== null) {
            addCompTask(null, task, i);
            comp_tasks.push(i);
        }
    });
};

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const debouncedSearch = debounce(serachTask, 300);
search_input.addEventListener('input', debouncedSearch);

search_btn.addEventListener('click', function(event) {
    event.preventDefault();
    serachTask();
});

const debouncedSearchComp = debounce(searchCompTask, 300);
search_comp_input.addEventListener('input', debouncedSearchComp);

search_comp_btn.addEventListener('click', function(event) {
    event.preventDefault();
    searchCompTask();
});

function serachTask() {
    const query = search_input.value.trim()
    const tasks = document.querySelectorAll('#task-list li');
    
    tasks.forEach(function(task) {
        const taskInput = task.querySelector('.task-I-O');
        if (!taskInput) return;

        const text = taskInput.value.toLowerCase();
        if (text.includes(query)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}

function searchCompTask() {
    const query = search_comp_input.value.trim().toLowerCase();
    const compTasks = document.querySelectorAll('#id-comp-task-list li');
    
    compTasks.forEach(function(task) {
        const taskInput = task.querySelector('.comp-task-div');
        if (!taskInput) return;

        const text = taskInput.textContent.toLowerCase();
        if (text.includes(query)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}

task_input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            preAdd(event);
        }
    });

add_btn.addEventListener("click", preAdd)
    
function preAdd(event){
    event.preventDefault();
    let item = task_input.value.trim();
    if(item === '') {
        return alert('Please write your task before adding it');
    }
    let i = Date.now().toString();
    localStorage.setItem(i, item);
    addTask(event,item, i);
}

function addTask(event, item, i) {
    if(event) event.preventDefault();
    
    pending_tasks[pending_tasks.length] = i

    if(item === '') {
        return alert('Please write your task before adding it');
    }

    const list_Item = document.createElement('li');
    list_Item.className = 'list-Item';

    const input_container = document.createElement('div')
    input_container.className = 'item-container'

    const CompCheckBox = document.createElement('input')
    CompCheckBox.type = "checkbox"

    const task_I_O = document.createElement('input');
    task_I_O.className = "task-I-O"
    task_I_O.value = item
    task_I_O.disabled = true

    input_container.appendChild(CompCheckBox)
    input_container.appendChild(task_I_O)

    const btn_container = document.createElement('div')
    btn_container.className = 'item-container'

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '✎';

    const delBtn = document.createElement('button');
    delBtn.className = 'del-btn';
    delBtn.textContent = '✖';

    btn_container.appendChild(editBtn)
    btn_container.appendChild(delBtn)

    list_Item.appendChild(input_container)
    list_Item.appendChild(btn_container)

    task_list.appendChild(list_Item);
    task_input.value = '';

    editBtn.addEventListener('click', function(event) {
    event.preventDefault();
    task_I_O.disabled = false
    task_I_O.style.border = "solid 1px"
    task_I_O.style.borderRadius = "5px"
    btn_container.removeChild(delBtn)

    const edit_button = document.createElement('button');
    edit_button.textContent = '✎';
    edit_button.className = 'edit-button';

    editBtn.replaceWith(edit_button)

    task_I_O.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            edit_task(event);
        }
    });

    edit_button.addEventListener('click', edit_task);
    
    function edit_task(event) {
        event.preventDefault();
        let edited_task = task_I_O.value;
        if (edited_task === '') {
            alert('Please enter a valid task');
            return;
        }
        localStorage.setItem(i, edited_task);
        task_I_O.disabled = true;
        task_I_O.style.border = 'none';
        edit_button.replaceWith(editBtn);
        btn_container.appendChild(delBtn);
    }
});

    CompCheckBox.addEventListener('click', function onChange(event) {
        event.preventDefault()

        comp_tasks[comp_tasks.length] = i
        const index = pending_tasks.indexOf(i);
        if (index !== -1) {
            pending_tasks.splice(index, 1);
        }

        const delButton = document.createElement('button');
        delButton.className = 'del-btn';
        delButton.textContent = '✖';
        
        const comp_task_div = document.createElement('div')
        comp_task_div.className = 'comp-task-div';
        comp_task_div.textContent = task_I_O.value;
        comp_task_div.style.overflowWrap = "break-word";
        comp_task_div.style.width = "350px";
        comp_task_div.style.textDecoration = "line-through";

        const comp_task = document.createElement('li')
        comp_task.className = "list-Item"

        comp_task.appendChild(comp_task_div)
        comp_task.appendChild(delButton)

        task_list.removeChild(list_Item);
        Comp_task_list.appendChild(comp_task)

        delButton.addEventListener('click', function() {
            let key = localStorage.key(i);
            localStorage.removeItem(key);
            Comp_task_list.removeChild(comp_task);
            remove(i)
        })
    })
    delBtn.addEventListener('click', function() {
        let key = localStorage.key(i);
        localStorage.removeItem(key);
        task_list.removeChild(list_Item);
        remove(i)
    });
}

function addCompTask(event, item, i) {
    if(event) event.preventDefault();

    if(item === '') {
        return alert('Please write your task before adding it');
    }

    const delBtn = document.createElement('button');
    delBtn.className = 'del-btn';
    delBtn.textContent = '✖';

    const comp_task_div = document.createElement('div')
    comp_task_div.className = 'comp-task-div';
    comp_task_div.textContent = item
    comp_task_div.style.overflowWrap = "break-word";
    comp_task_div.style.width = "350px";
    comp_task_div.style.textDecoration = "line-through";

    const comp_task = document.createElement('li')
    comp_task.className = "list-Item"

    comp_task.appendChild(comp_task_div)
    comp_task.appendChild(delBtn)

    Comp_task_list.appendChild(comp_task)

    delBtn.addEventListener('click', function() {
        let key = localStorage.key(i);
        localStorage.removeItem(key);
        Comp_task_list.removeChild(comp_task);
        remove(i)
    })    
}