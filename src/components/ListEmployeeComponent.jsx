import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
    this.addEmployee = this.addEmployee.bind(this); // CreateEmployeeComponent
    this.editEmployee = this.editEmployee.bind(this); // EditEmployeeComponent
  }

  // Called immediately after a component is mounted.
  // So this is the best place to call the rest api.
  componentDidMount() {
    EmployeeService.getEmployees().then((res) => {
      this.setState({ employees: res.data });
    });
  }

  // CreateEmployeeComponent
  addEmployee() {
    this.props.history.push("/add-employee/-1"); // For Create & Update Employee with single React Component
  }

  // UpdateEmployeeComponent
  editEmployee(id) {
    this.props.history.push(`/add-employee/${id}`); // For Create & Update Employee with single React Component
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Employees List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addEmployee}>
            {" "}
            Add New Employee
          </button>
        </div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Action Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.emailId}</td>
                  <td>
                    <button
                      onClick={() => this.editEmployee(employee.id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListEmployeeComponent;
