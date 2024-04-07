import Axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Read = () => {
  const [all, setAll] = useState([]);
  const [status, setStatus] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await Axios.get("http://localhost:3333/tasks");
      setAll(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const filterResult = all.filter((item) => {
    return (
      item.tasktype &&
      item.tasktype.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const last = currentPage * itemPerPage;
  const first = last - itemPerPage;
  const current = filterResult.slice(first, last);

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:3333/tasks/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="container">
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <div className="task-list">
        <Display
          current={current}
          setStatus={setStatus}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

const SearchBar = ({ searchInput, setSearchInput }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by task type"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
};

const Display = ({ current, setStatus, handleDelete, handleUpdate }) => {
  return (
    <div>
      {current.map((val, id) => (
        <div className={`task ${val.tasktype.toLowerCase()}`} key={id}>
          <div className="delete-btn" onClick={(e) => handleDelete(val.id)}>
            Delete
          </div>
          <div className="update-btn" onClick={(e) => handleUpdate(val.id)}>
            Update
          </div>
          <p className="task-name">{val.task}</p>
          <p className="task-date">{val.date}</p>
          <input
            type="checkbox"
            value={val.status}
            className={`status-checkbox ${
              val.status === true ? "checked" : ""
            }`}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </div>
      ))}
    </div>
  );
};

export default Read;
