"use client";

import React, { useState, useEffect } from "react";
import PrivateRoute from '@/components/PrivateRoute';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Todo from "@/components/Todo";
import ModalTodo from "@/components/ModalTodo";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 3; // Her sayfada gösterilecek öğe sayısı

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal kontrolü için boolean state kullanın
    const router = useRouter();

    const [compIncomp, setCompIncomp] = useState('incomplete'); // 'incomplete' ya da 'completed'
    const [searchTerm, setSearchTerm] = useState(''); // Arama terimi
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [todos, setTodos] = useState([]); // Todos'u state olarak yönetin
    const [completedCount, setCompletedCount] = useState(0); // Tamamlanan görevlerin sayısını tutacak state

    useEffect(() => {
        // localStorage'dan kullanıcı bilgisini al
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUser(user);
            updateTodos(user, compIncomp, searchTerm); // Verileri güncelle
        }
    }, [compIncomp, searchTerm]);

    useEffect(() => {
        // Kullanıcı güncellenirse, localStorage'yi de güncelle
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            updateTodos(user, compIncomp, searchTerm); // Verileri güncelle
        }
    }, [user]);

    useEffect(() => {
        // Sayfa yüklendiğinde tamamlanan görevlerin sayısını hesapla
        if (user) {
            const completedTodos = user.tables.filter(todo => todo.todoStatus === true);
            setCompletedCount(completedTodos.length);
        }
    }, [user]);

    const maxPage = Math.ceil(todos.length / ITEMS_PER_PAGE) - 1;

    const handleNext = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage));
    };

    const handlePrev = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const updateTodos = (user, status, search) => {
        let filteredTodos = user.tables;

        // Görev durumuna göre filtreleme
        if (status === 'completed') {
            filteredTodos = filteredTodos.filter(table => table.todoStatus === true);
        } else {
            filteredTodos = filteredTodos.filter(table => table.todoStatus === false);
        }

        // Arama terimine göre filtreleme
        if (search) {
            filteredTodos = filteredTodos.filter(todo => todo.todoName.toLowerCase().includes(search.toLowerCase()));
        }

        setTodos(filteredTodos.sort((a, b) => new Date(b.todoDate) - new Date(a.todoDate)));
    };

    const currentTodos = todos.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleUpdate = (updatedUser) => {
        setUser(updatedUser);
    };

    return (
        <PrivateRoute>
            <div className="d-flex flex-column gap-2">
                <Navbar
                    setIsModalOpen={setIsModalOpen}
                    loggedIn={true}
                    setCompIncomp={setCompIncomp}
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                />

                <div className="my-todo-list-page d-flex float-left align-items-center justify-content-between">
                    <span onClick={handlePrev} className={`lists-btn ${currentPage === 0 ? 'inactive' : 'active'}`}>
                        <i className="bi bi-chevron-compact-left"></i>
                    </span>

                    <div className="d-flex float-left gap-5">
                        {currentTodos.map((todo, index) => (
                            <Todo key={index} todoList={todo} setUser={setUser} />
                        ))}
                    </div>

                    <span onClick={handleNext} className={`lists-btn ${maxPage === 0 ? 'inactive' : 'active'}`}>
                        <i className="bi bi-chevron-compact-right"></i>
                    </span>
                </div>

                <Footer loggedIn={true} completedCount={completedCount}/>

                {isModalOpen && <ModalTodo setIsOpen={setIsModalOpen} onUpdate={handleUpdate} />}
            </div>
        </PrivateRoute>
    );
}
