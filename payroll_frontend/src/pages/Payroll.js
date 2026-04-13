import PayrollForm from "../components/PayrollForm";
import PayrollList from "../components/PayrollList";

export default function Payroll() {
  return (
    <div className="container">
      <div className="card">
        <PayrollForm />
      </div>

      <div className="card">
        <PayrollList />
      </div>
    </div>
  );
}