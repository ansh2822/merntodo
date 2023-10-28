import ErrorHandler from "../middlewares/error.js";
import Task from "../models/task.js";

export const createNewTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: res.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res) => {
  try {
    const userId = res.user._id;

    const task = await Task.find({ user: userId });

    res.status(200).send({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler());

    task.completed = !task.completed;

    await task.save();

    res.status(200).send({
      success: true,
      message: "Updated Task!",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task doesn't exist", 404));

    await Task.deleteOne(task);

    res.status(200).send({
      success: true,
      message: "Deleted Task!",
    });
  } catch (error) {
    next(error);
  }
};
