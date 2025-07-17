const task_input = document.getElementById('task-input')
const add_btn = document.getElementById('add-btn')
const task_list = document.getElementById('task-list')
const Comp_task_list = document.getElementById('id-comp-task-list')

window.onload = function() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let task = localStorage.getItem(key);
        if (task !== null) {
            addTask(null, task, i);
        }
    }
}

add_btn.addEventListener("click", function(event){
    event.preventDefault();
    let item = task_input.value.trim();
    if(item === '') {
        return alert('Please write your task before adding it');
    }
    let i = localStorage.length;
    localStorage.setItem(i, item);
    addTask(event,item, i);
});

function addTask(event, item, i) {
    if(event) event.preventDefault();
    
    if(item === '') {
        return alert('Please write your task before adding it');
    }

    const list_Item = document.createElement('li');
    list_Item.className = 'list-Item';

    const CompCheckBox = document.createElement('input')
    CompCheckBox.type = "checkbox"

    const task_I_O = document.createElement('input');
    task_I_O.className = "task-I-O"
    task_I_O.value = item
    task_I_O.disabled = true

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '✎';

    const delBtn = document.createElement('button');
    delBtn.className = 'del-btn';
    delBtn.textContent = '✖';

    list_Item.appendChild(CompCheckBox);
    list_Item.appendChild(task_I_O);
    list_Item.appendChild(editBtn);
    list_Item.appendChild(delBtn);

    task_list.appendChild(list_Item);
    task_input.value = '';

    editBtn.addEventListener('click', function(event) {
    event.preventDefault();
    task_I_O.disabled = false
    task_I_O.style.border = "solid 2px"
    list_Item.removeChild(delBtn)

    const edit_button = document.createElement('button');
    edit_button.textContent = '✎';
    edit_button.className = 'edit-button';

    editBtn.replaceWith(edit_button)

    edit_button.addEventListener('click', function(event) {
        event.preventDefault()
        let edited_task = task_I_O.value
        if (edited_task === '') {
            alert('Please enter a valid task')
            return
        }
        let key = localStorage.key(i);
        localStorage.setItem(key, edited_task)
        task_I_O.disabled = true
        task_I_O.style.border = 'none'

        edit_button.replaceWith(editBtn)
        list_Item.appendChild(delBtn)
    })
});

    CompCheckBox.addEventListener('click', function onChange(event) {
        event.preventDefault()

        const delButton = document.createElement('button');
        delButton.className = 'del-btn';
        delButton.textContent = '✖';
        
        const comp_task_div = document.createElement('div')
        comp_task_div.textContent = task_I_O.value
        comp_task_div.style.textDecoration = "line-through";

        const comp_task = document.createElement('li')
        comp_task.className = "list-Item"

        comp_task.appendChild(comp_task_div)
        comp_task.appendChild(delButton)

        task_list.removeChild(list_Item);
        Comp_task_list.appendChild(comp_task)

        delButton.addEventListener('click', function() {
            localStorage.removeItem(i);
            Comp_task_list.removeChild(comp_task);
        })
    })
    delBtn.addEventListener('click', function() {
        localStorage.removeItem(i);
        task_list.removeChild(list_Item);
    });

}