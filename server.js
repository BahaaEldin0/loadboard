const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const { connect, close, getCollection, addClient, addCompany, addShipment, deleteClient, deleteCompany, deleteShipment } = require('./helpers');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/testdb', (req, res) => {
    try{
        connect();
        res.send('Connected to database');
    } catch (error) {
        res.send('Error connecting to database');
    }
}
);

app.get('/collection', (req, res) => {
    const collection = req.query.collection;
    const response = getCollection(collection).find({}).toArray();
    res.send(response);
}
);

app.post('/addclient', async (req, res) => {
    try {
        const client = req.body;
        const clientId = await addClient(client);
        const clientIdString = clientId.toString();
        res.send({ message: 'Client added', clientId: clientIdString });
    } catch (error) {
        res.status(500).send({ message: 'Error adding client', error: error.message });
    }
});

app.post('/addcompany', async (req, res) => {
    try {
        const company = req.body;
        const companyId = await addCompany(company);
        const companyIdString = companyId.toString();
        res.send({ message: 'Company added', companyId: companyIdString });
    } catch (error) {
        res.status(500).send({ message: 'Error adding company', error: error.message });
    }
});

app.post('/addshipment', async (req, res) => {
    try {
        const shipment = req.body;
        const shipmentId = await addShipment(shipment);
        const shipmentIdString = shipmentId.toString();
        res.send({ message: 'Shipment added', shipmentId: shipmentIdString });
    } catch (error) {
        res.status(500).send({ message: 'Error adding shipment', error: error.message });
    }
});


app.delete('/deleteclient', (req, res) => {
    const client = req.body;
    deleteClient(client);
    res.send('Client deleted');
}
);

app.delete('/deletecompany', (req, res) => {
    const company = req.body;
    deleteCompany(company);
    res.send('Company deleted');
}
);

app.delete('/deleteshipment', (req, res) => {
    const shipment = req.body;
    deleteShipment(shipment);
    res.send('Shipment deleted');
}
);





app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

