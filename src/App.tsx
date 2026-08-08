import ColorBends from './components/ColorBends'

export default function App() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black text-white flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full">
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
          transparent
          autoRotate={0}
          color="#f22135"
        />
      </div>
      <div className="relative z-10 text-center px-6 pointer-events-none select-none">
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent drop-shadow-2xl">
          defeat
        </h1>
      </div>
    </main>
  )
}
