const express = require("express");
const path = require("path");
const { spawn } = require("child_process");
const { time, count } = require("console");
const fs = require("fs");
const { resolve } = require("path");
const { rejects } = require("assert");
const app = express();
const cors = require("cors");
const { type } = require("os");
app.use(cors());

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded());
app.use(express.static("client/public"));
app.use(express.static("client/public2"));
app.use(express.static("client/public3"));
app.use(express.static("client/table2pdf"));

async function delFile(filePath) {
  console.log("checking");
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log("deleted");
  }
}

async function waitForFileExists(filePath, currentTime = 0, timeout = 8000) {
  console.log("checking");
  if (fs.existsSync(filePath)) return true;
  if (currentTime === timeout) return false;
  // wait for 1 second
  await new Promise((resolve, reject) => setTimeout(() => resolve(true), 1000));
  // waited for 1 second
  return waitForFileExists(filePath, currentTime + 1000, timeout);
}

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "public\\web1\\index.html"));
  res.end("hello world");
});

app.post("/ranklist", async (req, res) => {
  // const data = req.query;
  //extracting data

  const data = req.body;

  const air = data["AIR"];
  const cat_rank = data["cat_rank"];
  const category = data["category"];
  // const state = data["state"];
  let genf = "0";
  const gent = data["gen"];
  if (gent == true) {
    genf = "1";
  } else {
    genf = "0";
  }
  const state = "2";
  const gen = genf;

  //extracing data ended

  //creating file

  const childPython = spawn("python", [
    "first.py",
    air,
    cat_rank,
    category,
    state,
    gen,
  ]);
  const filePath = "./table.html";
  console.log("1");
  //first send the required file
  //then appy one fetch call to get new page
  await delFile("./table.html");
  await waitForFileExists("./table.html");
  console.log("2");
  res.sendFile(path.join(__dirname, "./table.html"));
  console.log("3");
});

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
