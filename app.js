const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const fs = require("fs");
const morgan = require('morgan');
const formRoutes = require("./routes/formRoutes");

// INITIALIZE
const app = express();

// Mogan Logger
app.use(morgan('tiny'));

// Charger les variables d'environnement
dotenv.config();

// Creation du dossier public
const publicDir = (req, res, next) => {
  const folderPath = "public/uploads";
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  next();
};

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Public folder
app.use(express.static("public"));

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: err.message });
});

// Routes
app.use("/api/v1/form", publicDir, formRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 ---- API RUNNING ---- ON PORT:${PORT} 🚀`);
});
