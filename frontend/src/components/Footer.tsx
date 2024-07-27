const Footer = ({ loggedIn = false }) => {
    return (
        <footer className={`footer-set d-flex justify-content-${loggedIn ? 'between' : 'end'} align-items-center full-w`} >
            {/*Kullanıcı Girişi Kontrolü ile Streak Kontrolü*/}
            {loggedIn && (
                <div className="d-flex float-left gap-4 align-items-center">
                    <span className="d-flex">
                        <span className="fs-1 streak-fire">🔥</span>
                        <span className="streak-score d-flex">27</span>
                    </span>
                    <span>
                        <span className="d-flex align-items-center fs-5 font-bold">Çaylak</span>
                    </span>
                </div>
            )}
            <span className="opacity-75">Designed by Ali Mutlu © 2024</span>
        </footer>
    )
}

export default Footer;