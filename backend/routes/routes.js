const express = require('express');
const router = express.Router();
const { updateUser, deleteUser } = require('../controller/UserController');
const { createUser, loginUser } = require('../controller/Auth');
const { addTable, updateTable, deleteTable } = require('../controller/TableController');

// Create a new user
router.post('/register', createUser);

// Login a user
router.post('/login', loginUser);

// Update a user
router.put('/user/:id', updateUser);

// Delete a user
router.delete('/user/:id', deleteUser);

// Add a new table (to-do list) to a user
router.post('/user/:userId/tables', addTable);

// Update an existing table (to-do list) of a user
router.put('/user/:userId/tables/:tableId', updateTable);

// Delete a table (to-do list) from a user
router.delete('/user/:userId/tables/:tableId', deleteTable);

module.exports = router;
