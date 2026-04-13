import { useEffect, useState } from "react";
import { getPayroll } from "../api/payrollApi";
import { getEmployees } from "../api/employeeApi";

export default function PayrollList() {
  const [payroll, setPayroll] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getPayroll().then((res) => setPayroll(res.data));
    getEmployees().then((res) => setEmployees(res.data));
  }, []);

  // 🔹 Get employee name from ID
  const getEmployeeName = (id) => {
    const emp = employees.find((e) => e.id === id);
    return emp ? emp.name : "Unknown";
  };

  // 🔹 Convert month name → number
  const getMonthNumber = (month) => {
    const months = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };

    return months[month] || month; // fallback
  };

  return (
    <div className="card">
      <h3>Payroll Records</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Month</th>
            <th>Net Salary</th>
          </tr>
        </thead>

        <tbody>
          {payroll.map((p) => (
            <tr key={p.id}>
              <td>{getEmployeeName(p.employee)}</td>
              <td>{getMonthNumber(p.month)}</td>
              <td>{p.net_salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}