import { useEffect, useRef, useState } from "react";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function useMouse() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event) => setMouse({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return mouse;
}

function useRandomBlink() {
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    let timeout;
    const queue = () => {
      timeout = window.setTimeout(() => {
        setBlinking(true);
        timeout = window.setTimeout(() => {
          setBlinking(false);
          queue();
        }, 150);
      }, 3000 + Math.random() * 4000);
    };
    queue();
    return () => window.clearTimeout(timeout);
  }, []);

  return blinking;
}

function EyeDot({ size = 12, maxDistance = 5, pupilColor = "#2D2D2D", forceLookX, forceLookY }) {
  const ref = useRef(null);
  const mouse = useMouse();

  let x = 0;
  let y = 0;
  if (forceLookX !== undefined && forceLookY !== undefined) {
    x = forceLookX;
    y = forceLookY;
  } else if (ref.current) {
    const rect = ref.current.getBoundingClientRect();
    const dx = mouse.x - (rect.left + rect.width / 2);
    const dy = mouse.y - (rect.top + rect.height / 2);
    const distance = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
    const angle = Math.atan2(dy, dx);
    x = Math.cos(angle) * distance;
    y = Math.sin(angle) * distance;
  }

  return (
    <div
      ref={ref}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${x}px, ${y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    />
  );
}

function Eye({ size = 48, pupilSize = 16, maxDistance = 10, eyeColor = "white", pupilColor = "#2D2D2D", blinking = false, forceLookX, forceLookY }) {
  const ref = useRef(null);
  const mouse = useMouse();

  let x = 0;
  let y = 0;
  if (forceLookX !== undefined && forceLookY !== undefined) {
    x = forceLookX;
    y = forceLookY;
  } else if (ref.current) {
    const rect = ref.current.getBoundingClientRect();
    const dx = mouse.x - (rect.left + rect.width / 2);
    const dy = mouse.y - (rect.top + rect.height / 2);
    const distance = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
    const angle = Math.atan2(dy, dx);
    x = Math.cos(angle) * distance;
    y = Math.sin(angle) * distance;
  }

  return (
    <div
      ref={ref}
      className="flex items-center justify-center rounded-full transition-all duration-150"
      style={{
        width: `${size}px`,
        height: blinking ? "2px" : `${size}px`,
        backgroundColor: eyeColor,
        overflow: "hidden",
      }}
    >
      {!blinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${x}px, ${y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      )}
    </div>
  );
}

export function AuthIllustration({ isTyping = false, showPassword = false, passwordLength = 0, passwordActive = false }) {
  const mouse = useMouse();
  const purpleRef = useRef(null);
  const blackRef = useRef(null);
  const yellowRef = useRef(null);
  const orangeRef = useRef(null);
  const purpleBlink = useRandomBlink();
  const blackBlink = useRandomBlink();
  const [typingLook, setTypingLook] = useState(false);
  const [peek, setPeek] = useState(false);

  useEffect(() => {
    if (!isTyping) {
      setTypingLook(false);
      return undefined;
    }
    setTypingLook(true);
    const timeout = window.setTimeout(() => setTypingLook(false), 800);
    return () => window.clearTimeout(timeout);
  }, [isTyping]);

  useEffect(() => {
    if (passwordLength <= 0 || !showPassword) {
      setPeek(false);
      return undefined;
    }
    const timeout = window.setTimeout(() => {
      setPeek(true);
      window.setTimeout(() => setPeek(false), 800);
    }, 2000 + Math.random() * 3000);
    return () => window.clearTimeout(timeout);
  }, [passwordLength, showPassword, peek]);

  const metrics = (ref) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;
    const dx = mouse.x - centerX;
    return {
      faceX: clamp(dx / 20, -15, 15),
      faceY: clamp((mouse.y - centerY) / 30, -10, 10),
      bodySkew: clamp(-dx / 120, -6, 6),
    };
  };

  const purple = metrics(purpleRef);
  const black = metrics(blackRef);
  const yellow = metrics(yellowRef);
  const orange = metrics(orangeRef);
  const hidingPassword = (passwordLength > 0 || passwordActive) && !showPassword;

  return (
    <div className="relative" style={{ width: "550px", height: "400px" }}>
      <div
        ref={purpleRef}
        className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: "70px",
          width: "180px",
          height: isTyping || hidingPassword ? "440px" : "400px",
          backgroundColor: "#6C3FF5",
          borderRadius: "10px 10px 0 0",
          zIndex: 1,
          transform: showPassword && (passwordLength > 0 || passwordActive)
            ? "skewX(0deg)"
            : isTyping || hidingPassword
              ? `skewX(${purple.bodySkew - 12}deg) translateX(40px)`
              : `skewX(${purple.bodySkew}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          className="absolute flex gap-8 transition-all duration-700 ease-in-out"
          style={{
            left: showPassword && (passwordLength > 0 || passwordActive) ? "20px" : typingLook ? "55px" : `${45 + purple.faceX}px`,
            top: showPassword && (passwordLength > 0 || passwordActive) ? "35px" : typingLook ? "65px" : `${40 + purple.faceY}px`,
          }}
        >
          <Eye size={18} pupilSize={7} maxDistance={5} blinking={purpleBlink} forceLookX={showPassword && (passwordLength > 0 || passwordActive) ? (peek ? 4 : -4) : typingLook ? 3 : undefined} forceLookY={showPassword && (passwordLength > 0 || passwordActive) ? (peek ? 5 : -4) : typingLook ? 4 : undefined} />
          <Eye size={18} pupilSize={7} maxDistance={5} blinking={purpleBlink} forceLookX={showPassword && (passwordLength > 0 || passwordActive) ? (peek ? 4 : -4) : typingLook ? 3 : undefined} forceLookY={showPassword && (passwordLength > 0 || passwordActive) ? (peek ? 5 : -4) : typingLook ? 4 : undefined} />
        </div>
      </div>

      <div
        ref={blackRef}
        className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: "240px",
          width: "120px",
          height: "310px",
          backgroundColor: "#2D2D2D",
          borderRadius: "8px 8px 0 0",
          zIndex: 2,
          transform: showPassword && (passwordLength > 0 || passwordActive)
            ? "skewX(0deg)"
            : typingLook
              ? `skewX(${black.bodySkew * 1.5 + 10}deg) translateX(20px)`
              : isTyping || hidingPassword
                ? `skewX(${black.bodySkew * 1.5}deg)`
                : `skewX(${black.bodySkew}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          className="absolute flex gap-6 transition-all duration-700 ease-in-out"
          style={{
            left: showPassword && (passwordLength > 0 || passwordActive) ? "10px" : typingLook ? "32px" : `${26 + black.faceX}px`,
            top: showPassword && (passwordLength > 0 || passwordActive) ? "28px" : typingLook ? "12px" : `${32 + black.faceY}px`,
          }}
        >
          <Eye size={16} pupilSize={6} maxDistance={4} blinking={blackBlink} forceLookX={showPassword && (passwordLength > 0 || passwordActive) ? -4 : typingLook ? 0 : undefined} forceLookY={showPassword && (passwordLength > 0 || passwordActive) || typingLook ? -4 : undefined} />
          <Eye size={16} pupilSize={6} maxDistance={4} blinking={blackBlink} forceLookX={showPassword && (passwordLength > 0 || passwordActive) ? -4 : typingLook ? 0 : undefined} forceLookY={showPassword && (passwordLength > 0 || passwordActive) || typingLook ? -4 : undefined} />
        </div>
      </div>

      <div
        ref={orangeRef}
        className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: "0px",
          width: "240px",
          height: "200px",
          zIndex: 3,
          backgroundColor: "#FF9B6B",
          borderRadius: "120px 120px 0 0",
          transform: showPassword && (passwordLength > 0 || passwordActive) ? "skewX(0deg)" : `skewX(${orange.bodySkew}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          className="absolute flex gap-8 transition-all duration-200 ease-out"
          style={{
            left: showPassword && (passwordLength > 0 || passwordActive) ? "50px" : `${82 + orange.faceX}px`,
            top: showPassword && (passwordLength > 0 || passwordActive) ? "85px" : `${90 + orange.faceY}px`,
          }}
        >
          <EyeDot forceLookX={showPassword && (passwordLength > 0 || passwordActive) ? -5 : undefined} forceLookY={showPassword && (passwordLength > 0 || passwordActive) ? -4 : undefined} />
          <EyeDot forceLookX={showPassword && (passwordLength > 0 || passwordActive) ? -5 : undefined} forceLookY={showPassword && (passwordLength > 0 || passwordActive) ? -4 : undefined} />
        </div>
      </div>

      <div
        ref={yellowRef}
        className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: "310px",
          width: "140px",
          height: "230px",
          backgroundColor: "#E8D754",
          borderRadius: "70px 70px 0 0",
          zIndex: 4,
          transform: showPassword && (passwordLength > 0 || passwordActive) ? "skewX(0deg)" : `skewX(${yellow.bodySkew}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          className="absolute flex gap-6 transition-all duration-200 ease-out"
          style={{
            left: showPassword && (passwordLength > 0 || passwordActive) ? "20px" : `${52 + yellow.faceX}px`,
            top: showPassword && (passwordLength > 0 || passwordActive) ? "35px" : `${40 + yellow.faceY}px`,
          }}
        >
          <EyeDot forceLookX={showPassword && (passwordLength > 0 || passwordActive) ? -5 : undefined} forceLookY={showPassword && (passwordLength > 0 || passwordActive) ? -4 : undefined} />
          <EyeDot forceLookX={showPassword && (passwordLength > 0 || passwordActive) ? -5 : undefined} forceLookY={showPassword && (passwordLength > 0 || passwordActive) ? -4 : undefined} />
        </div>
        <div
          className="absolute h-[4px] w-20 rounded-full bg-[#2D2D2D] transition-all duration-200 ease-out"
          style={{
            left: showPassword && (passwordLength > 0 || passwordActive) ? "10px" : `${40 + yellow.faceX}px`,
            top: showPassword && (passwordLength > 0 || passwordActive) ? "88px" : `${88 + yellow.faceY}px`,
          }}
        />
      </div>
    </div>
  );
}
