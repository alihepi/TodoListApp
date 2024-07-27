'use client'

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {

    const router = useRouter();

    const toTodoApp = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log('E-posta:', email);
        console.log('Şifre:', password);
        router.push('/my-todo-list');
    }
    

    return (
        <div className="d-flex flex-column gap-2 main-page">

            <Navbar />

            <div className="home-page d-flex flex-column align-items-center justify-content-center">
                {/*Giriş Bilgileri*/}
                <div className="d-flex flex-column gap-4 login-set">
                    <h2 className="text-center">Giriş Yap</h2>
                    <form className="d-flex flex-column gap-2 login-form" onSubmit={toTodoApp}>
                        <span className="int-text">E-Posta</span>
                        <input type="text" placeholder="E-posta" name="email" />
                        <span className="int-text">Şifre</span>
                        <input type="password" placeholder="Şifre" name="password" />
                        <span className="d-flex float-left justify-content-end gap-2 mt-2 login-btns">
                            <Link className="btn btn-primary" href={`/register`}>Kayıt Ol</Link>
                            <button className="btn btn-primary" type="submit">Giriş Yap</button>
                        </span>
                    </form>
                </div>
            </div>

            <Footer />

        </div>
    );
}
