const pool = require("../../config/db");

module.exports.create = async function (req, res) {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    return res.status(200).json({
      message: "New todo created",
      success: true,
      data: {
        todo: newTodo.rows[0],
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports.fetchAll = async function (req, res) {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    return res.status(200).json({
      message: "List of all todos",
      success: true,
      data: {
        todos: allTodos.rows,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports.fetch = async function (req, res) {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    if (todo.rows.length === 0) {
      return res.status(404).json({
        message: `Todo with id ${id} not found`,
        success: false,
      });
    }
    return res.status(200).json({
      message: `Todo with id ${id}`,
      success: true,
      data: {
        todo: todo.rows[0],
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports.update = async function (req, res) {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id]
    );
    if (updateTodo.rowCount === 0) {
      return res.status(404).json({
        message: `Todo with id ${id} not found`,
        success: false,
      });
    }
    return res.status(200).json({
      message: `Todo with id ${id} updated`,
      success: true,
      data: {
        todo: updateTodo.rows[0],
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports.delete = async function (req, res) {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    if (deleteTodo.rowCount === 0) {
      return res.status(404).json({
        message: `Todo with id ${id} not found`,
        success: false,
      });
    }
    return res.status(200).json({
      message: `Todo with id ${id} deleted`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
