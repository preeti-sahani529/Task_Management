import React, { useEffect, useState } from "react";
import { z, ZodError } from "zod";
import { getZodError } from "../helper/getZodError";
import { showToast } from "../helper/showToast";
import { useParams } from "react-router-dom";

const ShowTask = () => {
  const { taskid } = useParams();
  const [apiData, setApiData] = useState();
  const [formData, setFormData] = useState();
  const [err, setError] = useState();

  const taskSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 character long.",
  }),

  description: z
    .string()
    .min(3, {
      message: "Description must be at least 3 character long.",
    })
    .max(500, {
      message: "Lenght acceeded.",
    }),

  status: z.enum(["Pending", "Running", "Completed", "Failed"]),

  dueDate: z.string(),
});

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getTask = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/task/show-task/${taskid}`
      );

      const responseData = await response.json();
      setApiData(responseData);
      setFormData(responseData.taskData);
    };

    getTask();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validatedData = taskSchema.parse(formData);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/task/update-task/${taskid}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(validatedData),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      showToast("success", responseData.message);
    } catch (error) {
      if (error instanceof ZodError) {
        const getError = getZodError(error.errors);
        setError(getError);
      }

      showToast("error", error.message);
    }
  };

  return (
    <div className="pt-4">
      {apiData && apiData.status ? (
        <div className="rounded-3xl bg-white/10 border border-white/10 backdrop-blur-lg p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-2">Task Details</h2>
          <p className="text-gray-300 mb-8">
            Update and manage your selected task.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Task Title
              </label>

              <input
                value={formData?.title || ""}
                onChange={handleInput}
                name="title"
                type="text"
                required
                className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-400"
              />

              {err && err.title && (
                <span className="text-red-400 text-sm mt-2 block">
                  {err.title}
                </span>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Description
              </label>

              <textarea
                value={formData?.description || ""}
                onChange={handleInput}
                name="description"
                rows="5"
                className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              ></textarea>

              {err && err.description && (
                <span className="text-red-400 text-sm mt-2 block">
                  {err.description}
                </span>
              )}
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-200">
                    Due Date
                </label>

                <input
                    value={formData?.dueDate ? formData.dueDate.split("T")[0] : ""}
                    onChange={handleInput}
                    name="dueDate"
                    type="date"
                    className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-400"
                />
        </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Task Status
              </label>

              <select
                onChange={handleInput}
                name="status"
                value={formData?.status || ""}
                className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option className="text-black" value="Pending">
                  Pending
                </option>
                <option className="text-black" value="Running">
                  Running
                </option>
                <option className="text-black" value="Completed">
                  Completed
                </option>
                <option className="text-black" value="Failed">
                  Failed
                </option>
              </select>

              {err && err.status && (
                <span className="text-red-400 text-sm mt-2 block">
                  {err.status}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition duration-300"
            >
              Update Task
            </button>
          </form>
        </div>
      ) : (
        <div className="rounded-3xl bg-white/10 border border-white/10 p-10 text-center backdrop-blur-lg">
          <p className="text-white text-lg">Loading task details...</p>
        </div>
      )}
    </div>
  );
};

export default ShowTask;