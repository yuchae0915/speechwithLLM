const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.post('/chat', (req, res) => {
    const apiUrl = 'https://chatdev.gai.tw/v1.0/chat/completions';

    axios.post(apiUrl, req.body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer a0660aab4e2a2aa4722080127747bb4935f6652551eb6584d744c7862032453d'
        }
    })
        .then(response => {
            console.log('Received response:', response.data);
            res.json(response.data);

        })
        .catch(error => {
            console.log('Request failed with error:', error);
            res.status(error.response.status).send(error.message);
        });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
