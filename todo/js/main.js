'use strict'
const buttons = document.querySelectorAll('.submit, .fa-plus');
const container = document.querySelector('.todo-list');
const input = document.querySelector('#input');
const notesInput = document.querySelector('.notes-input')
const inputs = document.querySelectorAll('#input, .notes-input');
const selector = '.todo-item';
const leftContainer = document.querySelector('.list-notes');
const rightCol = document.querySelector('.container-inner__col-right');
let ids= [], todoItems = [], id = 0, dragSrcEl,dragText,dragDone,checked

/// === Classes === ///

class Item {
  constructor(id,text,checked = false, done = false) {
    this.id = id
    this.text = text
    this.checked = checked
    this.done = done
  }
   static createItem(id,text,checked = false,done = false) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    todoItem.setAttribute('draggable', 'true');
    todoItem.innerHTML = `
    <div class="todo-item__wrap">
    <span class='todo-item__wrap_text'>${text}</span>
    <span class = todo-item__wrap_icon>
   </span>  
   </div> `  
    !checked ? todoItem.querySelector('.todo-item__wrap_icon').append(createBtn(id, editItem, 'fas', 'fa-pencil-alt'), createBtn(id)) :
    todoItem.querySelector('.todo-item__wrap_icon').append(createBtn(id, editItem, 'fas', 'fa-pencil-alt'), createBtn(id, checkItem, 'fas', 'fa-check'), createBtn(id));
    if(done && checked) {
      todoItem.querySelector('.fa-check').classList.add('green')
      todoItem.querySelector('.todo-item__wrap_text').classList.add('line-through')
     }else if(done) {
      todoItem.querySelector('.todo-item__wrap_text').classList.add('line-through')
     }

    function dragStart(e) {
      this.style.opacity = '0.4';
      dragSrcEl = this;
      todoItems.find(item => item.id == id).done  ? dragDone = true : dragDone = false;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/id', id);
      e.dataTransfer.setData('done', todoItems.find(item => item.id == id).done || false)
      dragText = todoItems.find(item => item.id == id).text
      
    }

    function dragDrop(e) {
      if (dragSrcEl != this) {
        todoItems.find(item => item.id == e.dataTransfer.getData('text/id')).text = todoItems.find(item => item.id == id).text
        todoItems.find(item => item.id == id).text = dragText;
        if (dragDone && !todoItems.find(item => item.id == id).done ) {
          todoItems.find(item => item.id == e.dataTransfer.getData('text/id')).done = false;
          todoItems.find(item => item.id == id).done = true;
        }
        setTimeout(render, 165)
      }

      return false
    }
    function addEventsDragAndDrop(el, selector) {
      el.addEventListener('dragstart', dragStart);
      el.addEventListener('dragenter', dragEnter);
      el.addEventListener('dragover', dragOver);
      el.addEventListener('dragleave', dragLeave);
      el.addEventListener('drop', dragDrop);
      el.addEventListener('dragend', function () {
        dragEnd(el, selector)
      });
    }

    container.append(todoItem)
    addEventsDragAndDrop(todoItem, selector, id)
    Store.saveListData()
    return todoItem;
  }
}

class Store {
 static saveListData() {
  localStorage.setItem('list', JSON.stringify(todoItems))
 }
 static DisplayList() {
    todoItems = JSON.parse(localStorage.getItem('list'));
    // to fix bag when refreshing page on shared notes//
    todoItems.forEach(item => item.checked = false)
    //to fix bag when refreshing page and already have id == 0;
    todoItems.forEach(item => ids.push(item.id));
    id = Math.max(...ids) + 1;

    render()
 }
}

/// === Classes === ///

/// === Listeners === ///

buttons.forEach(btn =>btn.addEventListener('click', () => {
  submit()
}));
   
inputs.forEach(input => input.onkeydown = event => {
  if(event.key == 'Enter') {
    submit(event);
  }
});

leftContainer.onclick = event => {
  const notes = document.querySelector('.notes');
  
  if(document.querySelector('.table-container')) {
      document.querySelector('.table-container').remove()
  };
  if (notes.style.opacity == '1') {
      notes.style.opacity = '0';
      notes.style.zIndex = '-1';

      document.querySelector('#container').append(container);
      swapCheckedValue()
  }
  else if (event.target.closest('.fa-book, .list-notes__text')) {
      notes.style.zIndex = '1';
      notes.style.opacity = '1';
     
      rightCol.style.position = 'relative';
      rightCol.prepend(notes);
      notes.append(container);
      swapCheckedValue()      
  }  
}

/// === /Listeners === ///


/// === Functions === ///
const createBtn = (id, listener = removeItem,type1 = 'far',type2 = 'fa-trash-alt') => {
  const btn = document.createElement('i');
  btn.classList.add(type1, type2);
  btn.addEventListener('click', (e) => {
    listener(id)
  })
  return btn;
}

const render = () => {
  container.innerHTML = ''
  todoItems.forEach(item => container.append(Item.createItem(item.id,item.text,item.checked,item.done)))
  Store.saveListData()
}

const removeItem = (id, e) => {
  const { target } = event;
  if (confirm(target)) {
    noop = callback(id)
  } else {
    remove(id)
  }
}

const remove = id => {
  todoItems = todoItems.filter(item => item.id != id);
  render()
}

const editItem = id => {
  const todoText = event.target.closest('.todo-item__wrap').firstElementChild;
  const textArea = document.createElement('textarea');

  editStart(textArea, todoText)
  selectTextarea(textArea)
  textArea.onkeydown = confirmEdit;
  
  textArea.oninput = function () {
    if (textArea.value.length <= 0) {
      textArea.style.borderBottom = '2px solid red';
    }
  }

  textArea.onblur = function () {
    if (textArea.value.length <= 0) {
      textArea.value = todoText.innerHTML;
      textArea.replaceWith(todoText)
    }
    todoItems.find(item => item.id == id).text = textArea.value;
    onBlur(textArea, todoText)
  }
}

const checkItem = id => {
  todoItems = todoItems.map(item => {
    if(item.id !== id) return item;
    return {
      ...item,
      done: !item.done
    }
  })
  render()
}

const submit = () => {
  notesInput.value ? checked = true : checked = false;
  const inputText = (input.value || notesInput.value);
  if (inputText.length > 30 || inputText.length == 0 || container.children.length > 5) return;

  todoItems.push(new Item(id,inputText,checked))
  Item.createItem(id,inputText,checked);
  todoItems.forEach(item => ids.push(item.id));
  id = Math.max(...ids) + 1;

  input.value = '';
  notesInput.value = ''; 
};

const swapCheckedValue = () => {
  todoItems.map(item => item.checked = !item.checked);
  render() 
}

function dragEnter(e) {
  if(this.firstElementChild) {
    this.firstElementChild.style.pointerEvents = 'none';
  }
  
  this.classList.add('over')
}

function dragLeave(e) {
  if(this.firstElementChild) {
    this.firstElementChild.style.pointerEvents = '';
  }
   this.classList.remove('over');          
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'all';
  return false;
}

function dragEnd(e,selector) {
  document.querySelectorAll(`${selector}`).forEach(item => {
    item.classList.remove('over');
    if(item.firstElementChild) {
      item.firstElementChild.style.pointerEvents = '';
    }  
  });
  e.style.opacity = ''

}

function editStart(textArea,item) { 
  textArea.classList.add('textarea')
  textArea.innerHTML = item.innerHTML;
  item.replaceWith(textArea);
}

function onBlur(textArea,item) {
    item.innerHTML = textArea.value;
    textArea.replaceWith(item);   
};

function confirmEdit(event) {
  if (event.key == 'Enter') {
    this.blur();
  }
}

function selectTextarea(textArea) {
  textArea.focus();
  textArea.setSelectionRange(textArea.value.length,textArea.value.length );
}

/// === /Functions === ///

if(localStorage.getItem('list')) {
  Store.DisplayList()
}



