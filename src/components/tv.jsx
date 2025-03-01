import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const YourComponent = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const parentDivRef = useRef(null);
  const soundRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const sound = soundRef.current;
    const parentDiv = parentDivRef.current;
    let scrollTimeout;

    sound.volume = 0.5;

    const frames = {
      currentIndex: 0,
      maxIndex: 621,
    };
    const images = [];
    let imagesLoaded = 0;
    
    function preloadImages() {
      for (let i = 1; i <= frames.maxIndex; i++) {
        const img = new Image();
        img.src = `.assets/Slight/frame_${i.toString().padStart(4, '0')}.jpg`;

        img.onload = () => {
          imagesLoaded++;
          if (imagesLoaded === frames.maxIndex) {
            loadImage(frames.currentIndex);
            startAnimation();
          }
        };
        images.push(img);
      }
    }

    function loadImage(index) {
      if (index >= 0 && index <= frames.maxIndex) {
        const img = images[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        frames.currentIndex = index;
      }
    }

    function startAnimation() {
      const savedScroll = sessionStorage.getItem('scrollY') || 0;
      window.scrollTo(0, savedScroll);

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.cnav',
          start: 'top top',
          scrub: 2,
          end: 'bottom bottom',
          onUpdate: (self) => {
            const progress = self.progress;
            sound.currentTime = sound.duration * progress;

            if (sound.paused && progress > 0) {
              sound.play();
            }

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              if (!sound.paused) {
                sound.pause();
              }
            }, 200);

            sessionStorage.setItem('scrollY', window.scrollY);
          },
          onLeave: () => {
            gsap.to([canvas, parentDiv], { opacity: 0, duration: 0.1 });
            onComplete();
          },
          onEnterBack: () => {
            gsap.to([canvas, parentDiv], { opacity: 1, duration: 0.1 });
          },
        },
      });

      tl.to(frames, {
        currentIndex: frames.maxIndex,
        onUpdate: () => loadImage(Math.floor(frames.currentIndex)),
      });
    }

    preloadImages();

    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('scrollY', window.scrollY);
    });
  }, [onComplete]);

  return (
    <div
      ref={parentDivRef}
      style={{
        width: '100%',
        backgroundColor: '#18181b',
        position: 'relative',
        zIndex: 0,
      }}
    >
      <div
        className="cnav"
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          width: '100%',
          height: '700vh',
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100%',
          }}
        >
          <canvas id="frame" ref={canvasRef}></canvas>
        </div>
      </div>

      <audio id="scrollSound" ref={soundRef} src="Scroll.wav" preload="auto"></audio>
    </div>
  );
};

export default YourComponent;
