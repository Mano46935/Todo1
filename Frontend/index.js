document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.querySelector("#todoList");

    fetch("http://localhost:3000/todos")
        .then(res => res.json())
        .then(data => {
            console.log("Fetched data:", data); // <-- See if data is showing in console
            data.forEach(item => {
              const div = document.createElement("div");
    div.textContent =  (item); // fallback if .text is undefined
    todoList.appendChild(div);
            });
        })
        .catch(err => console.error("Error fetching todos:", err));
});
document.getElementById("button_1").addEventListener("click",async ()=>{
    const input=document.getElementById("todoInput");
    const title=input.value.trim();
     if (!title) return alert("Please enter a task!");
    const result= await fetch("http://localhost:3000/todos",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({title})
    })
    const data=await result.json();
    if(data.success){
      const li = document.createElement("li");
  li.textContent = title; 
  document.getElementById("todoList").appendChild(li)
    }
    else{
         alert("Failed to add task");
    }
  

})
