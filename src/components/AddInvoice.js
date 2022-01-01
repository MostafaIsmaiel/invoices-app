import { AiFillCloseCircle } from "react-icons/ai";
import { GoCalendar } from "react-icons/go";
import { BsBasket } from "react-icons/bs";
import DatePicker from "react-date-picker";
import { useGlobalContext } from "./AppProvider";
import React from "react";

function AddInvoice() {
  const {
    date,
    setDate,
    invoiceData,
    setInvoiceData,
    itemsList,
    setItemsList,
    generateID,
    isNew,
    setIsNew,
    isEdit,
    setIsEdit,
    isDraft,
    setIsDraft,
    setAddInv,
    dispatch,
    addItem,
    setAddItem,
    addInv,
    updateInvoice,
    setUpdateInvoice,
    resetInvoiceData,
    resetItemList,
  } = useGlobalContext();
  const {
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
  } = invoiceData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNew) {
      dispatch({
        type: "SAVE_PENDING",
        payload: { invoiceData, itemsList, date },
      });

      setInvoiceData(resetInvoiceData);
      setItemsList([resetItemList]);
      setAddInv(false);
      setIsNew(false);
      setIsDraft(false);
      setIsEdit(false);
      setUpdateInvoice(false);
    } else if (isDraft) {
      dispatch({
        type: "SAVE_DRAFT",
        payload: { invoiceData, itemsList, date },
      });

      setInvoiceData(resetInvoiceData);
      setItemsList([resetItemList]);
      setAddInv(false);
      setIsNew(false);
      setIsDraft(false);
      setIsEdit(false);
      setUpdateInvoice(false);
    } else if (updateInvoice) {
      dispatch({
        type: "EDIT_ITEM",
        payload: { invoiceData, itemsList, date },
      });
      setInvoiceData(resetInvoiceData);
      setItemsList([resetItemList]);
      setAddInv(false);
      setIsNew(false);
      setIsDraft(false);
      setIsEdit(false);
      setUpdateInvoice(false);
    } else if (addItem) {
      const newItem = {
        itemListID: generateID(),
        itemName: "",
        qty: 0,
        price: 0,
      };
      const newItemsList = [...itemsList, newItem];
      setItemsList(newItemsList);
    }
  };

  const handleDelete = (id) => {
    const newItemsList = itemsList.filter((item) => item.itemListID !== id);
    setItemsList(newItemsList);
  };

  return (
    <section className="addInvoice-container">
      <div className="container">
        <div className="addNewInvoice">
          <div className="row justify-content-center">
            <div className="col-md-9">
              <header className="addInvoices-header">
                <h2 className="heading">new invoice</h2>
                <button
                  className="close-btn"
                  onClick={() => {
                    setAddInv(false);
                    setIsEdit(false);
                    setInvoiceData(resetInvoiceData);
                    setItemsList([resetItemList]);
                  }}
                >
                  <AiFillCloseCircle />
                </button>
              </header>
            </div>
            <div className="col-md-9">
              <form
                action="#"
                className="form"
                onSubmit={(e) => handleSubmit(e)}
              >
                <section className="bill-form form-section">
                  <h6 className="form-headers">bill form</h6>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-control">
                        <label htmlFor="streetAdressFrom">street adress</label>
                        <input
                          type="text"
                          name="streetAdress"
                          id="streetAdressFrom"
                          className="input"
                          value={streetFrom}
                          onChange={(e) => {
                            setInvoiceData({
                              ...invoiceData,
                              streetFrom: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6 col-sm-4">
                      <div className="form-control">
                        <label htmlFor="cityFrom">city</label>
                        <input
                          type="text"
                          id="cityFrom"
                          className="input"
                          value={cityFrom}
                          onChange={(e) => {
                            setInvoiceData({
                              ...invoiceData,
                              cityFrom: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6 col-sm-4">
                      <div className="form-control">
                        <label htmlFor="postCodeFrom">post code</label>
                        <input
                          type="text"
                          name="postCode"
                          id="postCodeFrom"
                          className="input"
                          value={postCodeFrom}
                          onChange={(e) => {
                            setInvoiceData({
                              ...invoiceData,
                              postCodeFrom: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6 col-sm-4">
                      <div className="form-control">
                        <label htmlFor="countryFrom">country</label>
                        <input
                          type="text"
                          name="country"
                          id="countryFrom"
                          className="input"
                          value={countryFrom}
                          onChange={(e) => {
                            setInvoiceData({
                              ...invoiceData,
                              countryFrom: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </section>
                <section className="bill-to form-section">
                  <h6 className="form-headers">bill to</h6>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-control">
                        <label htmlFor="clientName">client's name</label>
                        <input
                          type="text"
                          className="input"
                          id="clientName"
                          name="clientName"
                          value={clientName}
                          onChange={(e) => {
                            setInvoiceData({
                              ...invoiceData,
                              clientName: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-control">
                        <label htmlFor="clientEmail">client's email</label>
                        <input
                          type="email"
                          className="input"
                          id="clientEmail"
                          name="clientEmail"
                          value={clientEmail}
                          onChange={(e) => {
                            setInvoiceData({
                              ...invoiceData,
                              clientEmail: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-control">
                        <label htmlFor="streetAdressTo">street adress</label>
                        <input
                          type="text"
                          className="input"
                          id="streetAdressTo"
                          name="streetAdress"
                          value={streetTo}
                          onChange={(e) => {
                            setInvoiceData({
                              ...invoiceData,
                              streetTo: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6 col-sm-4">
                      <div className="form-control">
                        <label htmlFor="cityTo">city</label>
                        <input
                          type="text"
                          name="city"
                          id="cityTo"
                          className="input"
                          value={cityTo}
                          onChange={(e) => {
                            setInvoiceData({
                              ...invoiceData,
                              cityTo: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6 col-sm-4">
                      <div className="form-control">
                        <label htmlFor="postCodeTo">post code</label>
                        <input
                          type="text"
                          name="postCode"
                          id="postCodeTo"
                          className="input"
                          value={postCodeTo}
                          onChange={(e) => {
                            setInvoiceData({
                              ...invoiceData,
                              postCodeTo: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6 col-sm-4">
                      <div className="form-control">
                        <label htmlFor="countryTo">country</label>
                        <input
                          type="text"
                          name="country"
                          id="countryTo"
                          className="input"
                          value={countryTo}
                          onChange={(e) => {
                            setInvoiceData({
                              ...invoiceData,
                              countryTo: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-control">
                        <label htmlFor="date">date</label>
                        <div className="input">
                          <DatePicker
                            onChange={setDate}
                            value={date}
                            id="date"
                            calendarIcon={null}
                            clearIcon={null}
                            format="dd-MM-yy"
                          />
                          <GoCalendar className="calendar-icon" />
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-control">
                        <label htmlFor="paymentTerms">payment terms</label>
                        <select
                          name="paymentTerms"
                          id="paymentTerms"
                          className="select"
                          value={paymentTerms}
                          onChange={(e) => {
                            setInvoiceData({
                              ...invoiceData,
                              paymentTerms: e.target.value,
                            });
                          }}
                        >
                          <option value="1">net 1 day</option>
                          <option value="7">net 7 day</option>
                          <option value="14">net 14 day</option>
                          <option value="30">net 30 day</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-control">
                        <label htmlFor="projectDescription">
                          Project Description
                        </label>
                        <input
                          type="text"
                          id="projectDescription"
                          className="input"
                          name="projectDescription"
                          value={projectDescription}
                          onChange={(e) => {
                            setInvoiceData({
                              ...invoiceData,
                              projectDescription: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </section>
                <section className="form-section item-list">
                  <h6 className="form-headers">item list</h6>
                  {itemsList.map((item) => {
                    const { itemListID, itemName, qty, price } = item;
                    let total = (qty * price).toFixed(2);
                    return (
                      <div className="item" key={itemListID}>
                        <div className="row align-items-center">
                          <div className="col-8 col-md-4">
                            <div className="form-control">
                              <label htmlFor="itemName">item name</label>
                              <input
                                type="text"
                                name="itemName"
                                id="itemName"
                                className="input"
                                value={itemName}
                                onChange={(e) => {
                                  setItemsList(
                                    itemsList.map((ele) =>
                                      ele.itemListID === itemListID
                                        ? { ...ele, itemName: e.target.value }
                                        : ele
                                    )
                                  );
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-4 col-md-2">
                            <div className="form-control">
                              <label htmlFor="qty">qty</label>
                              <input
                                type="number"
                                name="quantity"
                                id="qty"
                                className="input"
                                value={qty}
                                required
                                onChange={(e) => {
                                  setItemsList(
                                    itemsList.map((ele) =>
                                      ele.itemListID === itemListID
                                        ? {
                                            ...ele,
                                            qty: e.target.value,
                                          }
                                        : ele
                                    )
                                  );
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-4 col-md-3">
                            <div className="form-control">
                              <label htmlFor="price">price</label>
                              <input
                                type="number"
                                name="price"
                                id="price"
                                className="input"
                                value={price}
                                onChange={(e) => {
                                  setItemsList(
                                    itemsList.map((ele) =>
                                      ele.itemListID === itemListID
                                        ? {
                                            ...ele,
                                            price: e.target.value,
                                          }
                                        : ele
                                    )
                                  );
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-4 col-md-2">
                            <div className="form-control">
                              <label htmlFor="total">total</label>
                              <p className="total" id="total">
                                {total}
                              </p>
                            </div>
                          </div>
                          <div className="col-4 col-md-1">
                            <div className="form-control">
                              <button
                                className="remove-btn"
                                onClick={() => handleDelete(itemListID)}
                              >
                                <BsBasket />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="add-new-item">
                    <button className="add-item" onClick={setAddItem(true)}>
                      add item
                    </button>
                  </div>
                </section>

                <section className="form-btn-handelers">
                  <div className="row">
                    <div className="col-sm-6 col-12 text-sm-start text-xs-center">
                      <button
                        className="btn-handler"
                        onClick={() => {
                          setAddInv(false);
                          setIsEdit(false);
                          setInvoiceData(resetInvoiceData);
                          setItemsList([resetItemList]);
                        }}
                      >
                        discard
                      </button>
                    </div>
                    <div className="col-12 col-sm-6 order-first order-sm-last text-xs-center text-xs-end">
                      <div className="handelers-container">
                        {addInv && (
                          <button
                            className="btn-handler"
                            onClick={() => {
                              setIsDraft(true);
                            }}
                          >
                            save as draft
                          </button>
                        )}
                        <button
                          className="btn-handler send-btn"
                          onClick={() => {
                            if (addInv) {
                              setIsNew(true);
                            }
                            if (isEdit) {
                              setUpdateInvoice(true);
                            }
                          }}
                        >
                          {addInv && "save & send"}
                          {isEdit && "save changes"}
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddInvoice;
