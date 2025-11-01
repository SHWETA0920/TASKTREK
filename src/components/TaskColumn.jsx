import React from "react";
import "./TaskColumn.css";
import TaskCard from "./TaskCard";
import DropArea from "./DropArea";

const TaskColumn = ({
  title,
  icon,
  tasks,
  status,
  handleDelete,
  setActiveCard,
  onDrop
}) => {
  const filteredTasks = tasks.filter(task => task.status === status);
  
  return (
    <section className="task_column">
      <h2 
        className="task_column_heading" 
        data-count={filteredTasks.length}
      >
        <img className="task_column_icon" src={icon} alt="" /> 
        {title}
      </h2>
      <DropArea onDrop={() => onDrop(status, 0)} />

      {filteredTasks.map((task, index) => (
        <React.Fragment key={index}>
          <TaskCard
            title={task.task}
            tags={task.tags}
            handleDelete={handleDelete}
            index={tasks.indexOf(task)}
            setActiveCard={setActiveCard}
          />
          <DropArea onDrop={() => onDrop(status, index + 1)} />
        </React.Fragment>
      ))}
    </section>
  );
};

export default TaskColumn;