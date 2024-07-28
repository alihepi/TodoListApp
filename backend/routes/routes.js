const express = require('express');
const router = express.Router();
const { updateUser, deleteUser, getUser } = require('../controller/UserController');
const { createUser, loginUser } = require('../controller/Auth');
const { addTable, updateTable, deleteTable } = require('../controller/TableController');

// Yeni bir kullanıcı oluştur
router.post('/register', createUser);

// Kullanıcı girişi yap
router.post('/login', loginUser);

// Kullanıcı bilgilerini getir
router.get('/user/:id', getUser);

// Hesap bilgilerini güncelle
router.put('/user/:id', updateUser);

// Hesabı sil
router.delete('/user/:id', deleteUser);

// Yeni bir tablo (yapılacaklar listesi) ekle
router.post('/user/:userId/tables', addTable);

// Bir tabloyu (yapılacaklar listesi) güncelle
router.put('/user/:userId/tables/:tableId', updateTable);

// Bir tabloyu (yapılacaklar listesi) sil
router.delete('/user/:userId/tables/:tableId', deleteTable);

module.exports = router;
