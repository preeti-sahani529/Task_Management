import React, { useState } from "react";
import { z, ZodError } from "zod";
import { getZodError } from "../helper/getZodError";
import { showToast } from "../helper/showToast";

const HomePage = () => {
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

  dueDate: z.string(),
});

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validatedData = taskSchema.parse(formData);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/task/create-task`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(validatedData),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setFormData({});
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
      <div className="rounded-3xl bg-white/10 border border-white/10 backdrop-blur-lg p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-2">Create New Task</h2>
        <p className="text-gray-300 mb-8">
          Add and organize your tasks efficiently.
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
              placeholder="Enter task title"
              required
              className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400"
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
              rows="6"
              placeholder="Describe your task..."
              className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
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
                    value={formData?.dueDate || ""}
                    onChange={handleInput}
                    name="dueDate"
                    type="date"
                    className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-400"
                />
        </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition duration-300"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;