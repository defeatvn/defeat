import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import Tilt from 'react-parallax-tilt'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ColorBends from './components/ColorBends'
import DiscordWidget from './components/DiscordWidget'

export default function App() {
  const [isIntro, setIsIntro] = useState(true)
  const [activeSection, setActiveSection] = useState(0)
  const isScrollingRef = useRef(false)
  const touchStartRef = useRef(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntro(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      if (isIntro || isScrollingRef.current) return

      if (Math.abs(e.deltaY) < 15) return

      if (e.deltaY > 0 && activeSection === 0) {
        isScrollingRef.current = true
        setActiveSection(1)
        setTimeout(() => {
          isScrollingRef.current = false
        }, 1300)
      } else if (e.deltaY < 0 && activeSection === 1) {
        isScrollingRef.current = true
        setActiveSection(0)
        setTimeout(() => {
          isScrollingRef.current = false
        }, 1300)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [activeSection, isIntro])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isIntro || isScrollingRef.current) return
    const diff = touchStartRef.current - e.changedTouches[0].clientY
    if (Math.abs(diff) < 40) return

    if (diff > 0 && activeSection === 0) {
      isScrollingRef.current = true
      setActiveSection(1)
      setTimeout(() => {
        isScrollingRef.current = false
      }, 1300)
    } else if (diff < 0 && activeSection === 1) {
      isScrollingRef.current = true
      setActiveSection(0)
      setTimeout(() => {
        isScrollingRef.current = false
      }, 1300)
    }
  }

  return (
    <main
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-screen w-screen overflow-hidden bg-black text-white select-none"
    >
      <div className="absolute inset-0 w-full h-full z-0 opacity-50 pointer-events-none">
        <ColorBends
          colors={["#ff4d61", "#f22135", "#7a0c1b"]}
          rotation={90}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          noise={0.15}
          parallax={0.5}
          iterations={1}
          intensity={1.5}
          bandWidth={6}
          transparent={false}
          autoRotate={0}
          color="#f22135"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isIntro ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 bg-black z-30 pointer-events-none"
      />

      <motion.div
        animate={{ y: activeSection === 0 ? '0vh' : '-100vh' }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-40 w-full h-[200vh] flex flex-col"
      >
        <section className="relative w-screen h-screen flex flex-col items-center justify-center px-6">
          <Tilt tiltEnable={!isIntro && activeSection === 0} className="relative">
            <motion.div
              initial={{
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(255, 255, 255, 0)',
                boxShadow: 'none'
              }}
              animate={{
                backgroundColor: isIntro ? 'rgba(0, 0, 0, 0)' : 'rgba(10, 10, 12, 0.45)',
                borderColor: isIntro ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.12)',
                boxShadow: isIntro
                  ? 'none'
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(242, 33, 53, 0.15)'
              }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-[92vw] max-w-[640px] flex flex-col items-center justify-center px-8 py-10 md:px-16 md:py-14 rounded-3xl backdrop-blur-2xl border"
            >
              <motion.div
                initial={{ scale: 1.6 }}
                animate={{
                  scale: isIntro ? 1.6 : 1.0,
                  filter: isIntro
                    ? 'drop-shadow(0 0 60px rgba(242, 33, 53, 0.9))'
                    : 'drop-shadow(0 0 25px rgba(242, 33, 53, 0.4))'
                }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center mb-4"
              >
                <img
                  src="/defeat.png"
                  alt="DEFEAT Logo"
                  className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-2xl"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{
                  opacity: isIntro ? 0 : 1,
                  y: isIntro ? 15 : 0
                }}
                transition={{
                  duration: 0.9,
                  delay: isIntro ? 0 : 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="text-center flex flex-col items-center"
              >
                <h1
                  style={{ fontFamily: "'Averion', sans-serif" }}
                  className="text-6xl md:text-8xl tracking-tighter uppercase bg-gradient-to-b from-[#ff5c72] via-[#f22135] to-[#991221] bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(242,33,53,0.8)]"
                >
                  defeat
                </h1>

                <p className="mt-4 text-xs md:text-sm font-semibold tracking-[0.35em] uppercase text-zinc-300/80 font-mono drop-shadow-md">
                  BUILD. IMPROVE. NEVER SURRENDER.
                </p>
              </motion.div>
            </motion.div>
          </Tilt>

          {!isIntro && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={() => setActiveSection(1)}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity group"
            >
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-zinc-400 group-hover:text-white transition-colors">
                Scroll for more
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-4 h-4 text-red-500" />
              </motion.div>
            </motion.div>
          )}
        </section>

        <section className="relative w-screen h-screen flex flex-col items-center justify-center px-6">
          <motion.div
            onClick={() => setActiveSection(0)}
            className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity group z-50"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronUp className="w-4 h-4 text-red-500" />
            </motion.div>
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-zinc-400 group-hover:text-white transition-colors">
              Back to top
            </span>
          </motion.div>

          <DiscordWidget inviteCode="mCKAHD7SM2" />
        </section>
      </motion.div>
    </main>
  )
}
