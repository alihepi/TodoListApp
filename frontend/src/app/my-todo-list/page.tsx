"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Todo from "@/components/Todo";

const ITEMS_PER_PAGE = 3; // Her sayfada gösterilecek öğe sayısı

export default function Home() {
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [todos, setTodos] = useState([]); // Todos'u state olarak yönetin

    useEffect(() => {
        // localStorage'dan kullanıcı bilgisini al
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUser(user);
            setTodos(user.tables.sort((a, b) => new Date(b.todoDate) - new Date(a.todoDate)));
        }
    }, []);

    useEffect(() => {
        // Kullanıcı güncellenirse, localStorage'yi de güncelle
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setTodos(user.tables.sort((a, b) => new Date(b.todoDate) - new Date(a.todoDate)));
        }
    }, [user]);

    if (!user) {
        return <div>Loading...</div>; // Kullanıcı verileri yüklenene kadar bekle
    }

    const maxPage = Math.ceil(todos.length / ITEMS_PER_PAGE) - 1;

    const handleNext = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage));
    };

    const handlePrev = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const currentTodos = todos.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    return (
        <div className="d-flex flex-column gap-2">
            <Navbar loggedIn={true} />

            <div className="my-todo-list-page d-flex float-left align-items-center justify-content-between">
                <span onClick={handlePrev} className={`lists-btn ${currentPage === 0 ? 'inactive' : 'active'}`}>
                    <i className="bi bi-chevron-compact-left"></i>
                </span>

                <div className="d-flex float-left gap-5">
                    {currentTodos.map((todo, index) => (
                        <Todo key={index} todoList={todo} setUser={setUser}/>
                    ))}
                </div>

                <span onClick={handleNext} className={`lists-btn ${maxPage === 0 ? 'inactive' : 'active'}`}>
                    <i className="bi bi-chevron-compact-right"></i>
                </span>
            </div>

            <Footer loggedIn={true} />
        </div>
    );
}
