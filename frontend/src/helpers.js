export const getUserFromLocalStorage = () => {
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
