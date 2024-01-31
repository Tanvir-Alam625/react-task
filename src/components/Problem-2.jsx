import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useReducer,
} from "react";
import { Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ModalContacts from "./ModalContacts";
import crossImg from "../assets/circle-cross.svg";
import { stringReplaceSpaceWithDash } from "../../utils/stringReplaceWithDash";

// Constants
export const API_URL_CONTACTS =
  "https://contact.mediusware.com/api/contacts/?page=";
export const API_URL_US_CONTACTS =
  "https://contact.mediusware.com/api/country-contacts/United%20States/?page=";

// Initial state of modal
const initialState = {
  showModal1: false,
  showModal2: false,
};

// Modal reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "showModalOne":
      return { ...state, showModal1: action.value };
    case "showModalTwo":
      return { ...state, showModal2: action.value };
    default:
      return state;
  }
};

const Problem2 = () => {
  const [modalState, dispatch] = useReducer(reducer, initialState);
  const [dataToFetch, setDataToFetch] = useState();
  const [checkbox, setCheckbox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const modalBodyRef = useRef(null);
  const [contactData, setContactData] = useState({
    id: "",
    phone: "",
    country: {
      name: "",
    },
  });

  const handleModalShowContacts = useCallback(
    (e) => {
      const { textContent } = e.target;
      setDataToFetch(stringReplaceSpaceWithDash(textContent));

      if (location.pathname !== "/" && page !== 2) {
        setPage(2);
      }

      if (location.pathname === "/") {
        navigate(
          location.pathname + "/" + stringReplaceSpaceWithDash(textContent)
        );
      } else {
        navigate(stringReplaceSpaceWithDash(textContent));
      }

      dispatch({ type: "showModalOne", value: true });
    },
    [location, page, navigate]
  );

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const apiUrl =
        dataToFetch === "all-contacts" ? API_URL_CONTACTS : API_URL_US_CONTACTS;

      try {
        const response = await fetch(`${apiUrl}${page}`);
        const result = await response.json();
        setData(result?.results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [dataToFetch, page]);
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={(e) => handleModalShowContacts(e)}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={(e) => handleModalShowContacts(e)}
          >
            US Contacts
          </button>
        </div>

        <ModalContacts
          modalState={modalState}
          data={data}
          setContactData={setContactData}
          checkbox={checkbox}
          page={page}
          setPage={setPage}
          setCheckbox={setCheckbox}
          isLoading={isLoading}
          setDataToFetch={setDataToFetch}
          setIsLoading={setIsLoading}
          dispatch={dispatch}
          ref={modalBodyRef}
        />

        <Modal show={modalState.showModal2} size="md" centered>
          <Modal.Header className="d-flex justify-content-between">
            <Modal.Title>Details</Modal.Title>
            <button
              className={`btn btn-lg modal_btn_c`}
              type="button"
              onClick={() => dispatch({ type: "showModalTwo", value: false })}
            >
              <img src={crossImg} alt="cross-img" />
            </button>
          </Modal.Header>
          <Modal.Body>
            <p>{contactData?.phone}</p>
            <p>{contactData?.country?.name}</p>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Problem2;
