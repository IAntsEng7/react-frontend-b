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
    this.deleteEmployee = this.deleteEmployee.bind(this); // DeleteEmployeeComponent
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
    this.props.history.push("/add-employee/_add"); // For Create & Update Employee with single React Component
  }

  // UpdateEmployeeComponent
  editEmployee(id) {
    this.props.history.push(`/add-employee/${id}`); // For Create & Update Employee with single React Component
  }

  // DeleteEmployeeComponent
  deleteEmployee(id) {
    // rest api call
    EmployeeService.deleteEmployee(id).then((res) => {
      this.setState({
        employees: this.state.employees.filter(
          (employee) => employee.id !== id
        ),
      });
    });
  }

  // ViewEmployeeComponent
  viewEmployee(id) {
    this.props.history.push(`/view-employee/${id}`);
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
                    <button
                      // 按鈕的CSS，如果沒有 marginLeft，兩個按鈕會黏在一起。
                      style={{ marginLeft: "9px" }}
                      onClick={() => this.deleteEmployee(employee.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      // 按鈕的CSS，如果沒有 marginLeft，兩個按鈕會黏在一起。
                      style={{ marginLeft: "9px" }}
                      onClick={() => this.viewEmployee(employee.id)}
                      className="btn btn-info"
                    >
                      View
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
