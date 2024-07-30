import http from "./httpCommon";

class TodoListAppDataService {
    // Genel ---------------->
    // Kayıt Ol
    register(data) {
        return http.post("/register", data);
    }
    // Giriş Yap
    login(data) {
        return http.post("/login", data);
    }

    // Kullanıcı Bilgileri ---------------->
    // Hesap Bilgileri Getir
    getUser(id) {
        return http.get(`/user/${id}`);
    }
    // Hesap Bilgileri Güncelle
    updateUser(data, id) {
        return http.put(`/user/${id}`, data);
    }
    // Hesap Sil
    deleteUser(id) {
        return http.delete(`/user/${id}`);
    }

    // Todo List ---------------->
    // Todo List Ekle
    addTodoList(data, userId) {
        return http.post(`/user/${userId}/tables`, data);
    }
    // Todo List Güncelle
    updateTodoList(data, userId, tableId) {
        return http.put(`/user/${userId}/tables/${tableId}`, data);
    }
    // Todo List Sil
    deleteTodoList(userId, tableId) {
        return http.delete(`/user/${userId}/tables/${tableId}`);
    }

    // Görev Durumunu Güncelle
    updateTaskStatus(userId, tableId, taskId, status) {
        return http.patch(`/users/${userId}/tables/${tableId}/tasks/${taskId}`, { status });
    }
    
}

export default new TodoListAppDataService();