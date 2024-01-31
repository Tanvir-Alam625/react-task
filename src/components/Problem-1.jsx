import React, { useState } from "react";

const Problem1 = () => {
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState([]);
  const [error, setError] = useState({
    name: null,
    status: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const status = event.target.status.value;
    if (!name) {
      setError({
        ...error,
        name: "Name is required",
      });
      return;
    } else {
      setError({
        ...error,
        name: null,
      });
    }
    if (!status) {
      setError({
        ...error,
        status: "status is required",
      });
      return;
    } else {
      setError({
        ...error,
        status: null,
      });
    }
    const newData = [...data, { name, status }];
    setData(newData);
    event.target.reset();
  };

  const filterData = () => {
    switch (filter) {
      case "active":
        return data.filter((item) => item.status === "active");
      case "completed":
        return data.filter((item) => item.status === "completed");
      default:
        return data;
    }
  };

  const sortData = (filteredData) => {
    return filteredData.sort((a, b) => {
      if (a.status === "active" && b.status !== "active") return -1;
      if (a.status === "completed" && b.status !== "completed") return 1;
      return 0;
    });
  };

  const handleClick = (val) => {
    setFilter(val);
  };

  const filteredAndSortedData = sortData(filterData());

  const handleResetErrorMessage = (name, value) => {
    if (value) {
      setError({
        ...error,
        [name]: null,
      });
    } else {
      setError({
        ...error,
        [name]: `${name} is required`,
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6">
          <form
            onSubmit={handleSubmit}
            className="row gy-2 gx-3 align-items-start mb-4"
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={(e) =>
                  handleResetErrorMessage(e.target.name, e.target.value)
                }
                placeholder="Name"
              />
              <small className="text-danger">{error.name}</small>
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                name="status"
                onChange={(e) =>
                  handleResetErrorMessage(e.target.name, e.target.value)
                }
              />
              <small className="text-danger">{error.status}</small>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${filter === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${filter === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${filter === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
