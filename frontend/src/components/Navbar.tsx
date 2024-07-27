'use client';

import Image from 'next/image';
import todoLogo from '@/images/todo-logo.png';
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = ({ loggedIn = false }) => {

    const [defaultTasks, setDefaultTasks] = useState('completed');
    const [accountInf, setAccountInf] = useState('none');

    const handleTaskChange = (e) => {
        if (e === 'incompletes') {
            setDefaultTasks('incompletes');
        } else {
            setDefaultTasks('completed');
        }
    }

    const handleAccountToggle = () => {
        setAccountInf(prev => (prev === 'none' ? 'block' : 'none'));
    }

    return (
        <div className='container d-flex float-left justify-content-between align-items-center full-w navbar-set'>
            <Image
                src={todoLogo}
                width={75}
                height={75}
                alt="logo"
            />
            {/* Kullanıcı Girişi Kontrolü ile Görev Sekmelerinin Kontrolü */}
            {loggedIn && (
                <>
                    <div className='d-flex float-left task-btns'>
                        <span className={`tasks-btn completed text-center ${defaultTasks === 'completed' ? 'selected-task' : ''}`}
                            onClick={() => handleTaskChange('completed')}>Tamamlanan Görevler</span>
                        <span className={`tasks-btn incompletes text-center ${defaultTasks === 'incompletes' ? 'selected-task' : ''}`}
                            onClick={() => handleTaskChange('incompletes')}>Tamamlanmayan Görevler</span>
                    </div>
                    <div className='d-flex float-left gap-3 justify-content-between align-items-center'>
                        <input
                            placeholder='Görev ara...'
                            className='task-search-inp'
                        />
                        <span>
                            <span onClick={handleAccountToggle}>
                                <i className="bi bi-person-circle fs-3 text-color-black"></i>
                            </span>
                            <span style={{ display: `${accountInf}` }}>
                                <span className='account-set-wnd d-flex flex-column gap-1 align-items-center justify-content-center'>
                                    <Link href={'/account-settings'} className='a-s-w-link'><span>Hesap Ayarları</span></Link>
                                    <Link href={'/'} className='a-s-w-link'><span>Çıkış Yap</span></Link>
                                </span>
                            </span>
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}

export default Navbar;
