import Header from "./Header";
import Invoices from "./Invoices";
import AddInvoice from "./AddInvoice";
import InvoiceHint from "./InvoiceHint";
import { useGlobalContext } from "./AppProvider";

function Content() {
  const { addInv, invoices } = useGlobalContext();
  return (
    <article className="app-container">
      <div className="container">
        <div className="page">
          <Header />
          {invoices.length === 0 && <InvoiceHint />}
          <Invoices />
        </div>
        {addInv && <AddInvoice />}
      </div>
    </article>
  );
}

export default Content;
