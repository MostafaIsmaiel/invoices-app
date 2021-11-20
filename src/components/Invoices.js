import { useEffect } from "react";
import { BiChevronRight } from "react-icons/bi";
import { useGlobalContext } from "./AppProvider";
import { Link } from "react-router-dom";

function Invoices() {
  const { invoices, filterByStatus, final, setFinal, paymentDue } =
    useGlobalContext();

  useEffect(() => {
    const keys = Object.keys(filterByStatus);
    const values = Object.values(filterByStatus);
    const data = values.map((value, index) => {
      return invoices.filter((invoice) => {
        if (value) {
          return invoice.status === keys[index];
        } else {
          return "";
        }
      });
    });

    const finalResult = () => {
      if (data.flat().length > 0) {
        setFinal(data.flat());
      } else {
        setFinal(invoices);
      }
    };

    finalResult();
  }, [filterByStatus, invoices, setFinal]);

  return (
    <section className="invoices-container col-lg-8 m-auto mt-5 text-capitalize">
      {final.map((invoice) => {
        const { invoiceID, clientName, itemList, date, status, paymentTerms } =
          invoice;

        let total = 0;
        itemList.map((item) => {
          let price = item.price * item.qty;
          return (total += price);
        });

        return (
          <Link to={`/${invoiceID}`} className="invoice" key={invoiceID}>
            <div className="row w-100">
              <div className="col-md-7 col-12">
                <div className="invoice-info">
                  <b className="id">
                    <span>#</span>
                    {invoiceID}
                  </b>
                  <p className="due-date">
                    Due {paymentDue(date, paymentTerms)}
                  </p>
                  <p className="name">{clientName || "N/A"}</p>
                </div>
              </div>
              <div className="col-md-5 col-12">
                <div className="invoice-status">
                  <b className="invoice-cost">
                    <span>$</span>
                    {total}
                  </b>
                  <div className="status-container">
                    <p className={`status ${status}`}>{status}</p>
                    <BiChevronRight />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

export default Invoices;
