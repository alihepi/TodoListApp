const Footer = ({ loggedIn = false, completedCount }) => {

    const levelDetection = (e) => {
        if(0 < e && e < 10) {
            return 'Acemi';
        } else if(10 <= e && e < 30) {
            return 'Çaylak';
        } else if(30 <= e && e < 50) {
            return 'Hırslı';
        } else if(50 <= e && e < 100) {
            return 'Çalışkan';
        } else if(100 <= e) {
            return 'Uzman';
        }
    }

    return (
        <footer className={`footer-set d-flex justify-content-${loggedIn ? 'between' : 'end'} align-items-center full-w`} >
            {/*Kullanıcı Girişi Kontrolü ile Streak Kontrolü*/}
            {loggedIn && (
                <div className="d-flex float-left gap-4 align-items-center">
                    <span className="d-flex">
                        <span className="fs-1 streak-fire">🔥</span>
                        <span className="streak-score d-flex">{completedCount}</span>
                    </span>
                    <span>
                        <span className="d-flex align-items-center fs-5 font-bold">{levelDetection(completedCount)}</span>
                    </span>
                </div>
            )}
            <span className="opacity-75"><a href="https://alimutlu.net/" target="_blank">Designed by Ali Mutlu © 2024</a></span>
        </footer>
    )
}

export default Footer;