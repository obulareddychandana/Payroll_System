import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api/employeeApi";

export default function EmployeeList({ onEdit }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const res = await getEmployees();
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔍 filter employees
  const filtered = data.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card">
      <h3>Employee List</h3>

      {/* 🔍 Search */}
      <input
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
      />

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.designation}</td>
              <td>{emp.basic_salary}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => onEdit(emp)}
                >
                  Edit
                </button>

                <button
                  className="btn-delete"
                  onClick={() => deleteEmployee(emp.id).then(fetchData)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}