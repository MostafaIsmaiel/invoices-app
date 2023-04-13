import { useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import Header from "./Header";
import Invoices from "./Invoices";
import AddInvoice from "./AddInvoice";
import InvoiceHint from "./InvoiceHint";
import { useGlobalContext } from "./AppProvider";

function Content() {
  const { addInv, invoices } = useGlobalContext();
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <article className="app-container">
      <div className="container" ref={parent}>
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
