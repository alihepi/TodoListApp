"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Todo from "@/components/Todo";
import ModalTodo from "@/components/ModalTodo";

const ITEMS_PER_PAGE = 3; // Her sayfada gösterilecek öğe sayısı

export default function Home() {
    const [currentPage, setCurrentPage] = useState(0);

    const todos = [...Array(3).keys()]; // 13 öğeden oluşan bir dizi simüle ediliyor

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
                        <Todo key={index} />
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
