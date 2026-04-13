import { useEffect, useState } from "react";
import { addEmployee, updateEmployee } from "../api/employeeApi";

export default function EmployeeForm({ selected, refresh }) {
  const [form, setForm] = useState({
    emp_code: "",
    name: "",
    email: "",
    department: "",
    designation: "",
    join_date: "",
    basic_salary: "",
  });

  const [error, setError] = useState("");

  // 🔥 Handle Edit & Reset
  useEffect(() => {
    if (selected) {
      setForm(selected);
    } else {
      setForm({
        emp_code: "",
        name: "",
        email: "",
        department: "",
        designation: "",
        join_date: "",
        basic_salary: "",
      });
    }
  }, [selected]);

  // 🔹 Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Validation
    if (
      !form.emp_code ||
      !form.name ||
      !form.email ||
      !form.department ||
      !form.designation ||
      !form.join_date ||
      !form.basic_salary
    ) {
      setError("All fields are required");
      return;
    }

    try {
      const data = {
        ...form,
        basic_salary: Number(form.basic_salary), // 🔥 important fix
      };

      if (selected) {
        await updateEmployee(selected.id, data); // ✏️ Edit
      } else {
        await addEmployee(data); // ➕ Add
      }

      // ✅ Reset after submit
      setForm({
        emp_code: "",
        name: "",
        email: "",
        department: "",
        designation: "",
        join_date: "",
        basic_salary: "",
      });

      refresh();
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
      <h3>{selected ? "Edit Employee" : "Add Employee"}</h3>

      {/* 🔴 Error Message */}
      {error && (
        <p style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </p>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <input
          name="emp_code"
          placeholder="Employee Code"
          value={form.emp_code}
          onChange={handleChange}
        />

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
        />

        <input
          name="designation"
          placeholder="Designation"
          value={form.designation}
          onChange={handleChange}
        />

        <input
          type="date"
          name="join_date"
          value={form.join_date}
          onChange={handleChange}
        />

        <input
          name="basic_salary"
          placeholder="Salary"
          value={form.basic_salary}
          onChange={handleChange}
        />

        <button className="btn btn-primary">
          {selected ? "Update Employee" : "Add Employee"}
        </button>
      </form>
    </div>
  );
}