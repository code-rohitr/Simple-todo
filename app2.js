// -------------variables------------- 

// the input section elements
const text_input = document.querySelector(".input-container > input")
const input_clear = document.querySelector(".input-container > span")
const input_add = document.querySelector(".input-container > button")

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



// -----Add todo button-----

let id_counter = 0

input_add.addEventListener("click", add_todo)

function add_todo(content, id) {

    // creating an object everytime the add buttons is clicked

    let myobj = {
        content: text_input.value,
        id: id_counter++,
        strike_status: false,
        // done_anim_status: false
    }



    // adding to the dom
    todo_section.innerHTML += `<div class="todo-container" id="${myobj.id}">
    <p class="todo-para">${myobj.content}</p>
    <span class="material-icons">done</span>
    <span class="material-icons">delete</span>
    </div>`

    // adding the current todo to the local storage
    add_to_ls(myobj)



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



// --------Getting all the elements from the local storage and printing it top the dom--------


function get_from_ls() {

    let todos = JSON.parse(localStorage.getItem("todos"))
    todos.forEach(element => {

        let temp;
        // if(element.strike_status == "true"){
        //     temp = "strike"
        // } else{
        //     temp = ""
        // }


        todo_section.innerHTML += `<div class="todo-container" id="${element.id}">
    <p class="todo-para ${element.strike_status == "true"?"strike" : ""}">${element.content}</p>
    <span class="material-icons">done</span>
    <span class="material-icons">delete</span>
    </div>`

        id_counter = element.id + 1
    });


}

// Event listener for the trash button
todo_section.addEventListener("click", (e) => {

    if (e.target.textContent === "delete") {

        e.target.parentElement.classList.add("delete-animation")
        setTimeout(() => {
            
            del_todo(e.target.parentElement)
        }, 400);
    }

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
        // console.log(todos[index].id);

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


    let todos = JSON.parse(localStorage.getItem("todos"))
    for (let index = 0; index < todos.length; index++) {
        if (todos[index].id == parentElement.id) {
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

    parentElement.classList.toggle("done-animations")
}