import { Link } from "react-router-dom";
import { useGlobalContext } from "./AppProvider";

function Alert({ id }) {
  const { dispatch, setIsAlert } = useGlobalContext();

  return (
    <section className="alert">
      <div className="alert__container">
        <div className="error-sign">
          <span className="first"></span>
          <span className="second"></span>
        </div>
        <h5 className="heading">confirm deletion</h5>
        <p className="confirm-message">
          Are you sure you want to delete invoice {id} <br /> This action cannot
          be undone.
        </p>
        <div className="actions-btn">
          <Link
            className="confirm btn"
            to="/"
            onClick={() => {
              dispatch({
                type: "DELETE_INVOICE",
                payload: id,
              });
              setIsAlert(false);
            }}
          >
            delete
          </Link>
          <button className="discard btn" onClick={() => setIsAlert(false)}>
            cancel
          </button>
        </div>
      </div>
    </section>
  );
}

export default Alert;
