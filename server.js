const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/save-user', (req, res) => {
    const { name, email, dose, clearance, halfLife, bioavailability } = req.body;
    const userData = `Nom: ${name}, Email: ${email}, Dose: ${dose}, Clairance: ${clearance}, Demi-vie: ${halfLife}, Biodisponibilité: ${bioavailability}\n`;
    
    fs.appendFile(path.join(__dirname, 'users.txt'), userData, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de l\'enregistrement.');
        } else {
            res.send('Informations enregistrées avec succès.');
        }
    });
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});