import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Shell from '@/components/Shell'
export const dynamic = 'force-dynamic'
export default async function Dashboard() {
  const sb = createClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) redirect('/login')
  const { data } = await sb.from('anggota').select('jabatan,status,aktif')
  const a = data || []
  const n = (f) => a.filter(f).length
  const kartu = [
    { t: 'Anggota Aktif', n: n(x => x.jabatan !== 'alumni' && x.aktif), i: 'people' },
    { t: 'Pengurus', n: n(x => x.jabatan === 'pengurus' && x.aktif), i: 'person-badge' },
    { t: 'Anggota Muda (AM)', n: n(x => x.status === 'AM' && x.jabatan !== 'alumni'), i: 'person-plus' },
    { t: 'Alumni', n: n(x => x.jabatan === 'alumni'), i: 'mortarboard' }]
  return (<Shell aktif="dashboard" judul="Dashboard">
    <div className="cards">{kartu.map(k => (
      <div className="info" key={k.t}><i className={`bi bi-${k.i}`} /><div><h3>{k.n}</h3><span>{k.t}</span></div></div>))}</div>
    <div className="form" style={{ marginTop: 20 }}><h2>Selamat datang</h2>
      <p>Modul inventaris, persuratan, dan keuangan akan muncul di menu samping seiring pengembangan.</p></div>
  </Shell>)
}
