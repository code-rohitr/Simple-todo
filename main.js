

// variables 

// the input section elements
const text_input = document.querySelector(".input-container > input")
const input_clear = document.querySelector(".input-container > span")
const input_add = document.querySelector(".input-container > button")

// the section where the to-do sections will get added 
const todo_section = document.querySelector("#todo-section")

// console.log(todo_section);
// console.log(text_input);
// console.log(input_clear);
// console.log(input_add);


// On page load
window.onload = ()=>{
    text_input.focus()
}

// -------------Adding the clear input feature-------------

input_clear.addEventListener("click", () => {

    text_input.value = ""
})


input_add.addEventListener("click", add_todo_container)

function add_todo_container() {

    // checking if the text input is empty
    // adding the animate border class if the text input is empty
    if(text_input.value ==="")
    {
        text_input.classList.add("animate-border")
    }
    
    else{   
        // removing the animate boder class from the input field
        text_input.classList.remove("animate-border")

        todo_section.innerHTML += `<div class="todo-container">
        <p class="todo-para">${text_input.value.trim()}</p>
        <span class="material-icons done">done</span>
        <span class="material-icons delete">delete</span>
        </div>`
    }

    // clearing the input field
    text_input.value = ""

}


// ----Adding the To-Do when the enter key is pressed

text_input.addEventListener("keydown", (e)=>{

    if(e.key === "Enter"){

        add_todo_container()
    }
})


// removing the animate border class when any input is given
// a check will be made for the input everytime a key is pressed
text_input.addEventListener("keyup", ()=>{

    text_input.classList.remove("animate-border")

})


// ----Implementing the strike through and the remove to-do feature----


todo_section.addEventListener("click", e=>{

    if(e.target.innerHTML === "done"){
        e.target.previousElementSibling.classList.toggle("strike")
    }

    if(e.target.innerHTML === "delete"){
        e.target.parentElement.remove()
    }
})

