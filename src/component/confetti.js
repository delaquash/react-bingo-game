import React from 'react';
import confetti from 'canvas-confetti';


export const start = ()=>{
    let W = window.innerWidth;
    let H = window.innerHeight;
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const maxConfettis = 150;
    const particles = [];
  

    // Confetti colors
    const confettiColors = [
      "DodgerBlue",
      "OliveDrab",
      "Gold",
      "Pink",
      "SlateBlue",
      "LightBlue",
      "Gold",
      "Violet",
      "PaleGreen",
      "SteelBlue",
      "SandyBrown",
      "Chocolate",
      "Crimson"
    ];
  
    function randomFromTo(from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from);
    }
  // About the particles from confetti
    function confettiParticle() {
      this.x = Math.random() * W; // x
      this.y = Math.random() * H - H; // y
      this.r = randomFromTo(9, 11); // radius
      this.d = Math.random() * maxConfettis + 6;
      this.color =
        confettiColors[Math.floor(Math.random() * confettiColors.length)];
      this.tilt = Math.floor(Math.random() * 11) - 9;
      this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
      this.tiltAngle = 0;
  
      this.draw = function() {
        context.beginPath();
        context.lineWidth = this.r / 2;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
        return context.stroke();
      };
    }
  
    function Draw() {
      const results = [];
  
      // Magical recursive functional love
      requestAnimationFrame(Draw);
  
      context.clearRect(0, 0, W, window.innerHeight);
  
      for (let i = 0; i < maxConfettis; i++) {
        results.push(particles[i].draw());
      }
  
      let particle = {};
      
      for (let i = 0; i < maxConfettis; i++) {
        particle = particles[i];
  
        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;
  
        
  
        // if the confetti stops falling, bring it back and let it re-fall,
        if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
          particle.x = Math.random() * W;
          particle.y = -30;
          particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
      }
  
      return results;
    }
  
    window.addEventListener(
      "resize",
      function() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      },
      false
    );
  
    // Push new confetti objects to `particles[]`
    for (var i = 0; i < maxConfettis; i++) {
      particles.push(new confettiParticle());
    }
  
    // Initialize
    canvas.width = W;
    canvas.height = H;
    Draw();
  }

  
  export default confetti;