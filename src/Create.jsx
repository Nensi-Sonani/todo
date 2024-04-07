import Axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Create = () => {
  const [task, setTask] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  // const [status, setStatus] = useState();
  const [tasktype, setTasktype] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = {
      task: task,
      name: name,
      date: date,
      // status: status,
      tasktype: tasktype,
    };
    try {
      await Axios.post("http://localhost:3333/tasks", obj);
      Swal.fire({
        text: "Information Added Successfully",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="container">
      <h2 className="title">Add Task</h2>
      <form className="form" action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Enter task"
            rows="5"
            minLength={3}
            required
            onChange={(e) => setTask(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Enter username"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {/* <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="status"
              onChange={(e) => setStatus(e.target.checked)}
            />
            <span> Completed</span>
          </label>
        </div> */}
        <div className="form-group">
          <select
            className="form-control"
            value={tasktype}
            onChange={(e) => setTasktype(e.target.value)}
          >
            <option value="">Select Task Type</option>
            <option value="Office">Office</option>
            <option value="Personal">Personal</option>
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Create;
