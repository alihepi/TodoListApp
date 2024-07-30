'use client';

import React, { useState } from 'react';
import TodoListAppDataService from '@/services/TodoListAppDataService';

const ModalTodo = ({ setIsOpen, onUpdate }) => {
    const userId = JSON.parse(localStorage.getItem('userid'));
    const listName = "list-name-null";

    const getFormattedDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const listDate = getFormattedDate();

    const [todoListName, setTodoListName] = useState('');
    const [tasks, setTasks] = useState([...Array(13)].map(() => ({ taskText: '', status: false })));

    const handleTaskChange = (index, value) => {
        const newTasks = [...tasks];
        newTasks[index].taskText = value;
        setTasks(newTasks);
    };

    const handleCheckboxChange = (index, checked) => {
        const newTasks = [...tasks];
        newTasks[index].status = checked;
        setTasks(newTasks);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Boş task'leri filtrele
        const filteredTasks = tasks.filter(task => task.taskText.trim() !== '');

        const data = {
            todoDate: new Date().toISOString(),
            todoName: todoListName,
            todoStatus: false,
            todoList: filteredTasks
        };

        try {
            await TodoListAppDataService.addTodoList(data, userId);
            alert('Todo List başarıyla eklendi');

            // Güncellenmiş kullanıcı bilgilerini al
            const response = await TodoListAppDataService.getUser(userId);
            const updatedUser = response.data;

            // Güncellenmiş kullanıcı bilgilerini localStorage'a kaydet
            localStorage.setItem('user', JSON.stringify(updatedUser));

            // Home bileşenine güncellenmiş verileri bildir
            setIsOpen(false); // Modalı kapat
            onUpdate(updatedUser);
        } catch (error) {
            console.error('Todo List eklenirken bir hata oluştu:', error);
        }
    };

    return (
        <span className="todo-modal d-flex align-items-center justify-content-center" >
            <div className="d-flex float-left align-items-center justify-content-between todo-list-main modal-todo-list">
                <span className="d-flex flex-column gap-3 page-dot">
                    {[...Array(13)].map((_, index) => (
                        <span key={index}>
                            <i className="bi bi-heptagon-fill"></i>
                        </span>
                    ))}
                </span>

                <div className="d-flex flex-column align-items-center justify-content-between todo-list-main">
                    <form onSubmit={handleSubmit} className='full-w'>
                        <span className='full-w d-flex float-left align-items-center justify-content-between list-header'>
                            <span className='font-bold fs-5'>
                                <input
                                    type="text"
                                    className='task-text task-text-inp'
                                    placeholder="Todo List Name"
                                    value={todoListName}
                                    onChange={(e) => setTodoListName(e.target.value)}
                                />
                            </span>
                            <span>{listDate}</span>
                        </span>

                        <span className='mt-2 d-flex flex-column gap-2 full-w align-items-start justify-content-start todo-list-tasks'>
                            {tasks.map((task, index) => (
                                <span key={index} className='d-flex full-w float-left align-items-center gap-2 todo-list-tasks-task'>
                                    <input
                                        type='checkbox'
                                        className='task-checkbox'
                                        checked={task.status}
                                        onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                                    />
                                    <input
                                        type="text"
                                        className='task-text task-text-inp'
                                        value={task.taskText}
                                        onChange={(e) => handleTaskChange(index, e.target.value)}
                                    />
                                </span>
                            ))}
                        </span>

                        <span className='full-w d-flex align-items-center justify-content-end fs-4 gap-3'>
                            <button type="submit" className="btn btn-danger">Kaydet</button>
                            <button onClick={() => setIsOpen(false)} className="btn btn-primary">Kapat</button>
                        </span>
                    </form>
                </div>
            </div>
        </span>
    );
};

export default ModalTodo;