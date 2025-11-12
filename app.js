const apiUrl = "https://localhost:7101/api/Todo";


const createRow = todo => `
    <tr>
        <td>${todo.id}</td>
        <td>${todo.title}</td>
        <td>${todo.isDone ? "Hoàn Thành" : "Chưa Hoàn Thành"}</td>
        <td>
            <button class="btn btn-danger" onclick="deleteTodo(${todo.id})">Xóa</button>
            <button class="btn btn-secondary" onclick="Update(${todo.id})">Sửa</button>
        </td>
    </tr>
`;


const loadTodos = async () => {
    try {
       const res = await axios.get(apiUrl);

        document.getElementById("todoTableBody").innerHTML =
            res.data.map(createRow).join(""); 
    } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
    }
};


const deleteTodo = async id => {
    await axios.delete(`${apiUrl}/${id}`);
    loadTodos();
};


const updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
const Update = async id =>{
    try {
        const res = await axios.get(`${apiUrl}/${id}`);
        const todo = res.data;

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
    const updatedata = {
        title : document.getElementById("updateTitle").value.trim(),
        isDone : document.getElementById("updateIsDone").checked
    }
   
    if(!updatedata.title) return alert("Tieu de khong duoc de rong ! ");
    try {
        await axios.put(`${apiUrl}/${id}`, updatedata);
        updateModal.hide();
        loadTodos();
    } catch (error) {
        console.error("Lỗi khi cập nhật todo:", error);
        alert("Cập nhật thất bại!");
    }
});

loadTodos();
