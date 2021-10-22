import { BsPlusSquareDotted } from "react-icons/bs";
import { useGlobalContext } from "./AppProvider";
function InvoiceHint() {
  const { setAddInv } = useGlobalContext();

  return (
    <div className="row">
      <div className="col-8 m-auto">
        <section className="invoice-hint">
          <div className="add-newInvoice" onClick={() => setAddInv(true)}>
            <BsPlusSquareDotted />
            <h1>add new invoice</h1>
          </div>
        </section>
      </div>
    </div>
  );
}

export default InvoiceHint;
