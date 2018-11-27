export default class Stack {
  constructor(action, data) {
    this.action = action;
    this.id = data.id;
    this.status = data.status;
    this.value = data.value;
    this.author = data.author;
    this.dueDate = data.dueDate;
  }
}