import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [stage, setStage] = useState<'loading' | 'hello' | 'bio'>('loading');

  // Цвета кубика Рубика
  const rubikColors = [
    'bg-red-500',
    'bg-blue-500', 
    'bg-green-500',
    'bg-yellow-400',
    'bg-orange-500',
    'bg-white',
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500'
  ];

  useEffect(() => {
    // Переход к "hello" после загрузки
    const helloTimer = setTimeout(() => {
      setStage('hello');
    }, 5000);

    // Переход к био после "hello"
    const bioTimer = setTimeout(() => {
      setStage('bio');
    }, 9000);

    return () => {
      clearTimeout(helloTimer);
      clearTimeout(bioTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Загрузка - кубик Рубика */}
        {stage === 'loading' && (
          <motion.div
            key="loading"
            className="grid grid-cols-3 gap-3"
            style={{ perspective: '1000px' }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
          >
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-24 h-24 rounded-md ${rubikColors[i]} border-2 border-black/30 shadow-xl`}
                initial={{ opacity: 0, scale: 0, rotateX: 0, rotateY: 0 }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  rotateX: [0, 90, 180, 270, 360],
                  rotateY: [0, 90, 180, 270, 360],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: i * 0.08 },
                  scale: { duration: 0.6, delay: i * 0.08 },
                  rotateX: { 
                    duration: 4,
                    delay: i * 0.08,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop"
                  },
                  rotateY: { 
                    duration: 4,
                    delay: i * 0.08,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop"
                  }
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Hello экран */}
        {stage === 'hello' && (
          <motion.h1
            key="hello"
            className="text-black text-9xl"
            style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 200, letterSpacing: '-0.04em' }}
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ 
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{ 
              opacity: 0,
              scale: 1.2,
              y: -50
            }}
            transition={{ 
              duration: 1.5,
              ease: "easeOut"
            }}
          >
            hello
          </motion.h1>
        )}

        {/* Био секция */}
        {stage === 'bio' && (
          <motion.div
            key="bio"
            className="relative max-w-4xl mx-auto px-6 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Клякса обертка с постоянной анимацией */}
            <motion.div
              className="absolute inset-0 shadow-2xl -z-10"
              style={{
                background: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 50%, #f0f0f0 100%)',
              }}
              initial={{ 
                scale: 0,
                borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%'
              }}
              animate={{ 
                scale: 1.3,
                borderRadius: [
                  '63% 37% 54% 46% / 55% 48% 52% 45%',
                  '48% 52% 68% 32% / 42% 56% 44% 58%',
                  '60% 40% 50% 50% / 48% 55% 45% 52%',
                  '55% 45% 62% 38% / 52% 43% 57% 48%',
                  '63% 37% 54% 46% / 55% 48% 52% 45%'
                ],
                rotate: [0, 360]
              }}
              transition={{ 
                scale: {
                  duration: 1.5,
                  ease: "easeOut"
                },
                borderRadius: {
                  duration: 15,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop"
                },
                rotate: {
                  duration: 30,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop"
                }
              }}
            />
            
            <div className="relative py-24 px-12">
              <motion.h2
                className="text-black text-8xl mb-10"
                style={{ 
                  fontFamily: "'Inter', 'Segoe UI', sans-serif", 
                  fontWeight: 200, 
                  letterSpacing: '-0.04em' 
                }}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.5,
                  duration: 1.2,
                  ease: "easeOut"
                }}
              >
                snostrue
              </motion.h2>
              
              <motion.p
                className="text-gray-700 text-2xl leading-relaxed max-w-2xl mx-auto"
                style={{ 
                  fontFamily: "'Inter', 'Segoe UI', sans-serif", 
                  fontWeight: 300 
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 1,
                  duration: 1.2,
                  ease: "easeOut"
                }}
              >
                Мне 14 лет. Люблю кодить на Python, JavaScript, Java и C++. <br />
                Зависаю в тг и на anixart. Общительный и позитивный человек.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
