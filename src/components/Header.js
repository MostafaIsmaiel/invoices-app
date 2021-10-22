import { useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useGlobalContext } from "./AppProvider";

function Header() {
  const { addInv, setAddInv, final, setFilterByStatus, filterByStatus } =
    useGlobalContext();

  const handleFilterAppear = () => {
    const list = document.querySelector(".filter-list");
    const svg = document.querySelector(".filter svg");

    list.classList.toggle("active");
    svg.classList.toggle("active");
  };

  useEffect(() => {
    if (addInv) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [addInv]);

  return (
    <header className="header col-lg-9 m-auto text-capitalize">
      <div className="col-lg-6">
        <div className="invoices-counter">
          <h2>Invoices</h2>
          <span>There are {final.length} total invoices</span>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="invoice-actions">
          <div className="filter">
            <button
              className="filter-btn"
              onClick={() => {
                handleFilterAppear();
              }}
            >
              Filter by status
            </button>
            <BiChevronDown />

            <ul className="filter-list">
              <li>
                <input type="checkbox" name="check" id="draft-input" />
                <label
                  htmlFor="draft-input"
                  onClick={(e) => {
                    if (!e.target.previousSibling.checked) {
                      setFilterByStatus({
                        ...filterByStatus,
                        draft: true,
                      });
                    } else {
                      setFilterByStatus({
                        ...filterByStatus,
                        draft: false,
                      });
                    }
                  }}
                >
                  draft
                </label>
              </li>
              <li>
                <input type="checkbox" name="check" id="pending-input" />
                <label
                  htmlFor="pending-input"
                  onClick={(e) => {
                    if (!e.target.previousSibling.checked) {
                      setFilterByStatus({
                        ...filterByStatus,
                        pending: true,
                      });
                    } else {
                      setFilterByStatus({
                        ...filterByStatus,
                        pending: false,
                      });
                    }
                  }}
                >
                  pending
                </label>
              </li>
              <li>
                <input type="checkbox" name="check" id="paid-input" />
                <label
                  htmlFor="paid-input"
                  onClick={(e) => {
                    if (!e.target.previousSibling.checked) {
                      setFilterByStatus({
                        ...filterByStatus,
                        paid: true,
                      });
                    } else {
                      setFilterByStatus({
                        ...filterByStatus,
                        paid: false,
                      });
                    }
                  }}
                >
                  paid
                </label>
              </li>
            </ul>
          </div>
          <button className="add-invoice" onClick={() => setAddInv(true)}>
            <img src="./image/plus.svg" alt="add" />
            <h6>New Invoice</h6>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
