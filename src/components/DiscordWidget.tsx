import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Tilt from 'react-parallax-tilt'

interface DiscordData {
  name: string
  description: string
  iconUrl: string | null
  memberCount: number
  onlineCount: number
  inviteCode: string
}

const DEFAULT_INVITE = 'mCKAHD7SM2'

export default function DiscordWidget({ inviteCode = DEFAULT_INVITE }: { inviteCode?: string }) {
  const [data, setData] = useState<DiscordData | null>({
    name: 'VANI STUDIO',
    description: "Vani Studio - we don't design websites, we design empires. Built for hustlers, powered by chaos, styled like a boss.",
    iconUrl: 'https://cdn.discordapp.com/icons/1266279040067833898/2a8c6ff76e1cf654f5c9aed75c79c870.png?size=256',
    memberCount: 485,
    onlineCount: 89,
    inviteCode: DEFAULT_INVITE
  })

  useEffect(() => {
    async function fetchDiscordInvite() {
      try {
        const res = await fetch(`https://discord.com/api/v10/invites/${inviteCode}?with_counts=true`)
        if (!res.ok) return
        const json = await res.json()

        const guild = json.guild
        const icon = guild?.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=256` : null

        setData({
          name: guild?.name || 'VANI STUDIO',
          description: guild?.description || "Vani Studio - we don't design websites, we design empires.",
          iconUrl: icon,
          memberCount: json.approximate_member_count || 485,
          onlineCount: json.approximate_presence_count || 89,
          inviteCode: json.code || inviteCode
        })
      } catch (err) {
        console.error('Failed to fetch Discord invite data:', err)
      }
    }

    fetchDiscordInvite()
  }, [inviteCode])

  if (!data) return null

  return (
    <Tilt className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-[92vw] max-w-[640px] flex flex-col items-center justify-center select-none px-8 py-10 md:px-16 md:py-14 rounded-3xl backdrop-blur-2xl border bg-[rgba(10,10,12,0.45)] border-white/12 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_40px_rgba(242,33,53,0.15)] text-center"
      >
        <div className="relative mb-6">
          {data.iconUrl ? (
            <img
              src={data.iconUrl}
              alt={data.name}
              className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border border-white/15 object-cover shadow-2xl"
            />
          ) : (
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border border-white/15 bg-zinc-900 flex items-center justify-center font-bold text-4xl text-white">
              {data.name.charAt(0)}
            </div>
          )}
        </div>

        <h2
          style={{ fontFamily: "'Averion', sans-serif" }}
          className="text-4xl md:text-6xl tracking-tighter uppercase bg-gradient-to-b from-[#ff5c72] via-[#f22135] to-[#991221] bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(242,33,53,0.8)]"
        >
          {data.name}
        </h2>

        <p className="mt-3 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-zinc-400 font-mono">
          <span className="text-emerald-400">{data.onlineCount.toLocaleString()} ONLINE</span>
          <span className="mx-2 text-zinc-600">•</span>
          <span>{data.memberCount.toLocaleString()} MEMBERS</span>
        </p>

        {data.description && (
          <p className="mt-4 text-xs md:text-sm text-zinc-300/80 tracking-wide leading-relaxed max-w-md">
            {data.description}
          </p>
        )}

        <a
          href={`https://discord.gg/${data.inviteCode}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white font-semibold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 active:scale-95 cursor-pointer"
        >
          <span>JOIN DISCORD</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </motion.div>
    </Tilt>
  )
}
