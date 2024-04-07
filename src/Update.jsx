import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
  const [task, setTask] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [tasktype, setTasktype] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchTodoTasks();
  }, []);
  const fetchTodoTasks = async () => {
    try {
      const res = await Axios.get(`http://localhost:3333/tasks/${id}`);
      const info = res.data;
      setTask(info.task);
      setName(info.name);
      setDate(info.date);
      setTasktype(info.tasktype);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateinfo = {
      task: task,
      name: name,
      date: date,
      tasktype: tasktype,
    };
    try {
      await Axios.put(`http://localhost:3333/tasks/${id}`, updateinfo);
      Swal.fire("Information updated");
      navigate("/read");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter user name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="form-control"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
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
        <input type="submit" />
      </form>
    </div>
  );
};

export default Update;
