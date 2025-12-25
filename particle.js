window.particlesConfig = {
    particles: {
      number: {
        value: window.innerWidth > 768 ? 60 : 40,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.5,
        random: false
      },
      size: {
        value: 3,
        random: true
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: window.innerWidth > 768 ? 6 : 3,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },

    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: false
  };
  particlesJS("particles-js", window.particlesConfig);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && window.pJSDom && pJSDom.length) {
      pJSDom[0].pJS.fn.vendors.destroypJS();
      pJSDom = [];
      particlesJS("particles-js", window.particlesConfig);
    }
  });
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.pJSDom && pJSDom.length) {
        pJSDom[0].pJS.fn.vendors.destroypJS();
        pJSDom = [];
        particlesJS("particles-js", window.particlesConfig);
      }
    }, 300);
  });
