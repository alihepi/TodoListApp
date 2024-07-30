'use client'

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TodoListAppDataService from '@/services/TodoListAppDataService';

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
    const router = useRouter();
    const [error, setError] = React.useState(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    try {
        const response = await TodoListAppDataService.login({ email, password });
        console.log('Giriş başarılı:', response.data.message);

        // Kullanıcı bilgilerini localStorage'a kaydet
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userid', JSON.stringify(response.data.user.id));

        // Başarı durumunda yönlendirme
        router.push('/my-todo-list');
    } catch (error) {
        console.error('Giriş işlemi sırasında hata oluştu:', error);
        setError('Giriş başarısız, lütfen bilgilerinizi kontrol edin.');
    }
};


    return (
        <div className="d-flex flex-column gap-2 main-page">
            <Navbar />

            <div className="home-page d-flex flex-column align-items-center justify-content-center">
                {/* Giriş Bilgileri */}
                <div className="d-flex flex-column gap-4 login-set">
                    <h2 className="text-center">Giriş Yap</h2>
                    <form className="d-flex flex-column gap-2 login-form" onSubmit={handleSubmit}>
                        <span className="int-text">E-Posta</span>
                        <input type="text" placeholder="E-posta" name="email" />
                        <span className="int-text">Şifre</span>
                        <input type="password" placeholder="Şifre" name="password" />
                        {error && <p className="error-message">{error}</p>}
                        <span className="d-flex float-left justify-content-end gap-2 mt-2 login-btns">
                            <Link className="btn btn-primary" href={`/register`}>Kayıt Ol</Link>
                            <button className="btn btn-danger" type="submit">Giriş Yap</button>
                        </span>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}
