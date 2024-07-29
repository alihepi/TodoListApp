'use client'

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TodoListAppDataService from '@/services/TodoListAppDataService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const surname = event.target.surname.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        
        const data = {
            name,
            surname,
            email,
            password
        };

        try {
            const response = await TodoListAppDataService.register(data);
            console.log("Hesap başarıyla oluşturuldu:", response.data.message);
            
            // Kullanıcı bilgilerini localStorage'a kaydet
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('userid', JSON.stringify(response.data.user.id));
            
            // Yönlendirme işlemi
            router.push('/my-todo-list');
        } catch (error) {
            console.error("Kayıt işlemi sırasında hata oluştu:", error);
        }
    }

    return (
        <div className="d-flex flex-column gap-2 main-page">
            <Navbar />
            <div className="home-page d-flex flex-column align-items-center justify-content-center">
                {/* Kayıt Bilgileri */}
                <div className="d-flex flex-column gap-4 login-set">
                    <h2 className="text-center">Kayıt Ol</h2>
                    <form className="d-flex flex-column gap-2 login-form" onSubmit={handleSubmit}>
                        <span className="int-text">İsim</span>
                        <input type="text" placeholder="İsminiz" name="name" />
                        <span className="int-text">Soyisim</span>
                        <input type="text" placeholder="Soyisminiz" name="surname" />
                        <span className="int-text">E-Posta</span>
                        <input type="text" placeholder="E-posta adresiniz" name="email" />
                        <span className="int-text">Şifre {'(En az 8 karakter)'}</span>
                        <input type="password" placeholder="Lütfen bir şifre belirleyiniz" name="password" />
                        <span className="d-flex float-left justify-content-end gap-2 mt-2 login-btns">
                            <Link className="btn btn-primary" href={`/login`}>Giriş Yap</Link>
                            <button className="btn btn-primary" type="submit">Kayıt Ol</button>
                        </span>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
