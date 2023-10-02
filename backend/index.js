const fetchRiotData = require('./api/riotAPI.js');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json()); 
app.use(cors());

const data = {
  'br': {
    'yano': {
      name: 'Yano',
      iconId: 746,
      level: 26,
    },
  },
  'na': {},
};

// Define your routes here
app.get('/create/:region/:username', async (req, res) => {
  const { region, username } = req.params;
  const usernameNoCaps = username.toLowerCase();
  if (data[region][username]) {
    res.status(200).json({ message: 'OK' });
  } else {
    try {
      const riotData = await fetchRiotData(region, username);
      data[region][usernameNoCaps] = {
        name: riotData.username,
        level: riotData.level,
        iconId: riotData.iconId,
      };
      res.status(200).json({ message: 'OK' });
    } catch (error) {
      console.error('Error adding data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.get('/update/:region/:username', async (req, res) => {
  const { region, username } = req.params;
  const usernameNoCaps = username.toLowerCase();
  if (data[region][username]) {
    try {
      const riotData = await fetchRiotData(region, username);
      data[region][usernameNoCaps] = {
        name: riotData.username,
        level: riotData.level,
        iconId: riotData.iconId,
      };
      res.status(200).json({ message: 'Data updated' });
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(404).json({ error: 'Data not found' });
  }
});

app.get('/read/:region/:username', (req, res) => {
  const { region, username } = req.params;
  const usernameNoCaps = username.toLowerCase();
  if (data[region][usernameNoCaps]) {
    res.status(200).json(data[region][usernameNoCaps]);
  } else {
    res.status(404).json({ error: 'Data not found' });
  }
});

const port = 3001; 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});