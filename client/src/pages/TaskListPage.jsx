import React, { useEffect, useState } from "react";
import Task from "../components/Task";
import { showToast } from "../helper/showToast";

const TaskListPage = () => {
  const [referesh, setReferesh] = useState(false);
  const [tasks, setTasks] = useState();

  useEffect(() => {
    setReferesh(false);

    const getTask = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/task/get-all-task`
      );

      const responseData = await response.json();
      setTasks(responseData);
    };

    getTask();
  }, [referesh]);

  const deleteTask = async (taskid) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/task/delete-task/${taskid}`,
        {
          method: "DELETE",
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setReferesh(true);
      showToast("success", responseData.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <div className="pt-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">My Tasks</h2>
          <p className="text-gray-300 mt-2">
            Track and manage all your active tasks.
          </p>
        </div>
      </div>

      {tasks && tasks.status ? (
        tasks.taskData.length > 0 ? (
          <div className="space-y-5">
            {tasks.taskData.map((task) => (
              <Task key={task._id} props={task} onDelete={deleteTask} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white/10 border border-white/10 p-10 text-center backdrop-blur-lg">
            <h3 className="text-2xl font-semibold text-white mb-2">
              No Tasks Found
            </h3>
            <p className="text-gray-300">
              Start by creating your first task.
            </p>
          </div>
        )
      ) : (
        <div className="rounded-3xl bg-white/10 border border-white/10 p-10 text-center backdrop-blur-lg">
          <p className="text-white text-lg">Loading tasks...</p>
        </div>
      )}
    </div>
  );
};

export default TaskListPage;