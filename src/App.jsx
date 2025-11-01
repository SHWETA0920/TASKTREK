import React, { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index != taskIndex);
    setTasks(newTasks);
  };

  const onDrop = (status, position) => {
    if (activeCard == null || activeCard === undefined) return;

    const taskToMove = tasks[activeCard];
    const updatedTasks = tasks.filter((task, index) => index !== activeCard);

    updatedTasks.splice(position, 0, {
      ...taskToMove,
      status: status
    });
    setTasks(updatedTasks);
  };

  const onlineUsers = [
    { name: "Maren Maureen", id: "1094882001" },
    { name: "Jennifer Jane", id: "1094872000" },
    { name: "Ryan Herwinds", id: "1094342003" },
    { name: "Kierra Culhane", id: "1094662002" }
  ];

  return (
    <div className="app">
      {/* Updated Header Section */}
      <header className="app_header">
        <div className="header_content">
          <h1>My TaskTrek</h1>     
        </div>
      </header>

      <div className="app_content">
        <div className="courses_section">
          <TaskForm setTasks={setTasks} />
          
          <main className="app_main">
            <TaskColumn
              title="New Courses"
              icon={todoIcon}
              tasks={tasks}
              status="todo"
              handleDelete={handleDelete}
              setActiveCard={setActiveCard}
              onDrop={onDrop}
            />
            <TaskColumn
              title="In Progress"
              icon={doingIcon}
              tasks={tasks}
              status="doing"
              handleDelete={handleDelete}
              setActiveCard={setActiveCard}
              onDrop={onDrop}
            />
            <TaskColumn
              title="Completed"
              icon={doneIcon}
              tasks={tasks}
              status="done"
              handleDelete={handleDelete}
              setActiveCard={setActiveCard}
              onDrop={onDrop}
            />
          </main>
        </div>

        <div className="sidebar">
          <div className="sidebar_section">
            <h3>Nov 2020</h3>
            <div className="calendar">
              <div className="calendar_header">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
              <div className="calendar_days">
                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map(day => (
                  <span key={day} className={`calendar_day ${day === 25 ? 'current' : ''}`}>
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="sidebar_section">
            <h3>Online Users</h3>
            <div className="online_users">
              {onlineUsers.map((user, index) => (
                <div key={index} className="user_item">
                  <div className="user_avatar"></div>
                  <div className="user_info">
                    <span className="user_name">{user.name}</span>
                    <span className="user_id">{user.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>          
        </div>
      </div>
    </div>
  );
};

export default App;