//dom
const dom = {
input: document.getElementById('todo-input'),
submitBtn: document.querySelector('.submit-btn'),
error: document.querySelector('.error'),
itemsList: document.querySelector('.todos-list'),
clearAllBtn: document.querySelector('.clear-btn'),
};

// data
const data = {
items: [
{
id: 1,
text: 'Buy vitamins',
},
{
id: 2,
text: 'Learn JavaScript',
},
{
id: 3,
text: 'Wash dishes',
},

],
id: 4,
};

//create todo function
const createTodo = (item) => {
//create items
const container = document.createElement('div');
container.classList.add('todo-item');
container.id = item.id;

//create title
const title = document.createElement('p');
title.classList.add('title');
title.innerText = item.text;

//create btn container
const btnContainer = document.createElement('div');
btnContainer.classList.add('btn-container');

//create edit btn
const editBtn = document.createElement('button');
editBtn.classList.add('edit-btn');
editBtn.innerText = 'EDIT';

editBtn.addEventListener('click', () => {
editBtnHandler(item);
});

//create delete btn
const deleteBtn = document.createElement('button');
deleteBtn.classList.add('delete-btn');
deleteBtn.innerText = 'DELETE';

deleteBtn.addEventListener('click', () => {
deleteBtnHandler(item.id);
});

btnContainer.append(editBtn, deleteBtn);
container.append(title, btnContainer);

return container;
};


//handlers function 
const addItemHandler = (e) => {
e.preventDefault();

const value = dom.input.value.trim();
const btnType = dom.submitBtn.innerText;

if (btnType === 'Submit') {
if (!value) {
dom.error.innerText = 'Input cannot be empty';
dom.error.classList.add('error-css');
setTimeout(() => {
dom.error.innerText = '';
dom.error.classList.remove('error-css');
}, 2000);
} else {
// Check if class coffee exists
const coffeeExist = document.getElementById('coffee');
if (coffeeExist) coffeeExist.remove();

//new item - data
const newItem = {
id: data.items.length + 1,
text: value,
};

//new item - dom
const newItemDom = createTodo(newItem);
// newItemDom.classList.add('error-css');

data.items.push(newItem);

dom.itemsList.prepend(newItemDom);
dom.input.value = '';
}
} else {
// modify dom
const selectedItem = document.querySelector('.selected');
selectedItem.querySelector('.title').innerText = value;
const id = Number(selectedItem.id);

//modify data
const itemData = data.items.find((item) => {
return item.id === id;
});
itemData.text = value;
dom.input.value = '';
dom.submitBtn.innerText = 'Submit';
selectedItem.classList.remove('selected');
}
};

//create function
const clearAllHandler = () => {
//dom
if (confirm('Are you sure you want to clear all the items?')) {
//data
data.items = [];
dom.itemsList.innerHTML = '';
alert('Items cleared successfully');

if (data.items.length === 0) {
    dom.itemsList.innerHTML = `<p id="coffee">Now you can rest and watch Netflix

        <span class="material-symbols-outlined">
coffee
</span></p>`;
}
} else {
alert('Clearing cancelled');
}
};

//delete function
const deleteBtnHandler = (id) => {
// delete item from dom
const item = document.getElementById(id);
if (item) {
item.remove();
}

//delete item from data
data.items = data.items.filter((itemData) => {
return itemData.id !== id;
});
console.log(data.items);
};

//edit function
const editBtnHandler = (item) => {
dom.submitBtn.innerText = 'Edit';
dom.input.value = item.text;
document.getElementById(item.id).classList.add('selected');
};

//create todo function
const loadHandler = () => {
data.items.forEach((item) => {
const container = createTodo(item);
dom.itemsList.append(container);
});
};

// add item function
const addItemEvent = () => {
dom.submitBtn.addEventListener('click', (e) => {
addItemHandler(e);
});
};

//clear all function
const clearAllEvent = () => {
dom.clearAllBtn.addEventListener('click', clearAllHandler);
};

const loadEvent = () => {
window.addEventListener('load', loadHandler);
};



loadEvent();
addItemEvent();
clearAllEvent();
