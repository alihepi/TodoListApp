import React from 'react';
import TodoListAppDataService from '@/services/TodoListAppDataService';
import { getUserFromLocalStorage } from '@/helpers';

const Todo = ({ todoList, setUser }) => {
    const user = getUserFromLocalStorage();
    const usid = localStorage.getItem('userid');
    const uid = usid ? JSON.parse(usid) : null;

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    const handleDelete = async () => {
        if (!uid) {
            console.error('Kullanıcı ID bulunamadı');
            return;
        }

        const isConfirmed = window.confirm('Bu görevi silmek istediğinizden emin misiniz?');
        if (isConfirmed) {
            try {
                await TodoListAppDataService.deleteTodoList(uid, todoList.id);
                console.log('Silme işlemi başarılı');
                const response = await TodoListAppDataService.getUser(uid);
                const updatedUser = response.data;
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
            } catch (error) {
                console.error('Silme işlemi sırasında bir hata oluştu:', error);
            }
        }
    }

    const handleTaskStatusChange = async (taskId, currentStatus) => {
        if (!uid) {
            console.error('Kullanıcı ID bulunamadı');
            return;
        }

        try {
            // Görevin yeni durumunu belirle
            const newStatus = !currentStatus;

            // Görevin durumunu backend'e güncelle
            await TodoListAppDataService.updateTaskStatus(uid, todoList.id, taskId, newStatus);
            
            // Güncellenmiş to-do listesini al
            const response = await TodoListAppDataService.getUser(uid);
            const updatedUser = response.data;

            // Kullanıcı bilgilerini güncelle
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
        } catch (error) {
            console.error('Görev durumu güncellenirken bir hata oluştu:', error);
        }
    }

    return (
        <div className="d-flex float-left align-items-center justify-content-between todo-list-main">
            <span className="d-flex flex-column gap-3 page-dot">
                {[...Array(13)].map((_, index) => (
                    <span key={index}><i className="bi bi-heptagon-fill"></i></span>
                ))}
            </span>

            <div className="d-flex flex-column align-items-center justify-content-between todo-list-main">
                <span className='full-w d-flex float-left align-items-center justify-content-between list-header'>
                    <span className='font-bold fs-5'>{todoList.todoName}</span>
                    <span>{formatDate(todoList.todoDate)}</span>
                </span>

                <span className='mt-2 d-flex flex-column gap-2 full-w align-items-start justify-content-start todo-list-tasks'>
                    {todoList.todoList.map((todoTask, index) => (
                        <span key={index} className='d-flex full-w float-left align-items-center gap-2 todo-list-tasks-task'>
                            <input 
                                type='checkbox' 
                                className='task-checkbox' 
                                checked={todoTask.status} 
                                onChange={() => handleTaskStatusChange(todoTask.id, todoTask.status)}
                            />
                            <span className='task-text'>{todoTask.taskText}</span>
                        </span>
                    ))}
                </span>

                <span className='full-w d-flex align-items-center justify-content-end fs-4 gap-3'>
                    <span onClick={handleDelete} style={{ cursor: 'pointer' }}><i className="bi bi-trash-fill"></i></span>
                </span>
            </div>
        </div>
    );
}

export default Todo;
