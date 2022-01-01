import { useParams } from "react-router";
import { useGlobalContext } from "./AppProvider";
import AddInvoice from "./AddInvoice";
import { BiChevronLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import Alert from "./Alert";
import { useEffect } from "react";

function CurrentInvoice() {
  const {
    invoices,
    dispatch,
    isEdit,
    setIsEdit,
    setInvoiceData,
    invoiceData,
    setItemsList,
    DateFn,
    paymentDue,
    isAlert,
    setIsAlert,
  } = useGlobalContext();
  const param = useParams();
  const invoice = invoices.find((invoice) => invoice.invoiceID === param.id);

  const {
    invoiceID,
    streetFrom,
    cityFrom,
    postCodeFrom,
    countryFrom,
    clientName,
    clientEmail,
    streetTo,
    cityTo,
    postCodeTo,
    countryTo,
    paymentTerms,
    projectDescription,
    status,
    date,
    itemList,
  } = invoice;

  const finalPriceMap = itemList.map((item) => {
    let total = item.price * item.qty;
    return total;
  });

  const finalPriceReduce =
    finalPriceMap.length > 0
      ? finalPriceMap.reduce((acc, item) => {
          return acc + item;
        })
      : "";

  useEffect(() => {
    if (isEdit || isAlert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isAlert, isEdit]);

  return (
    <article className="currentInvoice w-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="currentInvoice-container">
              <header className="header">
                <div className="back-to-home">
                  <Link to="/" className="back-to-home-btn">
                    <BiChevronLeft />
                    Go Back
                  </Link>
                </div>
                <div className="invoice-actions">
                  <div className="status-container">
                    <span>status</span>
                    <div className={`status ${status}`}>{status}</div>
                  </div>
                  <div className="actions-container">
                    {status === "pending" || status === "draft" ? (
                      <button
                        className="btn edit"
                        onClick={() => {
                          setIsEdit(true);
                          setInvoiceData({
                            ...invoiceData,
                            invoiceID,
                            streetFrom,
                            cityFrom,
                            postCodeFrom,
                            countryFrom,
                            clientName,
                            clientEmail,
                            streetTo,
                            cityTo,
                            postCodeTo,
                            countryTo,
                            paymentTerms,
                            projectDescription,
                          });
                          setItemsList(itemList);
                        }}
                      >
                        edit
                      </button>
                    ) : (
                      ""
                    )}

                    <button
                      className="btn delete"
                      onClick={() => setIsAlert(true)}
                    >
                      delete
                    </button>
                    {status === "pending" && (
                      <button
                        className="btn paid"
                        onClick={() => {
                          dispatch({ type: "PAID_ITEM", payload: invoiceID });
                        }}
                      >
                        mark as paid
                      </button>
                    )}
                  </div>
                </div>
              </header>
              <section className="currentInvoice-details">
                <div className="heading-container">
                  <h5 className="heading">
                    <span className="hash">#</span>
                    {invoiceID}
                  </h5>
                  <p className="description-detail">
                    {projectDescription || "N/A"}
                  </p>
                </div>
                <div className="sender-info box">
                  <h6>sender info</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="box-inner">
                        <p>street:</p>
                        <span>{streetFrom || "N/A"}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="box-inner">
                        <p>city:</p>
                        <span>{cityFrom || "N/A"}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="box-inner">
                        <p>post code:</p>
                        <span>{postCodeFrom || "N/A"}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="box-inner">
                        <p>country:</p>
                        <span>{countryFrom || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="client-info box">
                  <h6>client info</h6>
                  <div className="row">
                    <div className="col-12">
                      <div className="box-inner">
                        <p>client name:</p>
                        <span className="name">{clientName || "N/A"}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="box-inner">
                        <p>street:</p>
                        <span>{streetTo || "N/A"}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="box-inner">
                        <p>city:</p>
                        <span>{cityTo || "N/A"}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="box-inner">
                        <p>post code:</p>
                        <span>{postCodeTo || "N/A"}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="box-inner">
                        <p>country:</p>
                        <span>{countryTo || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="other-info box">
                  <div className="row">
                    <div className="col-md-6">
                      <h6>invoice date</h6>
                      <div className="box-inner">
                        <span>{DateFn(date) || "N/A"}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h6>payment due</h6>
                      <div className="box-inner">
                        <span>{paymentDue(date, paymentTerms) || "N/A"}</span>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <h6>sent to</h6>
                      <div className="box-inner">
                        <span>{clientEmail || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="itemsTable-container">
                  <table className="table items-table">
                    <thead>
                      <tr>
                        <th scope="col">item name</th>
                        <th scope="col">qty</th>
                        <th scope="col">price</th>
                        <th scope="col">total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemList &&
                        itemList.map((item) => {
                          const { itemName, price, qty, itemListID } = item;
                          let total = (qty * price).toFixed(2);
                          return (
                            <tr key={itemListID}>
                              <th scope="row">{itemName || "N/A"}</th>
                              <td>{qty}</td>
                              <td>{price}</td>
                              <td>${total}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3">grand total</td>
                        <td>
                          {finalPriceReduce
                            ? `$${Math.round(finalPriceReduce)}`
                            : "$0"}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      {isEdit && <AddInvoice />}
      {isAlert && <Alert id={invoiceID} />}
    </article>
  );
}

export default CurrentInvoice;
