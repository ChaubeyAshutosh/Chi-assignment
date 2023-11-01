let employees = [];

document.getElementById('toggleButton').addEventListener('click', function() {
  const formDiv = document.getElementById('addEmployeeFormDiv');
  const tableDiv = document.getElementById('employeeTableDiv');
  if (formDiv.style.display === 'none') {
    formDiv.style.display = 'block';
    tableDiv.style.display = 'none';
    this.textContent = 'View Employees';
  } else {
    formDiv.style.display = 'none';
    tableDiv.style.display = 'block';
    this.textContent = 'Add Employee';
  }
});

document.getElementById('addEmployeeForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const id = document.getElementById('id').value;
  const lastName = document.getElementById('lastName').value;
  const firstName = document.getElementById('firstName').value;
  const age = document.getElementById('age').value;
  const department = document.getElementById('department').value;
  if (!addEmployee(id, lastName, firstName, age, department)) {
    alert('Employee ID already exists!');
  } else {
    // Hide the add employee form and show the employee list
    document.getElementById('addEmployeeFormDiv').style.display = 'none';
    document.getElementById('employeeTableDiv').style.display = 'block';
    document.getElementById('toggleButton').textContent = 'Add Employee';
    displayEmployees();
    // Clear the form fields
    document.getElementById('id').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('age').value = '';
    document.getElementById('department').value = 'IT';
  } 
});

function addEmployee(id, lastName, firstName, age, department) {
  if (employees.some(employee => employee.id === id)) {
    return false;
  }
  const employee = { id, lastName, firstName, age, department };
  employees.push(employee);
  return true;
}

function removeEmployee(id) {
  if (confirm('Are you sure you want to remove this employee?')) {
    employees = employees.filter(employee => employee.id !== id);
    displayEmployees();
  }
}

function displayEmployees() {
  const table = document.getElementById('employeeTable');
  table.innerHTML = '<tr><th>Employee ID</th><th>Last Name</th><th>First Name</th><th>Age</th><th>Department</th><th>Action</th></tr>';
  for (const employee of employees) {
    const row = `<tr><td>${employee.id}</td><td>${employee.lastName}</td><td>${employee.firstName}</td><td>${employee.age}</td><td>${employee.department}</td><td><button onclick="removeEmployee('${employee.id}')">Remove Now</button></td></tr>`;
    table.innerHTML += row;
  }
}