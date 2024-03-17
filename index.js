

var express = require('express');
const path = require("path")
var ejs = require('ejs')
const MongoClient = require('mongodb').MongoClient;
const axios = require('axios')
var app = express();
const cors = require('cors')
require('./db/db')

app.use(cors())
app.use(express.json())

// Serve static files using express.static
app.use(express.static(path.join(__dirname, './public')));


app.set('view engine', 'ejs');

// app.listen(5000, () => {
//     console.log("Server is running on port 5000");
// });

// Explicitly set the MIME type for script.js
app.get('/public/js/script.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname, 'public', 'js', 'script.js'));
});

app.use('/css', express.static(path.join(__dirname, 'css')));
app.get('/css/main.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'css', 'main.css'));
  });
  

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/about', (req, res) => {
    res.render('pages/about');
});

app.get('/contact', (req, res) => {
    res.render('pages/contact');
});

const Doner = require("./routes/donor.route");
app.use(Doner);
const Done = require("./models/donor.models");
app.get('/getData', async (req, res) => {
    try {
        // 
        // const client = await MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        // const db = client.db('Cluster0');
        // const collection = db.collection('test.a_doners');

        // const result = await collection.find({age:20}).toArray();
        // res.json(result);

        // client.close();
        const users = await Done.find({bloodType:'c' && 'e'});
        res.json(users)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.post('/chooseBloodType', async (req, res) => {
//     const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

//     res.json({ message: 'Choose blood type', options: bloodTypes });
// });
// app.post('/searchByBloodType', async (req, res) => {
//     const selectedBloodType = req.body.selectedBloodType;

//     try {
//         const results = await Done.find({ bloodType: selectedBloodType }).maxTimeMS(30000);
//         res.json({ message: 'Search results', data:results });
//     } catch (error) {
//         console.error('Error searching in database:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });



// app.post('/chooseBloodType', (req, res) => {
//     const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
//     res.json({ message: 'Choose blood type', options: bloodTypes });
// });

app.post('/searchByBloodType', async (req, res) => {
    try {
        const selectedBloodType = req.body.selectedBloodType;
        const results = await Done.find({ bloodType: selectedBloodType }).maxTimeMS(30000);
        res.json({ message: 'Search results', data: results });
    } catch (error) {
        console.error('Error searching in database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.post('/searchByBloodType', async (req, res) => {
//     const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

    
//     const resultsByBloodType = {};
//     const bloodAmounts = {};

//     try {
        
//         const selectedBloodType = req.body.selectedBloodType;

    
//         const results = await Done.find({ bloodType: selectedBloodType }).maxTimeMS(30000);

        
//         const totalBloodAmount = results.reduce((total, donor) => {
//             return total + donor.bloodAmount;
//         }, 0);

        
//         resultsByBloodType[selectedBloodType] = results;
//         bloodAmounts[selectedBloodType] = totalBloodAmount;

//         res.json({ message: 'Search results', data: resultsByBloodType, bloodAmounts });
//     } catch (error) {
//         console.error('Error searching in database:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

app.post('/searchByBloodTypeForEachHospital', async (req, res) => {
   
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
    // res.json({ message: 'Choose blood type', options: bloodTypes });


    const resultsByBloodType = {};
    const bloodAmounts = {};

    try {
       
        
        const selectedBloodType = req.body.selectedBloodType;
        const selectedHospital = req.body.selectedHospital;

    
        const results = await Done.find({ bloodType: selectedBloodType,hospital:selectedHospital }).maxTimeMS(30000);

        
        const totalBloodAmount = results.reduce((total, donor) => {
            return total + donor.bloodAmount;
        }, 0);

        
        resultsByBloodType[selectedBloodType] = results;
        bloodAmounts[selectedBloodType] = totalBloodAmount;

        res.json({ message: 'Search results', data: resultsByBloodType, bloodAmounts });
    } catch (error) {
        console.error('Error searching in database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






// axios.post('http://localhost:5000/chooseBloodType')
//     .then(response => {
//         console.log('Choose Blood Type:', response.data);
//     })
//     .catch(error => {
//         console.error('Error choosing blood type:', error);
//     });

// const selectedBloodType = 'B-';
// axios.post('http://localhost:5000/searchByBloodType', { selectedBloodType })
//     .then(response => {
//         console.log(`Search results for ${selectedBloodType}:`, response.data);
//     })
//     .catch(error => {
//         console.error('Error searching by blood type:', error);
    // }); 


const port = process.env.PORT || 3000; // استخدام المنفذ المقدم من Heroku أو الافتراضي 3000
app.listen(port, () => {
    console.log(`الخادم يعمل على المنفذ ${port}`);
});
