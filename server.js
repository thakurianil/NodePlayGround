import express, { application, json } from "express";
import { connectMongoDB } from "./database/mongoDbConfig.js";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 8001;

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/v1/users/login", (req, res) => {
  try {
    const { name, password } = req.body;
    console.log(name, password);
    res.json({
      status: "success",
      message: "User login success",
      name,
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: error.message,
    });
  }
});
app.post("/v1/users/post", (req, res) => {
  try {
    const { name, email } = req.body;
    res.json({
      status: "success",
      message: "User registration success",
      name,
      email,
    });
  } catch (error) {
    res.json({
      staus: "error",
      message: error.message,
    });
  }
});
app.patch("/v1/users/patch", (req, res) => {
  try {
    const { name, email, phone } = req.body;
    console.log(name, email, phone);
    res.json({
      status: "success",
      message: "user info updated",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "User cannot be updated now please try again later",
    });
  }
});
app.put("/v1/users/put", (req, res) => {
  const { name, email, phone, password } = req.body;
  console.log(name, email, phone, password);
  res.json({
    status: "success",
    message: "User updated",
    name,
    email,
    phone,
    password,
  });
});

app.get("/v1/tasks", (req, res) => {
  try {
    fs.readFile("./data/task.json", (error, data) => {
      const data1 = JSON.parse(data);
      console.log(data1);
      error
        ? res.json({
            status: "error",
            message: "cant fetch data",
          })
        : res.json({
            status: "success",
            message: "data",
            data1,
          });
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Cannot retrive the data form task.json",
    });
  }
});

app.patch("/v1/tasks/patch/:id", (req, res) => {
  try {
    const id = req.params.id;
    const data = fs.fdatasyncSync("./data/task.json");
    taskList = JSON.parse(data);
    const output = fs.writeFileSync("./data/task.json", JSON.stringify());
  } catch (error) {}
});

app.delete("/v1/tasks/delete/:id", (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const data = fs.readFileSync("./data/task.json");
    const taskList = JSON.parse(data);

    let task = taskList.find((item) => item.id == id);
    updatedTask = {
      ...updatedTask,
      task,
      hour,
      type,
    };

    const output = fs.writeFileSync(
      "./data/task.json",
      JSON.stringify(taskList)
    );

    const successObj = {
      status: "success",
      message: "Task " + id + "updated",
    };

    res.status(200).send(successObj);
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// database
connectMongoDB();

app.listen(PORT, (error) => {
  error
    ? console.log("Server error")
    : console.log(`Server connected at http://localhost:${PORT}`);
});
