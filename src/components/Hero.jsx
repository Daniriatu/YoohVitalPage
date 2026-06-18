import React, { useState, useEffect } from "react";

const images = [
    "/smart_ring1.png",
    "/smart_ring2.png",
    "/pulsera.png",
    "/smart_ring_futbol.png",
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hero" id="hero">
            <div className="hero__logo anim-fade-up">YOOH VITAL</div>

            <div
                className="hero__image-wrapper anim-fade-up anim-delay-1"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "3rem 0",
                    width: "100%",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        maxWidth: "45vh",
                        aspectRatio: "1 / 1",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {images.map((src, index) => (
                        <img
                            key={src}
                            src={src}
                            alt={`Yooh Vital Smart Ring ${index + 1}`}
                            style={{
                                position: "absolute",
                                top: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter: "drop-shadow(0px 20px 30px rgba(0,0,0,0.5))",
                                borderRadius: "24px",
                                opacity: currentSlide === index ? 1 : 0,
                                transition:
                                    "opacity 0.8s ease-in-out, transform 0.8s ease-in-out",
                                transform:
                                    currentSlide === index
                                        ? "scale(1)"
                                        : "scale(0.98)",
                                pointerEvents:
                                    currentSlide === index ? "auto" : "none",
                            }}
                        />
                    ))}
                </div>

                {/* 轮播图指示器（小圆点） */}
                <div
                    style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginTop: "1.5rem",
                        zIndex: 10,
                    }}
                >
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor:
                                    currentSlide === index
                                        ? "rgba(255,255,255,0.9)"
                                        : "rgba(255,255,255,0.3)",
                                border: "none",
                                cursor: "pointer",
                                transition: "background-color 0.3s ease",
                                padding: 0,
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <h1 className="hero__tagline anim-fade-up anim-delay-2">
                Belleza que cuida de ti.
            </h1>
            <p className="hero__subtitle anim-fade-up anim-delay-3">
                Un anillo inteligente que fusiona elegancia atemporal con
                tecnología de bienestar avanzada.
            </p>
            <div className="hero__scroll-hint anim-fade-up anim-delay-4">
                <span>Descubre</span>
                <div className="arrow"></div>
            </div>
        </section>
    );
};

export default Hero;
