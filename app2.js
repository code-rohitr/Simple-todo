// -------------variables------------- 



// the input section elements
const text_input = document.querySelector(".input-container > input")
const input_clear = document.querySelector(".input-clear")
const input_add = document.querySelector(".input-add")

// the section where the to-do sections will get added 
const todo_section = document.querySelector("#todo-section")



window.onload = () => {

    get_from_ls()
}




// -----Adding the clear input box feature-----

input_clear.addEventListener("click", () => {

    text_input.value = ""
})


// Adding the add todo function when preseed enter
text_input.addEventListener("keydown", (e)=>{
    if(e.key === "Enter")
    {
        add_todo()
    }
})


// ----Checking the input for no value----
input_add.addEventListener("click", ()=>{

    if(text_input.value === "")
    {
        text_input.classList.add("red-border")
    }
})
text_input.addEventListener("keyup", ()=>{
    if(text_input.value !== "")
    {
        text_input.classList.remove("red-border")
    }
})



// -----Add todo button-----

let id_counter = 0


input_add.addEventListener("click", add_todo)

function add_todo() {

    if(text_input.value === "") return

    // creating an object everytime the add buttons is clicked

    let myobj = {
        content: text_input.value,
        id: id_counter++,
        strike_status: false
    }



    // adding to the dom
    todo_section.innerHTML += `<div class="todo-container" id="${myobj.id}">
    <p class="todo-para">${myobj.content}</p>
    <span class="material-icons">done</span>
    <span class="material-icons">delete</span>
    </div>`

    // adding the current todo to the local storage
    add_to_ls(myobj)


    // checking if the todo container has no todos and removing the warning if todos are present
    if(todo_section.children.length > 0){
        document.querySelector(".no-todos").style.cssText = "display: none"
    }

    // clear input box
    text_input.value = ""
}

// Adding the todo input to the local storage

function add_to_ls(todo) {

    let todos
    // checking if the local storage is empty
    if (localStorage.getItem("todos") === null) {
        todos = []
    }
    // getting the local storage items in the array
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    // pushing the current todo to the array
    todos.push(todo)
    // pushing the updated array to the local storage
    localStorage.setItem("todos", JSON.stringify(todos))

}

// If no todos are present in the todo container


// --------Getting all the elements from the local storage and printing it top the dom--------


function get_from_ls() {

    let todos = JSON.parse(localStorage.getItem("todos"))

    //displaying the message if no todos are present in the container
    if(todos.length == 0){
       document.querySelector(".no-todos").style.cssText += "display: inherit; text-align: center"
    }
    else{
        document.querySelector(".no-todos").style.cssText += "display: none"
    }

    // adding the individual objects to the DOM
    todos.forEach(element => {

        let temp;

        todo_section.innerHTML += `<div class="todo-container ${element.strike_status == "true"?"done-animation" : ""}" id="${element.id}">
    <p class="todo-para ${element.strike_status == "true"?"strike" : ""}">${element.content}</p>
    <span class="material-icons">done</span>
    <span class="material-icons">delete</span>
    </div>`

        id_counter = element.id + 1
    });

    

}


// adding event listeners to the indiviual todo to implement the done and delete feature
todo_section.addEventListener("click", (e) => {
    
    // Event listener for the trash button
    if (e.target.textContent === "delete") {

        e.target.parentElement.classList.add("delete-animation")

        // calling the delete function after 400ms to allow the animation to be visible
        setTimeout(() => {
            
            del_todo(e.target.parentElement)
        }, 400);
    }

    // Event listener for the done button
    else if (e.target.textContent === "done") {
        // e.target.parentElement.classList.toggle("done-animation")
        done_todo(e.target.parentElement)
    }
})


// ----Deleting items from local storage and DOM----

function del_todo(parentElement) {

    // console.log(parentElement.id);

    let todos = JSON.parse(localStorage.getItem("todos"))


    for (let index = 0; index < todos.length; index++) {

        if (todos[index].id == parentElement.id) {
            todos.splice(index, 1)
        }

    }

    localStorage.setItem("todos", JSON.stringify(todos))


    // removing from dom
    parentElement.remove()

}


// adding the strike thorugh feature

function done_todo(parentElement) {

    // making the strike animation changes in DOM
    if (parentElement.children[0].classList.contains("strike")) {
        parentElement.children[0].classList.remove("strike")
    }
    else {
        parentElement.children[0].classList.add("strike")
    }

    // making the change scale animation in DOM
    if (parentElement.classList.contains("done-animation")) {
        parentElement.classList.remove("done-animation")
    }
    else {
        parentElement.classList.add("done-animation")
    }


    let todos = JSON.parse(localStorage.getItem("todos"))
    for (let index = 0; index < todos.length; index++) {
        if (todos[index].id == parentElement.id) {

            // adding the strike_status value to the local storage
            if(parentElement.children[0].classList.contains("strike"))
            {
                todos[index].strike_status = "true"
            }
            else{
                todos[index].strike_status = "false"
            }


        }

    }

    localStorage.setItem("todos", JSON.stringify(todos))

    
}



