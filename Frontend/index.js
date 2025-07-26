  const url="http://localhost:3000/todos";
document.addEventListener("DOMContentLoaded",()=>{
loadTodos();
const addbtn=document.getElementById("button_1");
addbtn.addEventListener("click",addTodos);
})
function loadTodos() {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("todoList");
        list.innerHTML = ""; // ✅ Clear previous content

        data.forEach(todo => {
            const div = document.createElement("div");
            const editbtn = document.createElement("button");
            const deletebtn=document.createElement("button");
            deletebtn.innerText="Delete";
            deletebtn.addEventListener("click",()=>Delete(todo._id));
            editbtn.innerText = "Edit";
            editbtn.addEventListener("click", () => Edit(todo._id, todo.title));
            div.innerText = todo.title;
            list.appendChild(div);
            div.appendChild(editbtn);
            div.appendChild(deletebtn);
        });
    });
}

function addTodos(){
    const input=document.getElementById("todoInput");
    const text=input.value;
    fetch(url,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({title:text})
    })
    .then(res => res.json())
.then(data => {
    if (data.success) {
        input.value = "";
        loadTodos();
    } else {
        alert("Failed to add todo.");
    }
});
}
function Edit(id, currentTitle) {
    const newTitle = prompt("Edit your todo:", currentTitle);
    if (!newTitle) return;

    fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle })
    })
    .then(res => res.json())
    .then(() => loadTodos());
}
function Delete(id){
fetch(`http://localhost:3000/todos/${id}`,{
    method:"DELETE"
}).then(res=>res.json())
.then(data=>{
    if(data.success){
        loadTodos();
    }
})
}
