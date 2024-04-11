// Countdown.jsx
import React, { useState, useEffect } from 'react';

const Countdown = ({ date }) => {
  // Convertir la fecha recibida en un objeto Date de JavaScript
  const weddingDate = new Date(date);

  // Función para calcular el tiempo restante
  const calculateTimeLeft = (weddingDate) => {
    const difference = +weddingDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  // Estado para almacenar el tiempo restante
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(weddingDate));

  // Efecto para actualizar el contador cada segundo
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(weddingDate));
    }, 1000);

    // Limpieza al desmontar el componente
    return () => clearTimeout(timer);
  }, [timeLeft, weddingDate]);

  return (
    <div>
      <h2>Cuenta Regresiva para Nuestra Boda</h2>
      {
        Object.keys(timeLeft).length > 0 ? (
          <div>
            {Object.keys(timeLeft).map((interval) => (
              <span key={interval}>
                {timeLeft[interval]} {interval}{" "}
              </span>
            ))}
          </div>
        ) : (
          <span>¡Es el gran día!</span>
        )
      }
    </div>
  );
};

export default Countdown;
