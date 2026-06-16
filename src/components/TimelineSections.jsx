import React from "react";

const TimelineSections = () => {
  return (
    <>
      <section
        className="timeline-section section-morning"
        id="section-morning"
      >
        <span className="timeline-section__badge anim-fade-up">
          <span className="dot"></span> 07:00 AM
        </span>
        <h2 className="timeline-section__title anim-fade-up anim-delay-1">
          Despertar y Bienestar
        </h2>
        <p className="timeline-section__subtitle anim-fade-up anim-delay-2">
          Cada mañana comienza con un análisis completo de tu descanso nocturno.
        </p>
        <div className="timeline-section__content">
          <div className="feature-card anim-fade-up anim-delay-2">
            <div className="feature-card__icon">🌙</div>
            <h3 className="feature-card__title">Sueño multidimensional</h3>
            <p className="feature-card__desc">
              Análisis profundo de las fases REM, sueño ligero y profundo.
              Puntuación personalizada cada mañana.
            </p>
            <div className="waveform-container anim-wave anim-delay-3">
              <svg viewBox="0 0 300 50" preserveAspectRatio="none">
                <rect
                  x="0"
                  y="35"
                  width="80"
                  height="15"
                  rx="3"
                  fill="var(--color-accent-health)"
                  opacity="0.3"
                />
                <rect
                  x="85"
                  y="20"
                  width="60"
                  height="30"
                  rx="3"
                  fill="var(--color-accent-health)"
                  opacity="0.5"
                />
                <rect
                  x="150"
                  y="5"
                  width="90"
                  height="45"
                  rx="3"
                  fill="var(--color-accent-health)"
                  opacity="0.8"
                />
                <rect
                  x="245"
                  y="25"
                  width="55"
                  height="25"
                  rx="3"
                  fill="var(--color-accent-health)"
                  opacity="0.4"
                />
              </svg>
            </div>
          </div>
          <div className="feature-card anim-fade-up anim-delay-3">
            <div className="feature-card__icon">🌡️</div>
            <h3 className="feature-card__title">Temperatura corporal</h3>
            <p className="feature-card__desc">
              Monitorización continua de temperatura en tiempo real. Detecta
              cambios sutiles en tu bienestar.
            </p>
            <div className="data-card" style={{ marginTop: "var(--space-sm)" }}>
              <div
                className="data-card__value"
                style={{ color: "var(--color-accent-warm)" }}
              >
                36.5°
              </div>
              <div className="data-card__label">Temperatura actual</div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="timeline-section section-connect"
        id="section-connect"
      >
        <span className="timeline-section__badge anim-fade-up">
          <span className="dot"></span> 10:00 AM
        </span>
        <h2 className="timeline-section__title anim-fade-up anim-delay-1">
          Conexión y Cuidado
        </h2>
        <p className="timeline-section__subtitle anim-fade-up anim-delay-2">
          Comparte datos de salud con tus seres queridos. El cuidado empieza en
          la conexión.
        </p>
        <div className="timeline-section__content">
          <div className="feature-card anim-fade-up anim-delay-2">
            <div className="feature-card__icon">💕</div>
            <h3 className="feature-card__title">
              Cuidado de tus seres queridos
            </h3>
            <p className="feature-card__desc">
              Visualiza la salud de tu familia en un panel elegante. Recibe
              alertas cuando alguien te necesita.
            </p>
          </div>
          <div className="feature-card family-card anim-fade-up anim-delay-3">
            <div className="family-card__avatar">👩</div>
            <div className="family-card__info">
              <div className="family-card__name">Mamá</div>
              <div className="family-card__status">● Bienestar óptimo</div>
            </div>
          </div>
          <div className="feature-card family-card anim-fade-up anim-delay-4">
            <div className="family-card__avatar">👴</div>
            <div className="family-card__info">
              <div className="family-card__name">Abuelo</div>
              <div className="family-card__status">
                ● Sueño excelente anoche
              </div>
            </div>
          </div>
          <div className="feature-card family-card anim-fade-up anim-delay-5">
            <div className="family-card__avatar">👧</div>
            <div className="family-card__info">
              <div className="family-card__name">Sofía</div>
              <div className="family-card__status">
                ● Activa ahora — 5.2km hoy
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="timeline-section section-control"
        id="section-control"
      >
        <span className="timeline-section__badge anim-fade-up">
          <span className="dot"></span> 15:00 PM
        </span>
        <h2 className="timeline-section__title anim-fade-up anim-delay-1">
          Control Inteligente
        </h2>
        <p className="timeline-section__subtitle anim-fade-up anim-delay-2">
          Un gesto sutil. Control total. Tu anillo es tu mando a distancia.
        </p>
        <div className="timeline-section__content">
          <div className="feature-card anim-fade-up anim-delay-2">
            <div className="feature-card__icon">👆</div>
            <h3 className="feature-card__title">
              Gestos inteligentes con control remoto
            </h3>
            <p className="feature-card__desc">
              Desliza para capturar fotos, controla presentaciones o gestiona tu
              música con movimientos naturales del dedo.
            </p>
            <div
              className="gesture-demo"
              style={{ marginTop: "var(--space-md)" }}
            >
              <span className="gesture-demo__hand">🤚</span>
              <span
                style={{
                  fontSize: "1.5rem",
                  color: "var(--color-text-tertiary)",
                }}
              >
                →
              </span>
              <span className="gesture-demo__target">📸</span>
            </div>
          </div>
          <div className="feature-card anim-fade-up anim-delay-3">
            <div className="feature-card__icon">🎵</div>
            <h3 className="feature-card__title">Control multimedia</h3>
            <p className="feature-card__desc">
              Pausa, reproduce y salta canciones sin sacar tu teléfono. La magia
              está en tus manos.
            </p>
          </div>
        </div>
      </section>

      <section className="timeline-section section-sport" id="section-sport">
        <span className="timeline-section__badge anim-fade-up">
          <span className="dot"></span> 18:00 PM
        </span>
        <h2 className="timeline-section__title anim-fade-up anim-delay-1">
          Rendimiento Deportivo
        </h2>
        <p className="timeline-section__subtitle anim-fade-up anim-delay-2">
          Tu compañero perfecto para cada entrenamiento. Datos precisos,
          rendimiento elevado.
        </p>
        <div className="timeline-section__content">
          <div className="sport-metrics anim-fade-up anim-delay-2">
            <div className="feature-card data-card">
              <div
                className="data-card__value"
                style={{ color: "var(--color-accent-heart)" }}
              >
                128
              </div>
              <div className="data-card__label">Frecuencia cardíaca</div>
              <div className="waveform-container anim-wave">
                <svg viewBox="0 0 200 40" preserveAspectRatio="none">
                  <path
                    d="M0,20 Q10,20 15,20 T30,20 35,5 40,35 45,20 Q55,20 60,20 T75,20 80,5 85,35 90,20 Q100,20 110,20 T125,20 130,5 135,35 140,20 Q150,20 160,20 T175,20 180,5 185,35 190,20 200,20"
                    fill="none"
                    stroke="var(--color-accent-heart)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
            <div className="feature-card data-card">
              <div
                className="data-card__value"
                style={{ color: "var(--color-accent-o2)" }}
              >
                98<span style={{ fontSize: "0.5em" }}>%</span>
              </div>
              <div className="data-card__label">SpO₂</div>
              <div className="waveform-container anim-wave">
                <svg viewBox="0 0 200 40" preserveAspectRatio="none">
                  <path
                    d="M0,30 C20,28 40,15 60,20 S100,10 120,18 S160,25 180,15 200,20"
                    fill="none"
                    stroke="var(--color-accent-o2)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="feature-card anim-fade-up anim-delay-3">
            <div className="feature-card__icon">🔥</div>
            <h3 className="feature-card__title">Cálculo de calorías</h3>
            <p className="feature-card__desc">
              Seguimiento preciso del gasto calórico durante múltiples modos
              deportivos: carrera, ciclismo, natación y más.
            </p>
            <div className="data-card" style={{ marginTop: "var(--space-sm)" }}>
              <div
                className="data-card__value"
                style={{ color: "var(--color-accent-sport)" }}
              >
                486 <span style={{ fontSize: "0.4em" }}>kcal</span>
              </div>
              <div className="data-card__label">Calorías quemadas</div>
            </div>
          </div>
          <div className="feature-card anim-fade-up anim-delay-4">
            <div className="feature-card__icon">🗺️</div>
            <h3 className="feature-card__title">Trayectoria deportiva</h3>
            <p className="feature-card__desc">
              Registra tu ruta con GPS integrado. Revive cada kilómetro de tu
              recorrido.
            </p>
            <div
              className="waveform-container anim-wave"
              style={{ height: "80px" }}
            >
              <svg viewBox="0 0 200 80" preserveAspectRatio="none">
                <path
                  d="M10,70 C30,60 50,20 80,30 S120,50 140,25 S170,40 190,15"
                  fill="none"
                  stroke="var(--color-accent-sport)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="10"
                  cy="70"
                  r="4"
                  fill="var(--color-accent-health)"
                />
                <circle
                  cx="190"
                  cy="15"
                  r="4"
                  fill="var(--color-accent-heart)"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline-section section-fun" id="section-fun">
        <span className="timeline-section__badge anim-fade-up">
          <span className="dot"></span> 20:00 PM
        </span>
        <h2 className="timeline-section__title anim-fade-up anim-delay-1">
          Ocio y Entretenimiento
        </h2>
        <p className="timeline-section__subtitle anim-fade-up anim-delay-2">
          La tecnología también puede ser divertida. Juega con tu cuerpo como
          mando.
        </p>
        <div className="timeline-section__content">
          <div className="feature-card anim-fade-up anim-delay-2">
            <div className="feature-card__icon">🎮</div>
            <h3 className="feature-card__title">Juegos de sensor corporal</h3>
            <p className="feature-card__desc">
              Usa los sensores de movimiento de tu anillo para jugar. Gira,
              agita y compite con amigos en minijuegos exclusivos.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "var(--space-lg)",
                marginTop: "var(--space-lg)",
                fontSize: "2rem",
              }}
            >
              <span className="anim-bounce" style={{ animationDelay: "0s" }}>
                ⭐
              </span>
              <span className="anim-bounce" style={{ animationDelay: "0.2s" }}>
                🎯
              </span>
              <span className="anim-bounce" style={{ animationDelay: "0.4s" }}>
                🏆
              </span>
              <span className="anim-bounce" style={{ animationDelay: "0.6s" }}>
                🎲
              </span>
            </div>
          </div>
          <div className="feature-card anim-fade-up anim-delay-3">
            <div className="feature-card__icon">🤝</div>
            <h3 className="feature-card__title">Multijugador</h3>
            <p className="feature-card__desc">
              Conecta con otros usuarios de Yooh Vital y desafíalos en tiempo
              real. La diversión no tiene límites.
            </p>
          </div>
        </div>
      </section>

      <section
        className="timeline-section section-comfort"
        id="section-comfort"
      >
        <span className="timeline-section__badge anim-fade-up">
          <span className="dot"></span> 23:00 PM
        </span>
        <h2 className="timeline-section__title anim-fade-up anim-delay-1">
          Comodidad sin límites
        </h2>
        <p className="timeline-section__subtitle anim-fade-up anim-delay-2">
          Tan cómodo que olvidarás que lo llevas puesto. Diseñado para vivir
          contigo.
        </p>
        <div className="timeline-section__content">
          <div className="comfort-specs">
            <div className="feature-card comfort-spec anim-slide-left anim-delay-2">
              <span className="comfort-spec__icon">📏</span>
              <div className="comfort-spec__text">
                <div className="comfort-spec__label">Ancho de solo 6.3mm</div>
                <div className="comfort-spec__detail">
                  El perfil más delgado del mercado. Elegancia pura.
                </div>
              </div>
            </div>
            <div className="feature-card comfort-spec anim-slide-left anim-delay-3">
              <span className="comfort-spec__icon">🪶</span>
              <div className="comfort-spec__text">
                <div className="comfort-spec__label">Ligero como una pluma</div>
                <div className="comfort-spec__detail">
                  Apenas 3 gramos. Confort total, día y noche.
                </div>
              </div>
            </div>
            <div className="feature-card comfort-spec anim-slide-left anim-delay-4">
              <span className="comfort-spec__icon">🔋</span>
              <div className="comfort-spec__text">
                <div className="comfort-spec__label">
                  Batería de larga duración
                </div>
                <div className="comfort-spec__detail">
                  Hasta 7 días con una sola carga. Sin interrupciones.
                </div>
                <div style={{ width: "100%", marginTop: "var(--space-sm)" }}>
                  {/* <div style={{ height: '6px', background: 'rgba(0,0,0,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div className="anim-battery-fill" style={{ '--battery-level': '85%', height: '100%', background: 'linear-gradient(90deg, var(--color-accent-health), var(--color-accent-sport))', borderRadius: '3px' }}></div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TimelineSections;
