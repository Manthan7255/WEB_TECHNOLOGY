function toste() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

 
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);

    if (name === "" || email === "" || phone === "") {
        alert("⚠️ Please fill all fields!");
        return;
    }

    if(alert("Submitted your form!")){
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
    }
    

}