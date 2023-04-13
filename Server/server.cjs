const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: ['http://localhost:3000'],
  method: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db = require('./models');
const Role = db.role;

mongoose.set('strictQuery', false)

db.mongoose
.connect(`mongodb+srv://KamalGuidadou:eDAds7gRkZJzBzBl@cluster0.7o1fsht.mongodb.net/Sante_Connect_TS-React?retryWrites=true&w=majority`, 
{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connect to MongoDB.");
  initial();
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

app.get("/", (req, res) => {
  res.json({message: "Bienvenue sur l'application Santé Connect"})
});

require('./routes/authRouter')(app);
require('./routes/userRouter')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() { 
  
  Role.estimatedDocumentCount((err, count) => {
    
    // Création du rôle 'utilisateur'
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });
      // Création du rôle  'modérateur'
      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });
      // Création du rôle 'administrateur'
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
};