import ToDoItem from "./class/ToDoItem.js";
import Stack from "./class/Stack.js";

let id = 0;
const redoStack = [];
const undoStack = [];
const stackStatus = ['complete', 'incomplete'];

var init = () => {
  let addBtn = document.querySelector(".add-btn");
  addBtn.addEventListener('click', addItem);

  let dateInput = document.querySelector("#date-box");
  dateInput.value = new Date().toISOString().substring(0, 10);

  document.addEventListener('keyup', (event) => {
    if (event.ctrlKey && event.keyCode === 90) undo()
  });
  document.addEventListener('keyup', (event) => {
    if (event.ctrlKey && event.keyCode === 89) redo()
  });

  getUserData();
}

var getUserData = () => {
  let xhr = new XMLHttpRequest();
  let method = 'GET';
  let url = 'src/json/data.json';
  xhr.open(method, url, true);
  xhr.responseType = 'json';
  xhr.onload = () => {
    if (xhr.status == 200) {
      let data = xhr.response;
      renderGetData(data);
    }
  }
  xhr.send();
}

var renderGetData = (data) => {
  let user = document.querySelector("#username");
  user.innerHTML = data.username;

  if (data.toDoItem.length > 0) {
    for (let item of data.toDoItem) {
      if (item.status === "incomplete") {
        let toDoDiv = document.querySelector("#incomplete-div");
        toDoDiv.appendChild(createItem("incomplete", item));
      } else {
        let completeDiv = document.querySelector("#complete-div")
        completeDiv.appendChild(createItem("complete", item));
      }
    }
  } else {
    alert("No todo items in fetched data")
  }
}

var addItem = () => {
  let input = getInput();
  let data = {
    id: id,
    status: "incomplete",
    value: input.value,
    author: input.author,
    dueDate: input.dueDate
  };

  if (data.value && data.author) {
    let toDoDiv = document.querySelector("#incomplete-div");
    toDoDiv.appendChild(createItem("incomplete", data));
    addUndoStack("add", data);
    console.log(undoStack);
    id++;
    clearInput();
  } else {
    alert("Either author or todo item cannot be empty");
  }
}

var getInput = () => {
  let input = {};
  input.value = document.querySelector("#input-box").value;
  input.author = document.querySelector("#author-box").value;
  input.dueDate = dateConvert(document.querySelector("#date-box").value);
  return input;
}

var dateConvert = (date) => {
  var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
  return date.replace(pattern, '$2-$3-$1');
}

var clearInput = () => {
  let inputBox = document.querySelector("#input-box");
  let inputAuthor = document.querySelector("#author-box");
  let inputDate = document.querySelector("#date-box");
  inputBox.value = "";
  inputAuthor.value = "";
  inputDate.value = new Date().toISOString().substring(0, 10);
};

var completeItem = (event) => {
  let data = removeItem(event);
  let completeDiv = document.querySelector("#complete-div")
  completeDiv.appendChild(createItem("complete", data));
  addUndoStack("complete", data);
}

var incompleteItem = (event) => {
  let data = removeItem(event);
  let completeDiv = document.querySelector("#incomplete-div")
  completeDiv.appendChild(createItem("incomplete", data, ));
  addUndoStack("incomplete", data);
}

var editItem = (event) => {
  let parentNode = event.target.parentNode;
  let valueLabel = parentNode.querySelector(".incomplete-label") ? parentNode.querySelector(".incomplete-label") : parentNode.querySelector(".complete-label");
  let editValue = parentNode.querySelector(".edit-value");
  let authorLabel = parentNode.querySelector(".author-label");
  let editAuthor = parentNode.querySelector(".edit-author");
  let dueDateLabel = parentNode.querySelector(".due-date-label");
  let editDueDate = parentNode.querySelector(".edit-due-date");

  if (parentNode.classList.contains("edit-mode")) {
    valueLabel.innerText = editValue.value;
    authorLabel.innerText = editAuthor.value;
    dueDateLabel.innerText = dateConvert(editDueDate.value);
  }

  parentNode.classList.toggle("edit-mode");
}

var deleteItem = (event) => {
  let data = removeItem(event);
  addUndoStack("delete", data);
}

var createItem = (status, data) => {
  let toDoItem = new ToDoItem(status, data, method);
  let newItem = toDoItem.create();
  return newItem;
}

var removeItem = (event) => {
  let parentNode = event.target.parentNode;
  let data = {
    id: parentNode.id,
    status: parentNode.className,
    value: parentNode.childNodes[1].innerText,
    author: parentNode.childNodes[3].innerText,
    dueDate: parentNode.childNodes[5].innerText,
  };
  parentNode.remove();
  return data;
}

var addUndoStack = (action, data) => {
  let stack = new Stack(action, data);
  undoStack.push(stack);
}

var addRedoStack = (action, data) => {
  let stack = new Stack(action, data);
  redoStack.push(stack);
}

var undo = () => {
  if (undoStack.length) {
    const stack = undoStack.pop();
    const newStack = statusSwitch(stack);
    switch (stack.action) {
      case "add":
        addRedoStack("delete", newStack);
        searchParent("incomplete-div", stack).remove();
        break;
      case "complete":
        addRedoStack("incomplete", newStack);
        searchParent("complete-div", stack).remove();
        addBackItem(stack);
        break;
      case "incomplete":
        addRedoStack("complete", newStack);
        searchParent("incomplete-div", stack).remove();
        addBackItem(stack);
        break;
      case "delete":
        addRedoStack("add", newStack);
        addBackItem(stack);
        break;
      default:
        alert('no matched action');
    }
  } else {
    alert("no undo stack");
  }
}

var redo = () => {
  if (redoStack.length) {
    let stack = redoStack.pop();
    const newStack = statusSwitch(stack);
    switch (stack.action) {
      case "add":
        addUndoStack("delete", newStack);
        searchParent(`${newStack.status}-div`, newStack).remove();
        break;
      case "complete":
        addUndoStack("incomplete", newStack);
        searchParent("complete-div", stack).remove();
        addBackItem(stack);
        break;
      case "incomplete":
        addUndoStack("complete", newStack);
        searchParent("incomplete-div", stack).remove();
        addBackItem(stack);
        break;
      case "delete":
        addUndoStack("add", newStack);
        addBackItem(newStack);
        break;
      default:
        alert('no matched action');
    }
  } else {
    alert("no redo stack");
  }
}

var searchParent = (section, stack) => {
  let targetGrand = document.getElementById(section);
  let parentNodesArr = targetGrand.childNodes;
  for (let parent of parentNodesArr) {
    if (parseInt(parent.id) === parseInt(stack.id)) {
      return parent;
    }
  }
}

var statusSwitch = (stack) => {
  const stackTemp = Object.create(stack);
  if (stackTemp.status === stackStatus[0]) {
    stackTemp.status = stackStatus[1];
  } else {
    stackTemp.status = stackStatus[0];
  }
  return stackTemp;
}

var addBackItem = (stack) => {
  let section = document.getElementById(`${stack.status}-div`)
  section.appendChild(createItem(stack.status, stack));
}

var method = {
  completeItem: completeItem,
  incompleteItem: incompleteItem,
  deleteItem: deleteItem,
  editItem: editItem
}

init();