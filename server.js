const express = require('express');
const app = express();
const axios = require('axios');

app.get('/api/karma', (req, res) => {
  res.redirect(308, '/api/signs');
});

app.post('/api/signs', async (req, res) => {
  try {
   
