//Saved students Registration form 
let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

//Show students when page loads 
showStudentsData();

//Form submit event 
document.getElementById("StudentForm").addEventListener("submit",function(e){
    e.preventDefault();
    addStudent();
});

function addStudent(){

    let name = document.getElementById("student_name").value.trim();
    let id = document.getElementById("student_id").value.trim();
    let email = document.getElementById("student_email").value.trim();
    let contact = document.getElementById("student_contact").value.trim();

//Validation 
    if(name=="" || id=="" || email==""|| contact==""){
        alert("Please fill all the details");
        return;
    }

//Checking name length
    if(name.length < 3){
        alert("Name should conatin letters only and at least 3 characters");
        return;
    }

//Checking ID is in number or not 
    if(isNaN(id)){
        alert("Student ID must contain number only");
        return;
    }

//email validation
    if(!email.includes("@") || !email.includes(".")){
        alert("Enter correct email format");
        return;
    }

//Checking the length of contact
    if( contact.length < 10){
        alert("Contact must be 10 digits");
        return;
    }

    let studentData = {
        name: name,
        id: id,
        email: email,
        contact: contact
    };

    if(editIndex === null){
        students.push(studentData);
    } else {
        students[editIndex] = studentData;
        editIndex = null;
    }

    localStorage.setItem("students",JSON.stringify(students));

    document.getElementById("StudentForm").reset();
}

// Show student records in Table  
function showStudentsData(){
    let table = document.getElementById("StudentTable");
    table.innerHTML = "";

    students.forEach(function(s, index){
        table.innerHTML += ` 
        <tr>
          <td>${s.name}</td>
          <td>${s.id}</td>
          <td>${s.email}</td>
          <td>${s.contact}</td>
          <td>
             <button onclick="updateStudent(${index})">Edit</
button>
             <button onclick="deleteStudentData(${index})">Delete</
button>
          </td>
        </tr> `;
    });
}

// Delete student record
function deleteStudentData(index){
if(confirm("Are you sure that you want to delete this record?")){
    students.splice(index,1);
    localStorage.setItem("students",JSON.stringify(students));
    showStudentsData();
  }
}

//Update student filling
function updateStudent(index){
    let s = students[index];

    document.getElementById("student_name").value = s.name;
    document.getElementById("student_id").value = s.id;
    document.getElementById("student_email").value = s.email;
    document.getElementById("student_contact").value = s.contact;

    editIndex = index;
}