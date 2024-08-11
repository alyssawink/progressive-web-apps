const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 10000;

const root = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(root));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/htmlRoutes")(app);

console.log(`Static files served from: ${root}`);

app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server listening on port: ${PORT}`)
);