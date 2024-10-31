import { useRef, useEffect, useState } from 'react';

const App = () => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [points] = useState([
    {x: 80, y: 50},
    { x: 80, y: 100 },
    { x: 75, y: 150 },
    { x: 30, y: 200 },
    { x: 50, y: 250 },
    { x: 120, y: 220 },
    { x: 175, y: 240 },
    { x: 200, y: 270 },
    { x: 205, y: 300 },
    { x: 180, y: 330 },
  ]);
  // Устанавливаем начальное положение синего круга
  const [figurePos, setFigurePos] = useState({ x: 80, y: 50 });

  useEffect(() => {
    const img = new Image();
    img.src = 'https://s3-alpha-sig.figma.com/img/d8e9/558e/ca0bdcac2dd9206fbc8577062c82e9c7?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NXRMI-V32l~6x2G~XJJdcqMGBIWSP8t-duPtdesblws0UIwvmo09r3EnZl9dW6slhysv4m6h5r5sWcZQotP6lba2mS3J~rvETUmtWFvVg~YSTs-g2PouPMahovuuv0zjMbGaP2~bzu7qItNHgR-RIqsH3Ze6BNE6VPDi-XrUS9E3EVfJgP7Q3YJG9A-l9BqPRFsv1WwqBCVwzDCJBp5DirfV3RR2nOUNBdL71fY3NCO0yWiIwMksi9DZvWaVdcrh97VPkk2FV7EupUwXDjbgtG7yTmx3phfshiXGnyqni0kDidyNzI~IzQSNZLg8N4aDvVSZKXWw0CZA~MiAbbSH4g';
    img.onload = () => {
      setImage(img);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (image) {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

    points.forEach(point => {
      context.fillStyle = 'black';
      context.beginPath();
      context.arc(point.x, point.y, 5, 0, Math.PI * 2, true);
      context.fill();
    });

    // Рисуем синий круг на позиции figurePos
    context.fillStyle = 'blue';
    context.beginPath();
    context.arc(figurePos.x, figurePos.y, 10, 0, Math.PI * 2, true);
    context.fill();
  }, [image, points, figurePos]);

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
  
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
  
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
  
    points.forEach(point => {
      const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
      if (distance < 5) {
        setFigurePos(point);
      }
    });
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      style={{
        width: '100%',        
        maxWidth: '400px',     
        zIndex: '-1'
      }}
      height={520}
    />
  );
};

export default App;