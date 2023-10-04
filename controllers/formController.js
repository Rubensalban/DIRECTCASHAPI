const { User } = require("../models");

// Enregistrement d'un utilisateur
const register = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const { file } = req;

    // Creation de l'enregistrement
    const newUser = await User.create({
      firstName,
      lastName,
    });

    // Verification du fichier
    if (!file) {
      res.status(400).json({ status: "error", message: "Aucun fichier" });
    } else {
      const profileImageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        file.filename
      }`;
      newUser.photo = profileImageUrl;
      await newUser.save();
    }
    res
      .status(201)
      .json({ status: "success", message: "Compte créé avec succès.", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  register,
};
