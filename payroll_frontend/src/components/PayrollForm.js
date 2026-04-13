import { useEffect, useState } from "react";
import { getEmployees } from "../api/employeeApi";
import { addPayroll } from "../api/payrollApi";

export default function PayrollForm() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee: "",
    month: "",
    year: "",
    total_working_days: "",
    present_days: "",
    basic_salary: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    getEmployees().then((res) => setEmployees(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // validation
    if (
      !form.employee ||
      !form.month ||
      !form.year ||
      !form.total_working_days ||
      !form.present_days ||
      !form.basic_salary
    ) {
      setError("All fields are required");
      return;
    }

    try {
      const data = {
        employee: Number(form.employee), // IMPORTANT
        month: form.month,
        year: Number(form.year),
        total_working_days: Number(form.total_working_days),
        present_days: Number(form.present_days),
        basic_salary: Number(form.basic_salary),
      };

      await addPayroll(data);

      // reset
      setForm({
        employee: "",
        month: "",
        year: "",
        total_working_days: "",
        present_days: "",
        basic_salary: "",
      });

      alert("Payroll generated successfully ✅");
    } catch (err) {
      console.log(err.response?.data);

      if (err.response?.data) {
        const errors = err.response.data;
        let msg = "";

        for (let key in errors) {
          msg += `${key}: ${errors[key]}\n`;
        }

        setError(msg);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="card">
      <h3>Create Payroll</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="form" onSubmit={handleSubmit}>
        {/* Employee Dropdown */}
        <select
          name="employee"
          value={form.employee}
          onChange={handleChange}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>

        <input
          name="month"
          placeholder="Month"
          value={form.month}
          onChange={handleChange}
        />

        <input
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
        />

        <input
          name="total_working_days"
          placeholder="Working Days"
          value={form.total_working_days}
          onChange={handleChange}
        />

        <input
          name="present_days"
          placeholder="Present Days"
          value={form.present_days}
          onChange={handleChange}
        />

        <input
          name="basic_salary"
          placeholder="Basic Salary"
          value={form.basic_salary}
          onChange={handleChange}
        />

        <button className="btn btn-primary">
          Generate Payroll
        </button>
      </form>
    </div>
  );
}