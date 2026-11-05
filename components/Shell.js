import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { keluar } from '@/app/login/actions'
import { PERAN } from '@/lib/akun'

// Menu tanpa href = belum dibuat (tampil "segera"). Isi href saat modulnya jadi.
const MENU = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid', href: '/dashboard' },
  { label: 'Inventaris', icon: 'box-seam', items: [{ label: 'Data Barang' }, { label: 'Peminjaman' }] },
  { label: 'Persuratan', icon: 'envelope-paper', items: [{ label: 'Arsip Surat' }] },
  { label: 'Keuangan', icon: 'cash-stack', items: [{ label: 'Kas Anggota' }, { label: 'RAB Kegiatan' }] },
  { label: 'Master', icon: 'database', items: [{ id: 'anggota', label: 'Anggota', href: '/anggota' }, { label: 'Kategori' }, { label: 'Lokasi' }] },
]
function Tautan({ m, aktif }) {
  const ikon = <i className={`bi bi-${m.icon || 'circle'}`} />
  if (!m.href) return <span className="soon">{ikon}{m.label}<small>segera</small></span>
  return <Link href={m.href} className={aktif === m.id ? 'aktif' : ''}>{ikon}{m.label}</Link>
}
export default async function Shell({ aktif, judul, children }) {
  const sb = createClient()
  const { data: { user } } = await sb.auth.getUser()
  const { data: saya } = user ? await sb.from('anggota').select('nama_adat,peran').eq('user_id', user.id).maybeSingle() : { data: null }
  const peran = saya && PERAN[saya.peran] !== '-' ? PERAN[saya.peran] : 'Anggota'
  return (<>
    <input id="menu" type="checkbox" hidden />
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><img src="/logo.jpeg" alt="" /><span>Rimbawana</span></div>
        {MENU.map(g => g.items ? (
          <details key={g.label} open={g.items.some(i => i.id === aktif)}>
            <summary><i className={`bi bi-${g.icon}`} />{g.label}<i className="bi bi-chevron-down ms-auto" /></summary>
            <div>{g.items.map(i => <Tautan key={i.label} m={i} aktif={aktif} />)}</div>
          </details>) : <Tautan key={g.label} m={g} aktif={aktif} />)}
      </aside>
      <div className="konten">
        <header className="topbar">
          <label htmlFor="menu" className="burger"><i className="bi bi-list" /></label>
          <h1>{judul}</h1>
          <div className="user"><span><b>{saya?.nama_adat}</b><small>{peran}</small></span>
            <form action={keluar}><button className="kecil" title="Keluar"><i className="bi bi-box-arrow-right" /></button></form></div>
        </header>
        <main>{children}</main>
      </div>
    </div></>)
}
