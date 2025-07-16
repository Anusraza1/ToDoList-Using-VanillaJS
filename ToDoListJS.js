const task_input = document.getElementById('task-input')
const add_btn = document.getElementById('add-btn')
const task_list = document.getElementById('task-list')

add_btn.addEventListener("click", function(event){
    event.preventDefault();
    addTask();
});

function addTask(event) {
    if(event) event.preventDefault();

    let item = task_input.value.trim();
    if(item === '') {
        return alert('Please write your task before adding it');
    }
    let i = localStorage.length;
    localStorage.setItem(i, item);

    const btn_container = document.createElement('div');
    const list_Item = document.createElement('li');
    list_Item.className = 'list-Item';

    const taskSpan = document.createElement('span');
    taskSpan.textContent = item;

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '✎';

    const delBtn = document.createElement('button');
    delBtn.className = 'del-btn';
    delBtn.textContent = '✖';

    btn_container.appendChild(editBtn);
    btn_container.appendChild(delBtn);

    list_Item.appendChild(taskSpan);
    list_Item.appendChild(btn_container);

    task_list.appendChild(list_Item);
    task_input.value = '';

   editBtn.addEventListener('click', function() {
    const edit_sec = document.createElement('div');
    edit_sec.className = 'edit-sec';

    const edit_input = document.createElement('input');
    edit_input.className = 'edit-input';
    edit_input.placeholder = 'Edit Task Here';

    const edit_button = document.createElement('button');
    edit_button.textContent = '✎';
    edit_button.className = 'edit-button';
    edit_button.type = 'button'; // 🩹 **The important fix**

    edit_sec.appendChild(edit_input);
    edit_sec.appendChild(edit_button);
    task_list.appendChild(edit_sec);

    edit_button.addEventListener('click', function(event) {
        event.preventDefault();
        let edited_task = edit_input.value.trim();
        if (edited_task === '') {
            alert('Please enter a valid task');
            return;
        }
        localStorage.setItem(i, edited_task);
        taskSpan.textContent = edited_task;
        task_list.removeChild(edit_sec);
    });
    });

    delBtn.addEventListener('click', function() {
        localStorage.removeItem(i);
        task_list.removeChild(list_Item);
    });
}
