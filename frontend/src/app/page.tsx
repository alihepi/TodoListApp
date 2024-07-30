import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Link from 'next/link'

export default function Home() {
  return (
    <div className="d-flex flex-column gap-2 main-page">

      <Navbar />

      <div className="home-page d-flex flex-column align-items-center justify-content-center">
        <span className="d-flex flex-column text-center fs-4 gap-3">
          <span>Planla, gerçekleştir, başar!</span>
          <span>Tamamladığın hergün için yeni bir sayı kazan.</span>
          <span>Acemi, Çaylak, Hırslı, Çalışkan, Uzman!</span>
          <span>Peki sen hangisisin?</span>

          <Link className="mt-5 start-btn" href={`/login`}>Şimdi Başla</Link>
        </span>
      </div>

      <Footer />

    </div>
  );
}
