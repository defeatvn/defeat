import { useState, useEffect, useRef } from 'react'
import { motion, type Variants } from 'motion/react'
import Tilt from 'react-parallax-tilt'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ColorBends from './components/ColorBends'
import DiscordWidget from './components/DiscordWidget'
type IntroPhase =
  | 'boot'
  | 'logoReveal'
  | 'logoImpact'
  | 'logoSettle'
  | 'interfaceReveal'
  | 'complete'
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const TIMELINE: Array<[IntroPhase, number]> = [
  ['logoReveal', 300],
  ['logoImpact', 1000],
  ['logoSettle', 1180],
  ['interfaceReveal', 1300],
  ['complete', 2400],
]
const REDUCED_TIMELINE: Array<[IntroPhase, number]> = [
  ['logoReveal', 80],
  ['interfaceReveal', 220],
  ['complete', 480],
]
function makeLogoVariants(lite: boolean, reduced: boolean): Variants {
  const BIG = 1.5
  const CENTER_Y = 64
  if (reduced) {
    const glow =
      'blur(0px) brightness(1) drop-shadow(0 0 14px rgba(242,33,53,0.25)) drop-shadow(0 0 34px rgba(242,33,53,0.1))'
    const dark =
      'blur(0px) brightness(1) drop-shadow(0 0 0px rgba(242,33,53,0)) drop-shadow(0 0 0px rgba(242,33,53,0))'
    return {
      boot: { opacity: 0, scale: 1, y: 0, filter: dark, transition: { duration: 0.15 } },
      logoReveal: { opacity: 1, scale: 1, y: 0, filter: glow, transition: { duration: 0.25 } },
      logoImpact: { opacity: 1, scale: 1, y: 0, filter: glow, transition: { duration: 0.15 } },
      logoSettle: { opacity: 1, scale: 1, y: 0, filter: glow, transition: { duration: 0.15 } },
      interfaceReveal: { opacity: 1, scale: 1, y: 0, filter: glow, transition: { duration: 0.2 } },
      complete: { opacity: 1, scale: 1, y: 0, filter: glow, transition: { duration: 0.2 } },
    }
  }
  if (lite) {
    return {
      boot: { opacity: 0, scale: BIG * 1.05, y: CENTER_Y, transition: { duration: 0.3, ease: EASE } },
      logoReveal: { opacity: 1, scale: BIG, y: CENTER_Y, transition: { duration: 0.55, ease: EASE } },
      logoImpact: { opacity: 1, scale: BIG * 1.03, y: CENTER_Y, transition: { duration: 0.16, ease: 'easeOut' } },
      logoSettle: { opacity: 1, scale: BIG, y: CENTER_Y, transition: { duration: 0.22, ease: EASE } },
      interfaceReveal: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      complete: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
    }
  }
  return {
    boot: {
      opacity: 0,
      scale: BIG * 1.05,
      y: CENTER_Y,
      filter:
        'blur(12px) brightness(0.55) drop-shadow(0 0 0px rgba(242,33,53,0)) drop-shadow(0 0 0px rgba(242,33,53,0))',
      transition: { duration: 0.3, ease: EASE },
    },
    logoReveal: {
      opacity: 1,
      scale: BIG,
      y: CENTER_Y,
      filter:
        'blur(0px) brightness(1) drop-shadow(0 0 28px rgba(242,33,53,0.4)) drop-shadow(0 0 70px rgba(242,33,53,0.2))',
      transition: { duration: 0.55, ease: EASE },
    },
    logoImpact: {
      opacity: 1,
      scale: BIG * 1.03,
      y: CENTER_Y,
      filter:
        'blur(0px) brightness(1.12) drop-shadow(0 0 42px rgba(242,33,53,0.62)) drop-shadow(0 0 110px rgba(242,33,53,0.4))',
      transition: { duration: 0.16, ease: 'easeOut' },
    },
    logoSettle: {
      opacity: 1,
      scale: BIG,
      y: CENTER_Y,
      filter:
        'blur(0px) brightness(1) drop-shadow(0 0 22px rgba(242,33,53,0.26)) drop-shadow(0 0 56px rgba(242,33,53,0.14))',
      transition: { duration: 0.22, ease: EASE },
    },
    interfaceReveal: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter:
        'blur(0px) brightness(1) drop-shadow(0 0 16px rgba(242,33,53,0.26)) drop-shadow(0 0 40px rgba(242,33,53,0.12))',
      transition: { duration: 0.65, ease: EASE },
    },
    complete: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter:
        'blur(0px) brightness(1) drop-shadow(0 0 16px rgba(242,33,53,0.26)) drop-shadow(0 0 40px rgba(242,33,53,0.12))',
      transition: { duration: 0.65, ease: EASE },
    },
  }
}

function makeGlowVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      boot: { opacity: 0, scale: 1 },
      logoReveal: { opacity: 0.12, scale: 1 },
      logoImpact: { opacity: 0.12, scale: 1 },
      logoSettle: { opacity: 0.12, scale: 1 },
      interfaceReveal: { opacity: 0.1, scale: 1 },
      complete: { opacity: 0.1, scale: 1 },
    }
  }
  return {
    boot: { opacity: 0, scale: 0.7, transition: { duration: 0.3, ease: EASE } },
    logoReveal: { opacity: 0.42, scale: 1, transition: { duration: 0.55, ease: EASE } },
    logoImpact: { opacity: 0.5, scale: 1.06, transition: { duration: 0.16, ease: 'easeOut' } },
    logoSettle: { opacity: 0.12, scale: 1, transition: { duration: 0.3, ease: EASE } },
    interfaceReveal: { opacity: 0.1, scale: 1, transition: { duration: 0.5, ease: EASE } },
    complete: { opacity: 0.1, scale: 1, transition: { duration: 0.5, ease: EASE } },
  }
}

export default function App() {
  const [phase, setPhase] = useState<IntroPhase>('boot')
  const [activeSection, setActiveSection] = useState(0)
  const [reducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [lite] = useState(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia('(max-width: 820px)').matches ||
        window.matchMedia('(hover: none) and (pointer: coarse)').matches)
  )
  const isScrollingRef = useRef(false)
  const touchStartRef = useRef(0)

  const introDone = phase === 'complete'
  const ui = phase === 'interfaceReveal' || phase === 'complete'
  const glareSwept = phase !== 'boot' && phase !== 'logoReveal'

  const logoVariants = makeLogoVariants(lite, reducedMotion)
  const glowVariants = makeGlowVariants(reducedMotion)
  useEffect(() => {
    const schedule = reducedMotion ? REDUCED_TIMELINE : TIMELINE
    const timers = schedule.map(([p, t]) => window.setTimeout(() => setPhase(p), t))
    return () => timers.forEach(clearTimeout)
  }, [reducedMotion])
  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      if (!introDone || isScrollingRef.current) return
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
  }, [activeSection, introDone])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!introDone || isScrollingRef.current) return
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
        animate={{ opacity: ui ? 0 : 1 }}
        transition={{
          duration: reducedMotion ? 0.25 : 0.55,
          delay: ui && !reducedMotion ? 0.15 : 0,
          ease: EASE,
        }}
        className="fixed inset-0 bg-black z-30 pointer-events-none"
      />
      <motion.div
        animate={{ y: activeSection === 0 ? '0vh' : '-100vh' }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-40 w-full h-[200vh] flex flex-col"
      >
        <section className="relative w-screen h-screen flex flex-col items-center justify-center px-6">
          <motion.div
            variants={glowVariants}
            initial="boot"
            animate={phase}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(242,33,53,0.16) 0%, rgba(242,33,53,0.06) 40%, transparent 68%)',
            }}
          />

          {!reducedMotion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={
                phase === 'logoImpact'
                  ? { opacity: [0, 0.2, 0], scale: [0.85, 1.35] }
                  : { opacity: 0, scale: 0.85 }
              }
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[460px] max-h-[460px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(242,33,53,0.4) 0%, rgba(242,33,53,0.12) 45%, transparent 65%)',
              }}
            />
          )}

          <Tilt tiltEnable={introDone && activeSection === 0 && !lite} className="relative">
            <motion.div
              initial={{
                scale: 0.97,
                y: 8,
                backgroundColor: 'rgba(10, 10, 12, 0)',
                borderColor: 'rgba(255, 255, 255, 0)',
                boxShadow: 'none',
              }}
              animate={
                ui
                  ? {
                    scale: 1,
                    y: 0,
                    backgroundColor: 'rgba(10, 10, 12, 0.45)',
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    boxShadow:
                      '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(242, 33, 53, 0.12)',
                  }
                  : {
                    scale: 0.97,
                    y: 8,
                    backgroundColor: 'rgba(10, 10, 12, 0)',
                    borderColor: 'rgba(255, 255, 255, 0)',
                    boxShadow: 'none',
                  }
              }
              transition={{ duration: reducedMotion ? 0.2 : 0.55, ease: EASE }}
              className={`relative w-[92vw] max-w-[640px] flex flex-col items-center justify-center px-8 py-10 md:px-16 md:py-14 rounded-3xl border ${lite ? 'backdrop-blur-md' : 'backdrop-blur-2xl'
                }`}
            >
              <motion.div
                variants={logoVariants}
                initial="boot"
                animate={phase}
                className="relative flex items-center justify-center mb-4"
              >
                <img
                  src="/defeat.png"
                  alt="DEFEAT Logo"
                  className="w-40 h-40 md:w-56 md:h-56 object-contain"
                  style={
                    lite
                      ? { filter: 'drop-shadow(0 0 26px rgba(242,33,53,0.42))' }
                      : undefined
                  }
                />
                {!reducedMotion && !lite && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      WebkitMaskImage: 'url(/defeat.png)',
                      maskImage: 'url(/defeat.png)',
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center',
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={glareSwept ? { opacity: [0, 0.35, 0] } : { opacity: 0 }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(120deg, transparent 30%, rgba(255,120,130,0.5) 50%, transparent 70%)',
                        mixBlendMode: 'screen',
                      }}
                    />
                    <motion.div
                      initial={{ x: '-160%', opacity: 0 }}
                      animate={
                        glareSwept
                          ? { x: '160%', opacity: [0, 1, 1, 0] }
                          : { x: '-160%', opacity: 0 }
                      }
                      transition={{
                        x: { duration: 0.7, ease: [0.3, 0, 0.2, 1] },
                        opacity: { duration: 0.7, ease: 'easeInOut', times: [0, 0.15, 0.7, 1] },
                      }}
                      className="absolute inset-y-[-25%] left-0 w-1/3 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white to-transparent"
                      style={{ mixBlendMode: 'screen', filter: 'blur(1px)' }}
                    />
                  </div>
                )}
              </motion.div>

              <div className="text-center flex flex-col items-center">
                <motion.h1
                  initial={{ opacity: 0, y: 12, ...(lite ? {} : { filter: 'blur(4px)' }) }}
                  animate={
                    ui
                      ? { opacity: 1, y: 0, ...(lite ? {} : { filter: 'blur(0px)' }) }
                      : { opacity: 0, y: 12, ...(lite ? {} : { filter: 'blur(4px)' }) }
                  }
                  transition={{
                    duration: reducedMotion ? 0.2 : 0.45,
                    delay: reducedMotion ? 0.05 : 0.15,
                    ease: EASE,
                  }}
                  style={{ fontFamily: "'Averion', sans-serif" }}
                  className="text-6xl md:text-8xl tracking-tighter uppercase bg-gradient-to-b from-[#ff5c72] via-[#f22135] to-[#991221] bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(242,33,53,0.8)]"
                >
                  defeat
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={ui ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  transition={{
                    duration: reducedMotion ? 0.2 : 0.4,
                    delay: reducedMotion ? 0.1 : 0.35,
                    ease: EASE,
                  }}
                  className="mt-4 text-xs md:text-sm font-semibold tracking-[0.35em] uppercase text-zinc-300/80 font-mono drop-shadow-md"
                >
                  BUILD. IMPROVE. NEVER SURRENDER.
                </motion.p>
              </div>
            </motion.div>
          </Tilt>

          {ui && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0.2 : 0.5,
                delay: reducedMotion ? 0.1 : 0.7,
                ease: EASE,
              }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <div
                onClick={() => setActiveSection(1)}
                className="flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity group"
              >
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-zinc-400 group-hover:text-white transition-colors">
                  Scroll for more
                </span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: reducedMotion ? 0.3 : 1.2,
                  }}
                >
                  <ChevronDown className="w-4 h-4 text-red-500" />
                </motion.div>
              </div>
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
