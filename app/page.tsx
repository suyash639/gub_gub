"use client"

import { useState, useEffect } from "react"

export default function Page() {
  const [showIntro, setShowIntro] = useState(true)
  const [modalActive, setModalActive] = useState(false)
  const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [confetti, setConfetti] = useState([])
  const [nightMode, setNightMode] = useState(false)
  const [flowerClicks, setFlowerClicks] = useState(0)
  const [showSkyMessage, setShowSkyMessage] = useState(false)
  const [butterflies, setButterflies] = useState([])
  const [mouseTrail, setMouseTrail] = useState([])

  const memories = [
    { title: "The day we met 💫", memory: "The moment I saw you, I knew something magical was about to happen ✨" },
    {
      title: "Our coffee date ☕",
      memory: "Coffee tastes better when it's with you, talking about everything and nothing",
    },
    {
      title: "That endless late-night call 🌙",
      memory: "Hours flew by like minutes. Your voice was the warmest comfort",
    },
    {
      title: "Your birthday surprise 🎂",
      memory: "Seeing your face light up was the greatest gift I could ever ask for 💖",
    },
    { title: "Our first trip 💖", memory: "New places look more beautiful when I'm exploring them with you" },
    { title: "When you made me laugh so hard 😂", memory: "My cheeks hurt, but my heart felt fuller than ever before" },
  ]

  const quotes = [
    "You're sunshine on cloudy days 🌤️",
    "Your smile makes my world bloom 💐",
    "You're my favorite reason to code this 😆💻",
    "Every moment with you is precious 💖",
    "You make life beautiful 🌸",
  ]

  useEffect(() => {
    // Initialize butterflies
    const flyingButterflies = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 50,
      delay: Math.random() * 2,
      duration: 15 + Math.random() * 10,
    }))
    setButterflies(flyingButterflies)

    // Petal rain after 10 seconds idle
    const petalRainTimer = setTimeout(() => {
      triggerPetalRain()
    }, 10000)

    // Quote bubbles
    const quoteInterval = setInterval(() => {
      triggerQuoteBubble()
    }, 12000)

    // Mouse trail
    const handleMouseMove = (e) => {
      const newTrail = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }
      setMouseTrail((prev) => [...prev.slice(-15), newTrail])
    }

    window.addEventListener("mousemove", handleMouseMove)

    const audio = document.getElementById("bg-music")
    if (audio) {
      audio.preload = "auto"
      audio.volume = 0.5

      // Try to play with user interaction fallback
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setMusicPlaying(true)
          })
          .catch(() => {
            // Browser blocked auto-play, will play on first intro button click
          })
      }
    }

    return () => {
      clearTimeout(petalRainTimer)
      clearInterval(quoteInterval)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleIntroClick = () => {
    setShowIntro(false)
    const audio = document.getElementById("bg-music")
    if (audio && audio.paused) {
      audio.play().catch(() => {})
      setMusicPlaying(true)
    }
  }

  const openModal = (index) => {
    setCurrentMemoryIndex(index)
    setModalActive(true)
    createConfetti()

    const newClicks = flowerClicks + 1
    setFlowerClicks(newClicks)

    if (newClicks === 6) {
      setTimeout(() => {
        setShowSkyMessage(true)
      }, 800)
    }

    // Bloom animation + poof sound
    const flower = document.querySelectorAll(".flower")[index]
    if (flower) {
      flower.classList.add("blooming")
      setTimeout(() => {
        flower.classList.remove("blooming")
      }, 600)
    }
  }

  const closeModal = () => {
    setModalActive(false)
  }

  const createConfetti = () => {
    const newConfetti = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 1,
    }))
    setConfetti(newConfetti)
    setTimeout(() => setConfetti([]), 3000)
  }

  const toggleMusic = () => {
    const audio = document.getElementById("bg-music")
    if (audio.paused) {
      audio.play()
      setMusicPlaying(true)
    } else {
      audio.pause()
      setMusicPlaying(false)
    }
  }

  const triggerPetalRain = () => {
    const petalRainDiv = document.createElement("div")
    petalRainDiv.className = "petal-rain"
    document.body.appendChild(petalRainDiv)
    setTimeout(() => petalRainDiv.remove(), 3000)
  }

  const triggerQuoteBubble = () => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)]
    const bubble = document.createElement("div")
    bubble.className = "quote-bubble"
    bubble.textContent = quote
    bubble.style.left = Math.random() * 100 + "%"
    document.body.appendChild(bubble)
    setTimeout(() => bubble.remove(), 6000)
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Memory Garden — For Agrima 🌷</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><text x="0" y="20" fontSize="20">🌸</text></svg>') 12 12, auto;
          }

          body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #fde5d4 0%, #f9a8d4 35%, #d4a8f9 70%, #b3e5fc 100%);
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
            transition: all 0.8s ease;
          }

          body.night-mode {
            background: linear-gradient(135deg, #0a1f44 0%, #1a2d5a 35%, #2a1d5a 70%, #1a3a5a 100%);
          }

          /* Added intro screen styles */
          .intro-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #fde5d4 0%, #f9a8d4 35%, #d4a8f9 70%, #b3e5fc 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.6s ease;
          }

          .intro-screen.hide {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.8s ease;
          }

          .intro-content {
            text-align: center;
            animation: slideUp 1s ease-out forwards;
          }

          .intro-emoji {
            font-size: 80px;
            margin-bottom: 20px;
            animation: bounce 2s ease-in-out infinite;
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          .intro-content h1 {
            font-family: 'Dancing Script', cursive;
            font-size: clamp(2rem, 8vw, 3.5rem);
            color: white;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
            margin-bottom: 15px;
          }

          .intro-content p {
            font-size: 1.3rem;
            color: rgba(255, 255, 255, 0.95);
            margin-bottom: 40px;
            max-width: 600px;
            line-height: 1.6;
          }

          .intro-btn {
            background: rgba(255, 255, 255, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.8);
            color: white;
            padding: 15px 50px;
            font-size: 1.1rem;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            font-family: 'Poppins', sans-serif;
            animation: pulse 2s ease-in-out infinite;
          }

          .intro-btn:hover {
            background: rgba(255, 255, 255, 0.5);
            transform: scale(1.08);
            animation: none;
          }

          @keyframes pulse {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
            }
            50% {
              box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
            }
          }

          /* Clouds */
          .cloud {
            position: absolute;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 100px;
            top: 10%;
            z-index: 1;
          }

          .cloud::before,
          .cloud::after {
            content: '';
            position: absolute;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 100px;
          }

          .cloud1 {
            width: 100px;
            height: 40px;
            left: -100px;
            animation: float 20s infinite linear;
          }

          .cloud1::before {
            width: 50px;
            height: 50px;
            top: -25px;
            left: 10px;
          }

          .cloud1::after {
            width: 60px;
            height: 40px;
            top: -15px;
            right: 10px;
          }

          .cloud2 {
            width: 80px;
            height: 35px;
            right: -80px;
            top: 20%;
            animation: float 25s infinite linear 5s;
          }

          .cloud2::before {
            width: 45px;
            height: 45px;
            top: -20px;
            left: 15px;
          }

          .cloud2::after {
            width: 50px;
            height: 35px;
            top: -12px;
            right: 15px;
          }

          @keyframes float {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(calc(100vw + 200px));
            }
          }

          /* Main container */
          .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 40px 20px;
            position: relative;
            z-index: 2;
          }

          /* Welcome message */
          .welcome {
            opacity: 0;
            animation: fadeIn 1s ease-in forwards;
            text-align: center;
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 20px;
            font-weight: 500;
            letter-spacing: 0.5px;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Header */
          .header {
            text-align: center;
            margin-bottom: 40px;
            animation: fadeIn 2s ease-in forwards;
            position: relative;
          }

          .header h1 {
            font-family: 'Dancing Script', cursive;
            font-size: clamp(2rem, 8vw, 4rem);
            color: #fff;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
            animation: pulse 3s ease-in-out infinite;
            margin-bottom: 10px;
          }

          @keyframes pulse {
            0%, 100% {
              text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
            }
            50% {
              text-shadow: 0 0 40px rgba(255, 255, 255, 0.8);
            }
          }

          /* Day/Night toggle button */
          .day-night-btn {
            background: rgba(255, 255, 255, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.6);
            color: white;
            padding: 12px 20px;
            border-radius: 30px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 15px;
            font-weight: 600;
          }

          .day-night-btn:hover {
            background: rgba(255, 255, 255, 0.5);
            transform: scale(1.05);
          }

          /* Garden area */
          .garden {
            flex: 1;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            width: 100%;
            min-height: 400px;
            position: relative;
          }

          /* Grass */
          .grass {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 200px;
            background: linear-gradient(180deg, #a8d26b 0%, #8bc34a 50%, #6ba836 100%);
            z-index: 1;
            transition: all 0.8s ease;
          }

          .night-mode .grass {
            background: linear-gradient(180deg, #2a4a1a 0%, #1a3a0a 50%, #0a2a0a 100%);
          }

          /* Flowers container */
          .flowers-container {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: space-around;
            z-index: 2;
            padding-bottom: 50px;
          }

          /* Flower */
          .flower {
            cursor: pointer;
            position: relative;
            width: 60px;
            height: 120px;
            transition: all 0.3s ease;
            animation: bloom 0.8s ease-out forwards;
            opacity: 0;
          }

          .flower:nth-child(1) { animation-delay: 2.5s; }
          .flower:nth-child(2) { animation-delay: 2.7s; }
          .flower:nth-child(3) { animation-delay: 2.9s; }
          .flower:nth-child(4) { animation-delay: 3.1s; }
          .flower:nth-child(5) { animation-delay: 3.3s; }
          .flower:nth-child(6) { animation-delay: 3.5s; }

          @keyframes bloom {
            from {
              opacity: 0;
              transform: scale(0);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          /* Bloom animation on click */
          .flower.blooming .petals {
            animation: petalExpand 0.6s ease-out;
          }

          @keyframes petalExpand {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.3);
            }
            100% {
              transform: scale(1);
            }
          }

          .flower:hover {
            transform: scale(1.1);
            filter: brightness(1.2);
          }

          .flower-sway {
            animation: sway 3s ease-in-out infinite;
          }

          .flower:nth-child(1) .flower-sway { animation-duration: 3s; }
          .flower:nth-child(2) .flower-sway { animation-duration: 3.5s; animation-delay: 0.2s; }
          .flower:nth-child(3) .flower-sway { animation-duration: 3.2s; animation-delay: 0.4s; }
          .flower:nth-child(4) .flower-sway { animation-duration: 3.8s; animation-delay: 0.1s; }
          .flower:nth-child(5) .flower-sway { animation-duration: 3.4s; animation-delay: 0.3s; }
          .flower:nth-child(6) .flower-sway { animation-duration: 3.6s; animation-delay: 0.5s; }

          @keyframes sway {
            0%, 100% {
              transform: rotate(0deg);
            }
            50% {
              transform: rotate(2deg);
            }
          }

          /* Stem */
          .stem {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 3px;
            height: 80px;
            background: #8bc34a;
            border-radius: 2px;
            transform-origin: bottom center;
            transition: background 0.8s ease;
          }

          .night-mode .stem {
            background: #3a5a1a;
          }

          /* Petals */
          .petals {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 50px;
          }

          .petal {
            position: absolute;
            width: 20px;
            height: 28px;
            background: #f9a8d4;
            border-radius: 50% 50% 50% 0;
            left: 50%;
            top: 50%;
            transform-origin: 0 0;
            transition: all 0.8s ease;
          }

          .petal1 { transform: translateX(-50%) translateY(-50%) rotate(0deg) translateY(-15px); }
          .petal2 { transform: translateX(-50%) translateY(-50%) rotate(60deg) translateY(-15px); }
          .petal3 { transform: translateX(-50%) translateY(-50%) rotate(120deg) translateY(-15px); }
          .petal4 { transform: translateX(-50%) translateY(-50%) rotate(180deg) translateY(-15px); }
          .petal5 { transform: translateX(-50%) translateY(-50%) rotate(240deg) translateY(-15px); }
          .petal6 { transform: translateX(-50%) translateY(-50%) rotate(300deg) translateY(-15px); }

          /* Different flower colors */
          .flower:nth-child(2) .petal { background: #fda0d9; }
          .flower:nth-child(3) .petal { background: #f97abc; }
          .flower:nth-child(4) .petal { background: #f9a8d4; }
          .flower:nth-child(5) .petal { background: #fda0d9; }
          .flower:nth-child(6) .petal { background: #f97abc; }

          /* Night mode glow effect */
          .night-mode .flower .petal {
            filter: drop-shadow(0 0 6px rgba(249, 168, 212, 0.8));
          }

          /* Center */
          .center {
            position: absolute;
            width: 16px;
            height: 16px;
            background: #fdd835;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            box-shadow: 0 0 8px rgba(253, 216, 53, 0.6);
          }

          /* Modal */
          .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            z-index: 100;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
          }

          .modal-overlay.active {
            display: flex;
          }

          .modal {
            background: rgba(255, 255, 255, 0.98);
            border-radius: 25px;
            padding: 50px;
            max-width: 550px;
            width: 95%;
            text-align: center;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
            animation: slideUp 0.4s ease;
            position: relative;
            max-height: 90vh;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .modal img {
            width: 250px;
            height: 250px;
            object-fit: cover;
            border-radius: 20px;
            margin: 0 auto 30px auto;
            border: 4px solid #f9a8d4;
            box-shadow: 0 10px 30px rgba(249, 168, 212, 0.3);
          }

          .modal-title {
            font-family: 'Dancing Script', cursive;
            font-size: 1.8rem;
            color: #f9a8d4;
            margin-bottom: 15px;
            animation: fadeIn 0.5s ease;
          }

          .modal-memory {
            font-size: 1.2rem;
            color: #333;
            margin-bottom: 25px;
            line-height: 1.8;
            font-style: italic;
          }

          .close-btn {
            background: none;
            border: none;
            font-size: 1.8rem;
            cursor: pointer;
            padding: 5px;
            color: #f9a8d4;
            transition: transform 0.2s;
            position: absolute;
            top: 15px;
            right: 15px;
          }

          .close-btn:hover {
            transform: scale(1.2);
          }

          /* Confetti animation */
          .confetti {
            position: fixed;
            pointer-events: none;
            top: -10px;
            z-index: 101;
            font-size: 2rem;
            animation: fallDown linear forwards;
          }

          @keyframes fallDown {
            to {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }

          /* Butterflies animation */
          .butterfly {
            position: fixed;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 10;
            animation: butterflyFly linear infinite;
          }

          @keyframes butterflyFly {
            0% {
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translateY(-100vh);
            }
          }

          /* Quote bubbles */
          .quote-bubble {
            position: fixed;
            bottom: 20%;
            background: rgba(249, 168, 212, 0.9);
            color: white;
            padding: 15px 20px;
            border-radius: 20px;
            font-size: 0.95rem;
            font-weight: 500;
            z-index: 15;
            animation: floatUp 6s ease-in-out forwards;
            box-shadow: 0 10px 30px rgba(249, 168, 212, 0.4);
            max-width: 200px;
            text-align: center;
          }

          @keyframes floatUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translateY(-100vh);
            }
          }

          /* Petal rain animation */
          .petal-rain {
            position: fixed;
            top: -20px;
            left: 0;
            width: 100%;
            height: 100vh;
            pointer-events: none;
            z-index: 12;
            background-image: 
              radial-gradient(2px 2px at 20% 30%, #f9a8d4, rgba(249, 168, 212, 0)),
              radial-gradient(2px 2px at 60% 70%, #fda0d9, rgba(253, 160, 217, 0)),
              radial-gradient(1px 1px at 50% 50%, #f97abc, rgba(249, 122, 188, 0)),
              radial-gradient(1px 1px at 80% 10%, #f9a8d4, rgba(249, 168, 212, 0)),
              radial-gradient(2px 2px at 90% 60%, #fda0d9, rgba(253, 160, 217, 0)),
              radial-gradient(1px 1px at 30% 80%, #f97abc, rgba(249, 122, 188, 0)),
              radial-gradient(1px 1px at 40% 20%, #f9a8d4, rgba(249, 168, 212, 0));
            background-repeat: repeat;
            background-size: 200% 200%;
            animation: petalRain 3s ease-in forwards;
          }

          @keyframes petalRain {
            to {
              transform: translateY(100vh);
              opacity: 0;
            }
          }

          /* Mouse trail animation */
          .mouse-trail-dot {
            position: fixed;
            width: 8px;
            height: 8px;
            background: rgba(249, 168, 212, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 5;
            box-shadow: 0 0 6px rgba(249, 168, 212, 0.8);
            animation: trailFade 1s ease-out forwards;
          }

          @keyframes trailFade {
            to {
              opacity: 0;
              transform: scale(0);
            }
          }

          /* Memory counter */
          .memory-counter {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.3);
            color: white;
            padding: 10px 20px;
            border-radius: 30px;
            font-weight: 600;
            z-index: 10;
            font-size: 0.95rem;
          }

          /* Music control */
          .music-control {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: rgba(255, 255, 255, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.6);
            color: white;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            z-index: 99;
          }

          .music-control:hover {
            background: rgba(255, 255, 255, 0.5);
            transform: scale(1.1);
          }

          /* Sky message */
          .sky-message {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.9);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
            z-index: 102;
          }

          .sky-message h2 {
            font-size: 1.5rem;
            color: #f9a8d4;
            margin-bottom: 10px;
          }

          .sky-message p {
            font-size: 1rem;
            color: #333;
            margin-bottom: 20px;
          }

          .close-sky-msg {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 5px;
            color: #f9a8d4;
            transition: transform 0.2s;
          }

          .close-sky-msg:hover {
            transform: scale(1.1);
          }

          /* Footer */
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.9);
            animation: fadeIn 2.5s ease-in forwards;
          }

          .heart-pulse {
            display: inline-block;
            animation: heartPulse 1.5s ease-in-out infinite;
          }

          @keyframes heartPulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
          }

          /* Responsive */
          @media (max-width: 768px) {
            .header h1 {
              margin-bottom: 30px;
            }

            .garden {
              min-height: 300px;
            }

            .flowers-container {
              padding-bottom: 30px;
            }

            .flower {
              width: 50px;
              height: 100px;
            }

            .stem {
              height: 65px;
            }

            .modal {
              padding: 35px 20px;
              max-width: 95%;
            }

            .modal img {
              width: 180px;
              height: 180px;
              margin-bottom: 20px;
            }

            .modal-title {
              font-size: 1.4rem;
            }

            .modal-memory {
              font-size: 1rem;
            }

            .music-control {
              bottom: 20px;
              right: 20px;
              width: 45px;
              height: 45px;
            }

            .day-night-btn {
              padding: 10px 15px;
              font-size: 0.9rem;
            }

            .memory-counter {
              top: 10px;
              right: 10px;
              padding: 8px 15px;
              font-size: 0.85rem;
            }

            .sky-message {
              padding: 20px;
            }

            .sky-message h2 {
              font-size: 1.2rem;
            }

            .sky-message p {
              font-size: 0.9rem;
            }

            .close-sky-msg {
              font-size: 1.2rem;
            }

            .intro-content h1 {
              font-size: 2rem;
            }

            .intro-content p {
              font-size: 1.1rem;
            }

            .intro-btn {
              padding: 12px 40px;
              font-size: 1rem;
            }
          }
        `}</style>
      </head>
      <body>
        <div className={`intro-screen ${!showIntro ? "hide" : ""}`}>
          <div className="intro-content">
            <div className="intro-emoji">🌷</div>
            <h1>Welcome to Your Memory Garden</h1>
            <p>Explore 6 beautiful memories we've shared together and discover the love behind each flower.</p>
            <button className="intro-btn" onClick={handleIntroClick}>
              Begin the Journey ✨
            </button>
          </div>
        </div>

        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>

        <div className="memory-counter">Memories found: {flowerClicks} / 6 🌸</div>

        {butterflies.map((butterfly) => (
          <div
            key={butterfly.id}
            className="butterfly"
            style={{
              left: `${butterfly.left}%`,
              top: `${butterfly.top}%`,
              animation: `butterflyFly ${butterfly.duration}s linear forwards`,
              animationDelay: `${butterfly.delay}s`,
            }}
          >
            🦋
          </div>
        ))}

        {mouseTrail.map((dot) => (
          <div
            key={dot.id}
            className="mouse-trail-dot"
            style={{
              left: `${dot.x}px`,
              top: `${dot.y}px`,
            }}
          ></div>
        ))}

        {/* Confetti rendering */}
        {confetti.map((item) => (
          <div
            key={item.id}
            className="confetti"
            style={{
              left: `${item.left}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
            }}
          >
            {["🎉", "🎊", "🎈", "✨", "💖"][Math.floor(Math.random() * 5)]}
          </div>
        ))}

        <div className={`modal-overlay ${modalActive ? "active" : ""}`}>
          <div className="modal">
            <button className="close-btn" onClick={closeModal}>
              ✕
            </button>
            <img
                src={`/memories/memory-photo-${currentMemoryIndex + 1}.jpg?${Date.now()}`}
                alt="Memory"
            />

            <h2 className="modal-title">{memories[currentMemoryIndex].title}</h2>
            <p className="modal-memory">{memories[currentMemoryIndex].memory}</p>
          </div>
        </div>

        {showSkyMessage && (
          <div className="sky-message">
            <h2>🎂 Happy Birthday Agrima! 🎂</h2>
            <p>
              You've explored all the beautiful memories we've shared together. Each flower represents a moment that
              made my heart bloom. Wishing you a day filled with joy, laughter, and endless love. You deserve all the
              happiness in the world!
            </p>
            <button className="close-sky-msg" onClick={() => setShowSkyMessage(false)}>
              ✕
            </button>
          </div>
        )}

        <div className="container">
          <div className="welcome">Welcome to your Memory Garden, Agrima 🌷</div>

          <div className="header">
            <h1>Every flower is a memory with you, Agrima 🌼</h1>
            <button className="day-night-btn" onClick={() => setNightMode(!nightMode)}>
              {nightMode ? "☀️ Day Garden" : "🌙 Night Garden"}
            </button>
          </div>

          <div className="garden">
            <div className="flowers-container">
              {memories.map((mem, idx) => (
                <div key={idx} className="flower" onClick={() => openModal(idx)}>
                  <div className="flower-sway">
                    <div className="stem"></div>
                    <div className="petals">
                      <div className="petal petal1"></div>
                      <div className="petal petal2"></div>
                      <div className="petal petal3"></div>
                      <div className="petal petal4"></div>
                      <div className="petal petal5"></div>
                      <div className="petal petal6"></div>
                    </div>
                    <div className="center"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grass"></div>
          </div>

          <div className="footer">
            Made with love by Suyash <span className="heart-pulse">💕</span>
          </div>
        </div>

        <button className="music-control" onClick={toggleMusic}>
          {musicPlaying ? "🔊" : "🔇"}
        </button>
        <audio id="bg-music" loop preload="auto">
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Naam%20Tera%20Ndee%20Kundu%20128%20Kbps-QBtkT8ABrXsrvjybEvMxTIgXRQLeV6.mp3" type="audio/mpeg" />
        </audio>
      </body>
    </html>
  )
}
