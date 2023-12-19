const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const adminRoute = require('./routes/adminRoute');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware')


const app = express();

// middleware
app.use(express.static('public'));
app.use('/userImages', express.static('public/userImages'));
app.use(express.json());
app.use(cookieParser())

// pour l'encyclopedie

const encyclopedia = [
  { title: 'Algèbre linéaire', downloadLink: '/downloads/nosql.pdf' },
  { title: 'Calcul différentiel', downloadLink: '/downloads/calcul_differentiel.pdf' },
  { title: 'Structures de données', downloadLink: '/downloads/structures_de_donnees.pdf' },
  { title: 'Structures de données', downloadLink: '/downloads/structures_de_donnees.pdf' },
  { title: 'Structures de données', downloadLink: '/downloads/structures_de_donnees.pdf' },
  { title: 'Structures de données', downloadLink: '/downloads/structures_de_donnees.pdf' },
  { title: 'Structures de données', downloadLink: '/downloads/structures_de_donnees.pdf' },
  { title: 'Structures de données', downloadLink: '/downloads/structures_de_donnees.pdf' },
  { title: 'Structures de données', downloadLink: '/downloads/structures_de_donnees.pdf' },
  { title: 'Structures de données', downloadLink: '/downloads/structures_de_donnees.pdf' },
  { title: 'Structures de données', downloadLink: '/downloads/structures_de_donnees.pdf' },
  { title: 'Structures de données', downloadLink: '/downloads/structures_de_donnees.pdf' },
  { title: 'Structures de données', downloadLink: '/downloads/structures_de_donnees.pdf' },
  { title: 'Structures de données', downloadLink: '/downloads/structures_de_donnees.pdf' },
  { title: 'Structures de données', downloadLink: '/downloads/structures_de_donnees.pdf' },
  { title: 'Structures de données', downloadLink: '/downloads/structures_de_donnees.pdf' },
  { title: 'Structures de données', downloadLink: '/downloads/structures_de_donnees.pdf' }, 
  { title: 'Structures de données', downloadLink: '/downloads/structures_de_donnees.pdf' },
  { title: 'Structures de données', downloadLink: '/downloads/structures_de_donnees.pdf' }

  
];

// view engine 
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://127.0.0.1:27017/authdb';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(5000))
  .catch((err) => console.log(err));

// routesn

  

app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth , (req, res) => res.render('smoothies')); 
app.use(authRoutes)
app.use('/admin', adminRoute)
app.get('/bibliotheque', (req, res) => {
  res.render('bibliotheque', { encyclopedia });
});

app.get('/downloads/:filename', (req, res) => {
  const { filename } = req.params;
  res.download(`./downloads/${filename}`);
});
app.get('/admindash', (req, res) => res.render('admindash'));
 