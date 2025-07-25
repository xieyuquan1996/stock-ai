import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadBasic } from '@tsparticles/basic';
import PropTypes from 'prop-types';

const ParticleBackground = ({ id = "tsparticles", density = 50 }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadBasic(engine);
  }, []);

  const particlesConfig = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ["#00D9FF", "#7C3AED", "#10B981"],
      },
      links: {
        color: "#00D9FF",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
        triangles: {
          enable: true,
          opacity: 0.05,
        },
      },
      collisions: {
        enable: false,
      },
      move: {
        directions: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 1000,
        },
        value: density,
      },
      opacity: {
        value: {
          min: 0.1,
          max: 0.8,
        },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false,
        },
      },
      shape: {
        type: ["circle", "triangle", "polygon"],
        options: {
          polygon: {
            sides: 6,
          },
        },
      },
      size: {
        value: {
          min: 1,
          max: 4,
        },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 1,
          sync: false,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id={id}
      init={particlesInit}
      options={particlesConfig}
      className="absolute inset-0 z-0"
    />
  );
};

ParticleBackground.propTypes = {
  id: PropTypes.string,
  density: PropTypes.number
};

export default ParticleBackground;