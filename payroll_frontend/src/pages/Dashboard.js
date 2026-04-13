import { useEffect, useState } from "react";
import { getEmployees } from "../api/employeeApi";
import { getPayroll } from "../api/payrollApi";

export default function Dashboard() {
  const [empCount, setEmpCount] = useState(0);
  const [payrollCount, setPayrollCount] = useState(0);

  useEffect(() => {
    getEmployees().then(res => setEmpCount(res.data.length));
    getPayroll().then(res => setPayrollCount(res.data.length));
  }, []);

  return (
    <div className="container">
      <div className="dashboard">
        <div className="card-box blue">
          <h3>Employees</h3>
          <h1>{empCount}</h1>
        </div>

        <div className="card-box green">
          <h3>Payroll Records</h3>
          <h1>{payrollCount}</h1>
        </div>

        <div className="card-box orange">
          <h3>Status</h3>
          <h1>Active</h1>
        </div>
      </div>
    </div>
  );
}