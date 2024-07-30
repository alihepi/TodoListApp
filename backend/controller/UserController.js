const admin = require('firebase-admin');
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, surname, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRef = admin.firestore().collection('User').doc(id);

        if(name){
            await userRef.update({ name });
        }
        if(surname){
            await userRef.update({ surname });
        }
        if(email){
            await userRef.update({ email });
        }
        if(password){
            await userRef.update({ password: hashedPassword });
        }
        
        res.status(200).send({ message: 'Kullanıcı başarıyla güncellendi' });
    } catch (error) {
        res.status(500).send({ error: 'Kullanıcı güncellenirken bir hata oluştu' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const userRef = admin.firestore().collection('User').doc(id);
        await userRef.delete();
        res.status(200).send({ message: 'Kullanıcı başarıyla silindi' });
    } catch (error) {
        res.status(500).send({ error: 'Kullanıcı silinirken bir hata oluştu' });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const userRef = admin.firestore().collection('User').doc(id);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).send({ error: 'Kullanıcı bulunamadı' });
        }

        res.status(200).send(userDoc.data());
    } catch (error) {
        res.status(500).send({ error: 'Kullanıcı bilgileri getirilirken bir hata oluştu' });
    }
};

module.exports = { updateUser, deleteUser, getUser };