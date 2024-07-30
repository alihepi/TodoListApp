const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const redisClient = require('../redisClient');

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
        
        // Her bir todoList ögesine UUID ekleyin
        const updatedTodoList = todoList.map(item => ({
            ...item,
            id: uuidv4()
        }));

        const newTable = {
            id: uuidv4(),
            todoStatus: false,
            todoDate: new Date().toISOString(),
            todoName,
            todoList: updatedTodoList // Güncellenmiş todoList'i kullanın
        };

        userData.tables.push(newTable);
        await userRef.update({ tables: userData.tables });

        // Cache'i güncelle
        await redisClient.hSet(`user:${userId}`, newTable.id, JSON.stringify(newTable));

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
            // Mevcut tabloyu güncelle
            if (todoStatus !== undefined) userData.tables[tableIndex].todoStatus = todoStatus;
            if (todoName) userData.tables[tableIndex].todoName = todoName;
            
            if (todoList) {
                // Her bir todoList ögesine UUID ekleyin veya var olan UUID'leri koruyun
                userData.tables[tableIndex].todoList = todoList.map(item => ({
                    ...item,
                    id: item.id || uuidv4() // Var olan id varsa, onu koru; yoksa yeni UUID oluştur
                }));
            }

            await userRef.update({ tables: userData.tables });

            // Cache'i güncelle
            await redisClient.hSet(`user:${userId}`, tableId, JSON.stringify(userData.tables[tableIndex]));

            res.status(200).send({ message: 'To-do listesi başarıyla güncellendi', tables: userData.tables });
        } else {
            res.status(404).send({ error: 'To-do listesi bulunamadı' });
        }
    } catch (error) {
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

            // Cache'i güncelle
            await redisClient.hDel(`user:${userId}`, tableId);

            res.status(200).send({ message: 'To-do listesi başarıyla silindi', tables: userData.tables });
        } else {
            res.status(404).send({ error: 'To-do listesi bulunamadı' });
        }
    } catch (error) {
        res.status(500).send({ error: 'To-do listesi silinirken bir hata oluştu' });
    }
};

// Görev durumunu güncellemek
const updateTaskStatus = async (req, res) => {
    const { userId, tableId, taskId } = req.params;
    const { status } = req.body; // Görev durumu (true/false) gönderilmeli

    try {
        const userRef = admin.firestore().collection('User').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).send({ error: 'Kullanıcı bulunamadı' });
        }

        const userData = userDoc.data();
        const tableIndex = userData.tables.findIndex(table => table.id === tableId);

        if (tableIndex !== -1) {
            // Görevi güncelle
            const taskIndex = userData.tables[tableIndex].todoList.findIndex(task => task.id === taskId);

            if (taskIndex !== -1) {
                userData.tables[tableIndex].todoList[taskIndex].status = status;

                // Görevlerin tamamlanıp tamamlanmadığını kontrol et
                const allTasksCompleted = userData.tables[tableIndex].todoList.every(task => task.status === true);
                if (allTasksCompleted) {
                    userData.tables[tableIndex].todoStatus = true;
                } else {
                    userData.tables[tableIndex].todoStatus = false;
                }

                await userRef.update({ tables: userData.tables });

                // Cache'i güncelle
                await redisClient.hSet(`user:${userId}`, tableId, JSON.stringify(userData.tables[tableIndex]));

                res.status(200).send({ message: 'Görev durumu başarıyla güncellendi', tables: userData.tables });
            } else {
                res.status(404).send({ error: 'Görev bulunamadı' });
            }
        } else {
            res.status(404).send({ error: 'To-do listesi bulunamadı' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Görev durumu güncellenirken bir hata oluştu' });
    }
};


module.exports = { addTable, updateTable, updateTaskStatus, deleteTable };
