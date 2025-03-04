const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.user;
const Vehicule = db.vehicule;
const Client = db.client;
const TypeIntervention = db.typeIntervention;
const Intervention = db.intervention;

module.exports = async function initData() {
  try {
    console.log("Initialisation des données factices dans la db");

    const hashedPassword = await bcrypt.hash("admin1234", 10);
    await User.create({
      username: "admin",
      password: hashedPassword,
      email: "admin@garage.be",
      role: "admin",
    });

    await User.create({
      username: "nono",
      password: hashedPassword,
      email: "nono@fandadri.be",
      role: "user",
    });

    const vidange = await TypeIntervention.create({
      nom: "vidange",
      prix_base: 89.99,
    });

    const freinage = await TypeIntervention.create({
      nom: "Remplacement des plaquettes de freins",
      prix_base: 149.99,
    });

    const client1 = await Client.create({
      nom: "Rodrigo",
      prenom: "Fausto",
      telephone: "0499 99 99 99",
      email: "fausto@plage.ma",
    });

    const client2 = await Client.create({
      nom: "Meunier",
      prenom: "Sandy",
      telephone: "0499 99 99 89",
      email: "sandy@ssms.be",
    });

    const vehicule1 = await Vehicule.create({
      clientId: client1.id,
      immatriculation: "1-ABC-123",
      marque: "Audi",
      modele: "A3",
      annee: 2015,
      type: "berline",
    });

    const vehicule2 = await Vehicule.create({
      clientId: client2.id,
      immatriculation: "1-DEF-456",
      marque: "BMW",
      modele: "X5",
      annee: 2018,
      type: "Suv",
    });

    await Intervention.create({
      vehiculeId: vehicule1.id,
      typeId: freinage.id,
      date_intervention: new Date(2019, 10, 10),
      statut: "terminée",
      prix: vidange.prix_base,
      description: "Vidange de l'audi A3",
    });

    await Intervention.create({
      vehiculeId: vehicule2.id,
      typeId: vidange.id,
      date_intervention: new Date(2020, 10, 10),
      statut: "terminée",
      prix: freinage.prix_base,
      description: "Freinage de la BMW X5",
    });
    console.log("Initialisation des données factices dans la db terminée ✅");
  } catch (error) {
    console.log(
      `Erreur lors de l'initialisation des données dans la db ❌, ${error}`
    );
  }
};
