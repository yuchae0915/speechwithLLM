const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/chat', (req, res) => {
    const apiUrl = 'https://chatdev.gai.tw/v1.0/chat/completions';

    axios.post(apiUrl, req.body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 53b3ade61f0d840bf6986d59a2581b98c71e5b4f953c55c80bd4bd45d8fb14b2'
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
