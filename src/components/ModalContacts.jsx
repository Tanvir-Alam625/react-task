import React, { forwardRef, useCallback, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { stringReplaceSpaceWithDash } from "../../utils/stringReplaceWithDash";
import crossImg from "../assets/circle-cross.svg";

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

    const handleModalShowContacts = (e) => {
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
    };

    const handleModalCloseContacts = () => {
      dispatch({ type: "showModalOne", value: false });
      navigate("/problem-2");
    };

    const handleIntersection = useCallback(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          // Load more data when user scrolls to the bottom
          setPage((prevPage) => prevPage + 1);
        }
      },
      [setPage]
    );

    useEffect(() => {
      const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      });

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [handleIntersection, ref]);

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
                .map((item) => (
                  <tr
                    className="cursor-pointer"
                    key={item.id}
                    onClick={() => {
                      dispatch({ type: "showModalTwo", value: true });
                      setContactData(item);
                    }}
                  >
                    <td>{item?.phone}</td>
                    <td>{item?.country?.name}</td>
                  </tr>
                ))}

              <tr key="0" ref={ref}>
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
