import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import todoLogo from '@/images/todo-logo.png';
import Link from 'next/link';

interface NavbarProps {
    setIsModalOpen: (open: boolean) => void;
    loggedIn?: boolean;
    setCompIncomp: (taskType: string) => void;
    searchTerm: string;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setIsModalOpen, loggedIn = false, setCompIncomp, searchTerm, handleSearchChange }) => {
    const router = useRouter();
    const [defaultTasks, setDefaultTasks] = React.useState<string>('incomplete');
    const [accountInf, setAccountInf] = React.useState<string>('none');

    const handleTaskChange = (taskType: string) => {
        setDefaultTasks(taskType);
        setCompIncomp(taskType);
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
        <div className='container d-flex float-left justify-content-between align-items-center full-w navbar-set'>
            <Image src={todoLogo} width={75} height={75} alt="logo" />
            {loggedIn && (
                <>
                    <span className='d-flex gap-3 float-left task-btns align-items-center'>
                        <span className='d-flex align-items-center fs-2 add-todo-btn' onClick={handleAddTodo}>
                            <i className="bi bi-plus-circle-fill"></i>
                        </span>
                        <div className='d-flex float-left align-items-center'>
                            <span
                                className={`tasks-btn incomplete text-center ${defaultTasks === 'incomplete' ? 'selected-task' : ''}`}
                                onClick={() => handleTaskChange('incomplete')}
                            >
                                Tamamlanmayan Görevler
                            </span>
                            <span
                                className={`tasks-btn completed text-center ${defaultTasks === 'completed' ? 'selected-task' : ''}`}
                                onClick={() => handleTaskChange('completed')}
                            >
                                Tamamlanan Görevler
                            </span>
                        </div>
                    </span>
                    <div className='d-flex float-left gap-3 justify-content-between align-items-center'>
                        <input
                            placeholder='Görev ara...'
                            className='task-search-inp'
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <span>
                            <span onClick={accountToggle}>
                                <i className="bi bi-person-circle fs-3 text-color-black"></i>
                            </span>
                            <span style={{ display: accountInf }}>
                                <span className='account-set-wnd d-flex flex-column gap-1 align-items-center justify-content-center'>
                                    <Link href={'/account-settings'} className='a-s-w-link'>
                                        <span>Hesap Ayarları</span>
                                    </Link>
                                    <span onClick={logout} className='cursor-pointer'>
                                        Çıkış Yap
                                    </span>
                                </span>
                            </span>
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};

export default Navbar;
