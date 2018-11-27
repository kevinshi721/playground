export default class ToDoItem {
  constructor(status, data, method) {
    this.status = status;
    this.id = data.id;
    this.value = data.value;
    this.author = data.author;
    this.dueDate = data.dueDate;
    this.editItem = method.editItem;
    this.completeItem = method.completeItem;
    this.incompleteItem = method.incompleteItem;
    this.deleteItem = method.deleteItem;
  }

  create() {
    let id = this.id;
    let status = this.status;
    let value = this.value;
    let author = this.author;
    let dueDate = this.dueDate;

    let para = document.createElement("p");
    para.id = id;
    para.className = status;

    let editBtn = document.createElement("img");
    editBtn.className = "edit-btn";
    editBtn.src = "assest/svg/edit.svg";
    editBtn.alt = "edit icon";
    editBtn.addEventListener('click', this.editItem);
    para.appendChild(editBtn);

    let valueLabel = document.createElement("label");
    valueLabel.innerHTML = value;
    if (status === "incomplete") {
      valueLabel.className = "incomplete-label";
    } else if (status === "complete") {
      valueLabel.className = "complete-label";
    }
    para.appendChild(valueLabel);

    let editValue = document.createElement("input");
    editValue.value = value;
    editValue.className = "edit-value";
    para.appendChild(editValue);

    let authorLabel = document.createElement("label");
    authorLabel.innerHTML = author;
    authorLabel.className = "author-label";
    para.appendChild(authorLabel);

    let editAuthor = document.createElement("input");
    editAuthor.value = author;
    editAuthor.className = "edit-author";
    para.appendChild(editAuthor);

    let dueDateLabel = document.createElement("label");
    dueDateLabel.innerHTML = dueDate;
    dueDateLabel.className = "due-date-label";
    para.appendChild(dueDateLabel);

    let editDueDate = document.createElement("input");
    editDueDate.setAttribute("type", "date");
    let date = new Date(dueDate);
    editDueDate.value = date.toISOString().substring(0, 10);
    editDueDate.className = "edit-due-date";
    para.appendChild(editDueDate);

    let actBtn = document.createElement("button");
    if (status === "incomplete") {
      actBtn.className = "complete-btn";
      actBtn.innerHTML = "complete";
      actBtn.addEventListener('click', this.completeItem);
    } else if (status === "complete") {
      actBtn.className = "incomplete-btn";
      actBtn.innerHTML = "incomplete";
      actBtn.addEventListener('click', this.incompleteItem);
    }
    para.appendChild(actBtn);

    let delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.innerHTML = "delete";
    delBtn.addEventListener('click', this.deleteItem);
    para.appendChild(delBtn);

    return para;
  }
}