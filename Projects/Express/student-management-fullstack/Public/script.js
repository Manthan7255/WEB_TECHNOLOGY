const API_URL = 'http://localhost:3000/api/students';

// Load students from server
window.onload = function() {
    loadStudents();
};

async function loadStudents() {
    try {
        const response = await fetch(API_URL);
        const students = await response.json();
        displayStudents(students);
    } catch (error) {
        console.error('Error:', error);
        alert('Server not running! Start it with: node server.js');
    }
}

function displayStudents(students) {
    var tableBody = document.getElementById("tableBody");
    var noData = document.getElementById("noData");
    
    tableBody.innerHTML = "";
    
    if (students.length === 0) {
        noData.style.display = "block";
        noData.textContent = "No students found.";
        return;
    } else {
        noData.style.display = "none";
    }
    
    for (var i = 0; i < students.length; i++) {
        var student = students[i];
        var row = document.createElement("tr");
        
        row.innerHTML = 
            "<td>" + student.name + "</td>" +
            "<td>" + student.rollNumber + "</td>" +
            "<td>" + student.marks + "</td>" +
            "<td>" +
                "<button class='edit-btn' onclick='editStudent(" + student.id + ")'>Edit</button>" +
                "<button class='delete-btn' onclick='deleteStudent(" + student.id + ")'>Delete</button>" +
            "</td>";
        
        tableBody.appendChild(row);
    }
}

// Add or Update student
document.getElementById("studentForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    var name = document.getElementById("name").value.trim();
    var rollNumber = document.getElementById("rollNumber").value.trim();
    var marks = document.getElementById("marks").value.trim();
    var editId = document.getElementById("editId").value;
    
    if (name === "" || rollNumber === "" || marks === "") {
        alert("Please fill all fields!");
        return;
    }
    
    try {
        if (editId === "") {
            // ADD
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, rollNumber, marks })
            });
            alert("Student added!");
        } else {
            // UPDATE
            await fetch(API_URL + '/' + editId, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, rollNumber, marks })
            });
            alert("Student updated!");
        }
        
        clearForm();
        loadStudents();
        
    } catch (error) {
        alert('Failed to connect to server');
    }
});

async function editStudent(id) {
    const response = await fetch(API_URL + '/' + id);
    const student = await response.json();
    
    document.getElementById("name").value = student.name;
    document.getElementById("rollNumber").value = student.rollNumber;
    document.getElementById("marks").value = student.marks;
    document.getElementById("editId").value = student.id;
    
    document.getElementById("submitBtn").textContent = "Update Student";
    document.getElementById("cancelBtn").style.display = "inline-block";
}

async function deleteStudent(id) {
    if (!confirm("Are you sure?")) return;
    
    await fetch(API_URL + '/' + id, { method: 'DELETE' });
    alert("Student deleted!");
    loadStudents();
}

async function searchStudent() {
    var searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
    
    if (searchTerm === "") {
        loadStudents();
        return;
    }
    
    const response = await fetch(API_URL);
    const students = await response.json();
    
    var filtered = [];
    for (var i = 0; i < students.length; i++) {
        if (students[i].name.toLowerCase().indexOf(searchTerm) !== -1) {
            filtered.push(students[i]);
        }
    }
    
    displayStudents(filtered);
    
    if (filtered.length === 0) {
        document.getElementById("noData").style.display = "block";
        document.getElementById("noData").textContent = "No student found with '" + searchTerm + "'";
    }
}

function displayAllStudents() {
    document.getElementById("searchInput").value = "";
    loadStudents();
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("rollNumber").value = "";
    document.getElementById("marks").value = "";
    document.getElementById("editId").value = "";
    document.getElementById("submitBtn").textContent = "Add Student";
    document.getElementById("cancelBtn").style.display = "none";
}

document.getElementById("cancelBtn").addEventListener("click", clearForm);