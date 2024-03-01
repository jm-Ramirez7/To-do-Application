const form = document.getElementById('form');
const textInput = document.getElementById('textInput');
const dateInput = document.getElementById('dateInput');
const textarea = document.getElementById('textarea');
const errorMsg = document.getElementById('errorMsg');
const task = document.getElementById('task');
const add = document.getElementById('add');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formValidation();
});

const formValidation = () => {
  if(textInput.value === ""){
    console.log("failed")
    errorMsg.innerHTML = "Task can't be blank"
  }
  else{
    console.log("success")
    errorMsg.innerHTML =""
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal")
    add.click();

    (()=>{
      add.setAttribute("data-bs-dismiss", "")
    })()
  }
}

let data = [];

const acceptData = () => {
  data.push({
  text: textInput.value,
  date: dateInput.value,
  description: textarea.value,
  });

  localStorage.setItem("task", JSON.stringify(data));
  
  createTasks();
}

const createTasks = () => {
  task.innerHTML =""
  data.map((x,y) =>{
    return (
      task.innerHTML += `
  <div id=${y}>
        <span class="fw-bold">${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.description}</p>
        <span class="options">
          <i onclick ="editForm(this)"  data-bs-toggle="modal" data-bs-target="#form" class="fa-regular fa-pen-to-square"></i>
          <i onClick="deleteIcon(this);createTasks()" class="fa-solid fa-trash"></i>
        </span>
      </div>
  `);
  })
  resetForm();
}

const deleteIcon = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1)
  localStorage.setItem("task", JSON.stringify(data));
  console.log(data);
}

const editForm = (e) => {
  const selectTask = e.parentElement.parentElement;

  textInput.value = selectTask.children[0].innerHTML;
  dateInput.value = selectTask.children[1].innerHTML;
  textarea.value = selectTask.children[2].innerHTML;

  deleteIcon(e);
}



const resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
}

(() =>{
  data = JSON.parse(localStorage.getItem("task")) || [];
  createTasks();
  console.log(data);
})();