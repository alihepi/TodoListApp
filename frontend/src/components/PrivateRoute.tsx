import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Kullanıcı giriş yapmadıysa anasayfaya yönlendir
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    // Kullanıcı oturum açmadan içerik gösterilmez
    return user ? children : null;
};

export default PrivateRoute;
