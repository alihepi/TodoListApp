'use client'

import PrivateRoute from '@/components/PrivateRoute';
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from 'next/navigation';
import TodoListAppDataService from '@/services/TodoListAppDataService';

export default function Home() {
    const router = useRouter();

    // Kullanıcı bilgilerini localStorage'dan al
    const getUserFromLocalStorage = () => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                return JSON.parse(user);
            } catch (error) {
                console.error('Kullanıcı verisi işlenirken bir hata oluştu:', error);
                return null;
            }
        }
        return null;
    };

    const user = getUserFromLocalStorage();

    const [name, setName] = useState(user ? user.name : '');
    const [surname, setSurname] = useState(user ? user.surname : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [password, setPassword] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [defaultTasks, setDefaultTasks] = useState('incomplete');
    const [accountInf, setAccountInf] = useState('none');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [completedCount, setCompletedCount] = useState(0); // Yeni state

    const handleUserInformation = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Kullanıcı Bilgileri:', { name, surname, email, password });

        // Güncellenmiş kullanıcı verisi
        const updatedUserData = { name, surname, email, password };

        try {
            const usid = localStorage.getItem('userid');
            const uid = usid ? JSON.parse(usid) : null;

            // Kullanıcı bilgilerini güncelle
            await TodoListAppDataService.updateUser(updatedUserData, uid);
            alert('Kullanıcı bilgileri başarıyla güncellendi.');

            // Güncellenmiş kullanıcı bilgilerini al
            const response = await TodoListAppDataService.getUser(uid);
            const updatedUser = response.data;

            // Güncellenmiş kullanıcı bilgilerini localStorage'a kaydet
            localStorage.setItem('user', JSON.stringify(updatedUser));

            // Formdaki değerleri güncellenmiş kullanıcı bilgilerine göre yeniden ayarla
            setName(updatedUser.name);
            setSurname(updatedUser.surname);
            setEmail(updatedUser.email);
            // Şifreyi temizle
            setPassword('');

        } catch (error) {
            console.error('Kullanıcı bilgileri güncellenirken bir hata oluştu:', error);
        }
    };

    const handleDeleteUser = async () => {
        // Kullanıcıdan onay al
        const confirmed = window.confirm('Hesabınızı silmek üzeresiniz. Bu işlemi onaylıyor musunuz?');
        if (!confirmed) return;

        const usid = localStorage.getItem('userid');
        const uid = usid ? JSON.parse(usid) : null;

        try {
            await TodoListAppDataService.deleteUser(uid);

            alert('Hesabınız başarıyla silindi.');
            // Kullanıcıyı silme işlemi başarılı olduktan sonra localStorage'ı temizle
            localStorage.removeItem('user');
            localStorage.removeItem('userid');

            // Başarı durumunda yönlendirme
            router.push('/');
        } catch (error) {
            console.error('Kullanıcı silinirken bir hata oluştu:', error);
        }
    };

    useEffect(() => {
        const user = getUserFromLocalStorage();
        if (user) {
            setName(user.name);
            setSurname(user.surname);
            setEmail(user.email);
        }

        // Tamamlanan görev sayısını getir
        const fetchCompletedCount = async () => {
            const usid = localStorage.getItem('userid');
            const uid = usid ? JSON.parse(usid) : null;
            try {
                const response = await TodoListAppDataService.getCompletedCount(uid);
                setCompletedCount(response.data.completedCount);
            } catch (error) {
                console.error('Tamamlanan görev sayısı alınırken bir hata oluştu:', error);
            }
        };

        fetchCompletedCount();
    }, []);

    const backMainPage = () => {
        router.push('/my-todo-list');
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const setCompIncomp = (taskType: string) => {
        setDefaultTasks(taskType);
    };

    const accountToggle = () => {
        setAccountInf(prev => (prev === 'none' ? 'block' : 'none'));
    };

    const handleAddTodo = () => {
        setIsModalOpen(true); // Modal'ı aç
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userid');
        router.push('/');
    };

    return (
        <PrivateRoute>
            <div className="d-flex flex-column gap-2 main-page">
                <Navbar/>
                <div className="my-todo-list-page d-flex flex-column align-items-center justify-content-center">
                    <span onClick={backMainPage} className="back-main-page fs-5 d-flex align-items-center gap-2 font-bold">
                        <i className="fs-4 bi bi-arrow-left-square-fill"></i> Anasayfa
                    </span>
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
                                <button className="btn btn-danger" type="button" onClick={handleDeleteUser}>Hesabı Sil</button>
                                <button className="btn btn-primary" type="submit">Değişiklikleri Kaydet</button>
                            </span>
                        </form>
                    </div>
                </div>
                <Footer loggedIn={!!user} completedCount={completedCount} />
            </div>
        </PrivateRoute>
    );
}
