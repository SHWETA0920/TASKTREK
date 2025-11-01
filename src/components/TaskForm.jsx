import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ setTasks }) => {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("todo");
  const [tags, setTags] = useState([]);

  const availableTags = ["HTML", "CSS", "JAVASCRIPT", "REACT"];
  const statusOptions = ["todo", "doing", "done"];

  const handleTagClick = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleStatusClick = (newStatus) => {
    setStatus(newStatus);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    const newTask = {
      task: task,
      tags: tags,
      status: status,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTask("");
    setTags([]);
    setStatus("todo"); // Reset to default
  };

  return (
    <form className="task_form" onSubmit={handleSubmit}>
      <h2 className="form_title">Enter your task</h2>
      
      <div className="input_group">
        <input
          type="text"
          className="task_input"
          placeholder="What do you want to learn today?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>

      {/* Status Selection */}
      <div className="status_section">
        <span className="status_label">Select Status</span>
        <div className="status_options">
          {statusOptions.map((option) => (
            <div
              key={option}
              className={`status_option ${status === option ? "selected" : ""}`}
              data-status={option}
              onClick={() => handleStatusClick(option)}
            >
              {option.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {/* Tags Selection */}
      <div className="tags_section">
        <span className="tags_label">Choose Technologies</span>
        <div className="tags_container">
          {availableTags.map((tag) => (
            <div
              key={tag}
              className={`tag_option ${tags.includes(tag) ? "selected" : ""}`}
              data-tag={tag.toLowerCase()}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Items Display */}
      {(status || tags.length > 0) && (
        <div className="selected_display">
          <span className="selected_item status">
            Status: {status.toUpperCase()}
          </span>
          {tags.map((tag) => (
            <span key={tag} className="selected_item">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Submit Button */}
      <div className="submit_section">
        <button 
          type="submit" 
          className="submit_btn"
          disabled={!task.trim()}
        >
          + Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;