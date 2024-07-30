const admin = require('firebase-admin');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const { name, surname, email, password } = req.body;

    try {
        // Email'in zaten kullanılıp kullanılmadığını kontrol et
        const userRef = admin.firestore().collection('User').where('email', '==', email);
        const snapshot = await userRef.get();

        if (!snapshot.empty) {
            return res.status(400).send({ error: 'Bu email zaten kullanılıyor' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            name,
            surname,
            email,
            password: hashedPassword,
            AccountCreationDate: new Date().toISOString(),
            tables: []
        };

        const newUserRef = admin.firestore().collection('User').doc();
        await newUserRef.set(user);

        const userData = {
            id: newUserRef.id,  // Kullanıcı kimliğin
            name,
            surname,
            email,
            AccountCreationDate: user.AccountCreationDate,
            tables: user.tables
        };

        console.log('Kullanıcı başarıyla oluşturuldu:', userData); // Başarıyla oluşturulan kullanıcıyı konsola yazdır

        res.status(201).send({ message: 'Kullanıcı başarıyla oluşturuldu', user: userData });
    } catch (error) {
        console.error('Hata ayrıntıları:', error); // Hata detaylarını konsola yazdır
        res.status(500).send({ error: `Kullanıcı oluşturulurken bir hata oluştu: ${error.message}` });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRef = admin.firestore().collection('User').where('email', '==', email);
        const snapshot = await userRef.get();

        if (snapshot.empty) {
            return res.status(404).send({ error: 'Kullanıcı bulunamadı' });
        }

        let user;
        let userId;
        snapshot.forEach(doc => {
            user = doc.data();
            userId = doc.id;
        });

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).send({ error: 'Geçersiz giriş bilgileri' });
        }

        const userData = {
            id: userId,  // Kullanıcı kimliği
            name: user.name,
            surname: user.surname,
            email: user.email,
            AccountCreationDate: user.AccountCreationDate,
            tables: user.tables
        };

        res.status(200).send({ message: 'Giriş başarılı', user: userData });
    } catch (error) {
        console.error('Giriş hatası:', error); // Hata detaylarını konsola yazdır
        res.status(500).send({ error: `Giriş yapılırken bir hata oluştu: ${error.message}` });
    }
};

module.exports = { createUser, loginUser };
