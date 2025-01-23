// src/localStorageUtils.jsx

export const getEmployeesFromLocalStorage = () => {
  const employees = localStorage.getItem('employees');
  return employees ? JSON.parse(employees) : [];
};

export const setEmployeesToLocalStorage = (employees) => {
  localStorage.setItem('employees', JSON.stringify(employees));
};

export const addEmployeeToLocalStorage = (employee) => {
  const employees = getEmployeesFromLocalStorage();
  employees.push(employee);
  setEmployeesToLocalStorage(employees);
};

export const deleteEmployeeFromLocalStorage = (employeeId) => {
  const employees = getEmployeesFromLocalStorage();
  const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
  setEmployeesToLocalStorage(updatedEmployees);
};

export const updateEmployeeInLocalStorage = (employeeId, updatedData) => {
  const employees = getEmployeesFromLocalStorage();
  const updatedEmployees = employees.map(employee =>
    employee.id === employeeId ? { ...employee, ...updatedData } : employee
  );
  setEmployeesToLocalStorage(updatedEmployees);
};
