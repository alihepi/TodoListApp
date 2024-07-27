'use client'

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from 'next/navigation';

export default function Home() {

    const router = useRouter();

    const [name, setName] = useState('Ali');
    const [surname, setSurname] = useState('Mutlu');
    const [email, setEmail] = useState('alihappyprojects@gmail.com');
    const [password, setPassword] = useState('');

    const handleUserInformation = (event) => {
        event.preventDefault();
        console.log('User Information:', { name, surname, email, password });
        router.push('/my-todo-list');
    }

    return (
        <div className="d-flex flex-column gap-2 main-page">

            <Navbar />

            <div className="my-todo-list-page d-flex flex-column align-items-center justify-content-center">
                {/* Kayıt Bilgileri */}
                <div className="d-flex flex-column gap-4 login-set account-set">
                    <h2 className="text-center">{'Hesap Bilgileri'}</h2>

                    <form className="d-flex flex-column gap-2 login-form" onSubmit={handleUserInformation}>
                        <span className="int-text">İsim</span>
                        <input 
                            type="text" 
                            placeholder="İsminiz" 
                            name="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <span className="int-text">Soyisim</span>
                        <input 
                            type="text" 
                            placeholder="Soyisminiz" 
                            name="surname" 
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        <span className="int-text">E-Posta</span>
                        <input 
                            type="text" 
                            placeholder="E-posta adresiniz" 
                            name="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="int-text">Şifre {'(En az 8 karakter)'}</span>
                        <input 
                            type="password" 
                            placeholder="Lütfen bir şifre belirleyiniz" 
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <span className="d-flex float-left justify-content-end gap-2 mt-2 login-btns">
                            <button className="btn btn-danger" type="button">Hesabı Sil</button>
                            <button className="btn btn-primary" type="submit">Değişiklikleri Kaydet</button>
                        </span>
                    </form>

                </div>
            </div>

            <Footer />

        </div>
    );
}
