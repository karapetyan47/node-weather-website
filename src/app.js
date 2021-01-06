const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Mike',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Mike',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: 'Mike',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location,
        address: req.query.address,
        forecast: forecastData,
      });
    });
  });

  // res.send({
  //   location: req.query.address,
  //   longitude: '1230',
  //   latitude: '852',
  // });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 help',
    name: 'Mike',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Mike',
    errorMessage: 'Page not found',
  });
});

app.listen(7070, () => {
  console.log('Server is up on port 7070!!!');
});
