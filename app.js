/* eslint-disable no-console */
const { join } = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(join(__dirname, "dist")));

app.use((_, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

const portNo = process.env.PORT_NO || 3000;
const svcNm = process.env.SVC_NM || "custom";
app.listen(portNo, () => console.log(`${svcNm} web ui service on port ${portNo}`));
