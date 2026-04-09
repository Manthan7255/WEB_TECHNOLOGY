var students = [];

window.onload = function() {
    loadStudents();
    displayAllStudents();
};

function loadStudents() {
    var storedData = localStorage.getItem("students");
    
    if (storedData !== null) {
        students = JSON.parse(storedData);
    }
}

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

document.getElementById("studentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var name = document.getElementById("name").value.trim();
    var rollNumber = document.getElementById("rollNumber").value.trim();
    var marks = document.getElementById("marks").value.trim();
    var editId = document.getElementById("editId").value;
    
    if (name === "" || rollNumber === "" || marks === "") {
        alert("Please fill all fields!");
        return;
    }
    
    if (editId === "") {
        
        var student = {
            id: Date.now(),  
            name: name,
            rollNumber: rollNumber,
            marks: marks
        };
        
        students.push(student);
        alert("Student added successfully!");
    } else {
       
        for (var i = 0; i < students.length; i++) {
            if (students[i].id == editId) {
                students[i].name = name;
                students[i].rollNumber = rollNumber;
                students[i].marks = marks;
                break;
            }
        }
        alert("Student updated successfully!");
    }
    
    saveStudents();
    
    displayAllStudents();
    
    clearForm();
});

function displayAllStudents() {
    var tableBody = document.getElementById("tableBody");
    var noData = document.getElementById("noData");
    
    tableBody.innerHTML = "";
    
    if (students.length === 0) {
        noData.style.display = "block";
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

function editStudent(id) {
    for (var i = 0; i < students.length; i++) {
        if (students[i].id == id) {
            document.getElementById("name").value = students[i].name;
            document.getElementById("rollNumber").value = students[i].rollNumber;
            document.getElementById("marks").value = students[i].marks;
            document.getElementById("editId").value = students[i].id;
            
            document.getElementById("submitBtn").textContent = "Update Student";
            
            document.getElementById("cancelBtn").style.display = "inline-block";
            
            break;
        }
    }
}

function deleteStudent(id) {

    var confirmDelete = confirm("Are you sure you want to delete this student?");
    
    if (confirmDelete) {
        var newStudents = [];
        
        for (var i = 0; i < students.length; i++) {
            if (students[i].id != id) {
                newStudents.push(students[i]);
            }
        }
        
        students = newStudents;
        
        saveStudents();
        
        displayAllStudents();
        
        alert("Student deleted successfully!");
    }
}

function searchStudent() {
    var searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
    
    if (searchTerm === "") {
        displayAllStudents();
        return;
    }
    
    var tableBody = document.getElementById("tableBody");
    var noData = document.getElementById("noData");
    
    tableBody.innerHTML = "";
    
    var found = false;
    
    for (var i = 0; i < students.length; i++) {
        var student = students[i];
        
        if (student.name.toLowerCase().indexOf(searchTerm) !== -1) {
            found = true;
            
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
    
    if (found === false) {
        noData.style.display = "block";
        noData.textContent = "No student found with name containing '" + searchTerm + "'";
    } else {
        noData.style.display = "none";
    }
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("rollNumber").value = "";
    document.getElementById("marks").value = "";
    document.getElementById("editId").value = "";
    document.getElementById("submitBtn").textContent = "Add Student";
    document.getElementById("cancelBtn").style.display = "none";
}

document.getElementById("cancelBtn").addEventListener("click", function() {
    clearForm();
});