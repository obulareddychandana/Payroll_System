import { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

export default function Employees() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="container">
      <EmployeeForm
        selected={selected}
        refresh={() => window.location.reload()}
      />

      <EmployeeList onEdit={setSelected} />
    </div>
  );
}