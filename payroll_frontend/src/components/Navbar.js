import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <h2>Payroll System</h2>
      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/payroll">Payroll</Link>
      </div>
    </div>
  );
}