const apiUrl = "https://localhost:7101/api/Todo";
document.getElementById("createForm").addEventListener("submit",async e=>{
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const isDone = document.getElementById("isDone").checked;
    if(!title) return alert("Title is not empty ! ");
    try {
        await fetch(apiUrl , {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({title,isDone})
        });
        window.location.href = "demo.html";
    } catch (error) {
        console.error("Loi khi khoi tao todo : " , error);
        alert("Tao Todo that bai !");
    }
});
