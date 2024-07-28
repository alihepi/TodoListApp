const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

// Yeni bir to-do listesi eklemek
const addTable = async (req, res) => {
    const { userId } = req.params;
    const { todoName, todoList } = req.body;

    try {
        const userRef = admin.firestore().collection('User').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).send({ error: 'Kullanıcı bulunamadı' });
        }

        const userData = userDoc.data();

        const newTable = {
            id: uuidv4(),
            todoStatus: false,
            todoDate: new Date().toISOString(),
            todoName,
            todoList
        };

        userData.tables.push(newTable);

        await userRef.update({ tables: userData.tables });

        res.status(201).send({ message: 'Yeni to-do listesi başarıyla eklendi', tables: userData.tables });
    } catch (error) {
        res.status(500).send({ error: 'To-do listesi eklenirken bir hata oluştu' });
    }
};

// Var olan bir to-do listesini güncellemek
const updateTable = async (req, res) => {
    const { userId, tableId } = req.params;
    const { todoStatus, todoName, todoList } = req.body;

    try {
        const userRef = admin.firestore().collection('User').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).send({ error: 'Kullanıcı bulunamadı' });
        }

        const userData = userDoc.data();
        const tableIndex = userData.tables.findIndex(table => table.id === tableId);

        if (tableIndex !== -1) {
            const tableToUpdate = userData.tables[tableIndex];

            if (todoStatus) {
                tableToUpdate.todoStatus = todoStatus;
            }

            if (todoName) {
                tableToUpdate.todoName = todoName;
            }

            if (todoList) {
                tableToUpdate.todoList = todoList;
            }

            userData.tables[tableIndex] = tableToUpdate;

            await userRef.update({ tables: userData.tables });

            res.status(200).send({ message: 'To-do listesi başarıyla güncellendi', tables: userData.tables });
        } else {
            res.status(404).send({ error: 'To-do listesi bulunamadı' });
        }
    } catch (error) {
        console.error("To-do listesi güncellenirken bir hata oluştu:", error);
        res.status(500).send({ error: 'To-do listesi güncellenirken bir hata oluştu' });
    }
};

// Bir to-do listesini silmek
const deleteTable = async (req, res) => {
    const { userId, tableId } = req.params;

    try {
        const userRef = admin.firestore().collection('User').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).send({ error: 'Kullanıcı bulunamadı' });
        }

        const userData = userDoc.data();
        const tableIndex = userData.tables.findIndex(table => table.id === tableId);

        if (tableIndex !== -1) {
            userData.tables.splice(tableIndex, 1);

            await userRef.update({ tables: userData.tables });

            res.status(200).send({ message: 'To-do listesi başarıyla silindi', tables: userData.tables });
        } else {
            res.status(404).send({ error: 'To-do listesi bulunamadı' });
        }
    } catch (error) {
        res.status(500).send({ error: 'To-do listesi silinirken bir hata oluştu' });
    }
};

module.exports = { addTable, updateTable, deleteTable };
