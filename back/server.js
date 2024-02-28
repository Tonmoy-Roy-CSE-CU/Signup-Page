const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '', // Set your actual MySQL password here
    database: 'register'
});

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS login (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    )
`;

db.query(createTableQuery, (err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Table 'login' created or already exists");
    }
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [name, email, password];

    db.query(sql, values, (err, data) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Email address is already in use' });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(201).json({ success: true, data });
    });
});

app.listen(8081, '0.0.0.0',() => {
    console.log("Server is running at port 8081...");
});
