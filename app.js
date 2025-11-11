const apiUrl = "https://localhost:7101/api/Todo";


const createRow = todo => `
    <tr>
        <td>${todo.id}</td>
        <td>${todo.title}</td>
        <td>${todo.isDone ? "✅" : "❌"}</td>
        <td>
            <button class="btn btn-danger" onclick="deleteTodo(${todo.id})">Xóa</button>
            <button class="btn btn-secondary" onclick="Update(${todo.id})">Sửa</button>
        </td>
    </tr>
`;


const loadTodos = async () => {
    try {
        const res = await fetch(apiUrl);
        const todos = await res.json();

        document.getElementById("todoTableBody").innerHTML =
            todos.map(createRow).join(""); 
    } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
    }
};


const deleteTodo = async id => {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    loadTodos();
};


const updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
const Update = async id =>{
    try {
        const res = await fetch(`${apiUrl}/${id}`);
        const todo = await res.json();

        document.getElementById("updateId").value = todo.id;
        document.getElementById("updateTitle").value = todo.title;
        document.getElementById("updateIsDone").checked  = todo.isDone;

        updateModal.show();

    } catch (error) {
        console.error("Lỗi khi load todo:", error);
    }
}
document.getElementById("updateForm").addEventListener("submit" , async e =>{
    e.preventDefault();
    const id = document.getElementById("updateId").value;
    const title = document.getElementById("updateTitle").value.trim();
    const isDone = document.getElementById("updateIsDone").checked;
    if(!title) return alert("Tieu de khong duoc de rong ! ");
    try {
        await fetch(`${apiUrl}/${id}` , {
            method : "PUT",
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify({title , isDone})
        });
        updateModal.hide();
        loadTodos();
    } catch (error) {
        console.error("Lỗi khi cập nhật todo:", error);
        alert("Cập nhật thất bại!");
    }
});

loadTodos();
