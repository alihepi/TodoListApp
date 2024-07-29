import React from 'react';
import TodoListAppDataService from '@/services/TodoListAppDataService';

const Todo = ({ todoList, setUser }) => {
    // localStorage'dan kullanıcı id'sini al
    const uid = localStorage.getItem('userid') ? JSON.parse(localStorage.getItem('userid')) : null;

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
                // Kullanıcı verilerini tekrar almak ve localStorage'yi güncellemek
                const response = await TodoListAppDataService.getUser(uid);
                const updatedUser = response.data;
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser); // Kullanıcıyı güncelle
            } catch (error) {
                console.error('Silme işlemi sırasında bir hata oluştu:', error);
            }
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
                            <input type='checkbox' className='task-checkbox' checked={todoTask.status} />
                            <span className='task-text'>{todoTask.taskText}</span>
                        </span>
                    ))}
                </span>

                <span className='full-w d-flex align-items-center justify-content-end fs-4 gap-3'>
                    <span><i className="bi bi-pen-fill"></i></span>
                    <span onClick={handleDelete} style={{ cursor: 'pointer' }}><i className="bi bi-trash-fill"></i></span>
                </span>
            </div>
        </div>
    );
}

export default Todo;
