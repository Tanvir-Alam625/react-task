import React, { forwardRef, useCallback, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { stringReplaceSpaceWithDash } from "../../utils/stringReplaceWithDash";
import crossImg from "../assets/circle-cross.svg";
import { useInView } from "react-intersection-observer";

const ModalContacts = forwardRef(
  (
    {
      modalState,
      setContactData,
      data,
      isLoading,
      page,
      setPage,
      checkbox,
      setCheckbox,
      dispatch,
      setDataToFetch,
    },
    ref
  ) => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
      ref: refIn,
      inView,
      entry,
    } = useInView({
      /* Optional options */
      threshold: 0,
    });

    console.log(inView, entry, "sfsdff");

    const handleModalShowContacts = (e) => {
      const { textContent } = e.target;
      setDataToFetch(stringReplaceSpaceWithDash(textContent));
      setPage(1);

      if (location.pathname === "/") {
        navigate(
          location.pathname + "/" + stringReplaceSpaceWithDash(textContent)
        );
      } else {
        navigate(stringReplaceSpaceWithDash(textContent));
      }

      dispatch({ type: "showModalOne", value: true });
    };

    const handleModalCloseContacts = () => {
      dispatch({ type: "showModalOne", value: false });
      navigate("/problem-2");
      setPage(1);
    };
    return (
      <Modal show={modalState.showModal1} size="lg" centered scrollable>
        <Modal.Header>
          <button
            className={`btn btn-lg modal_btn_a 
            ${
              location.pathname === "/problem-2/all-contacts"
                ? "btn-primary"
                : ""
            }
            `}
            type="button"
            onClick={(e) => handleModalShowContacts(e)}
          >
            All Contacts
          </button>
          <button
            className={`btn btn-lg modal_btn_b ${
              location.pathname === "/problem-2/us-contacts"
                ? " btn-primary"
                : ""
            }`}
            type="button"
            onClick={(e) => handleModalShowContacts(e)}
          >
            US Contacts
          </button>
          <button
            className={`btn btn-lg modal_btn_c`}
            type="button"
            onClick={() => handleModalCloseContacts()}
          >
            <img src={crossImg} alt="cross" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Phone</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              {data
                ?.filter((item) =>
                  checkbox === true ? item.id % 2 === 0 : item
                )
                .map((item, i) => (
                  <tr
                    className="cursor-pointer"
                    key={i}
                    onClick={() => {
                      dispatch({ type: "showModalTwo", value: true });
                      setContactData(item);
                    }}
                  >
                    <td>{item?.phone}</td>
                    <td>{item?.country?.name}</td>
                  </tr>
                ))}

              <tr key="0" ref={refIn}>
                {isLoading && (
                  <>
                    <td>Loading...</td>
                    <td>Loading...</td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
          <Form.Check
            type="checkbox"
            id="0"
            label="Show Only Even IDs"
            value={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
        </Modal.Footer>
      </Modal>
    );
  }
);

export default ModalContacts;
