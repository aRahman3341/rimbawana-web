import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { keluar } from '../login/actions'
import FormTambah from './FormTambah'
import { STATUS, PERAN } from '@/lib/akun'
export const dynamic = 'force-dynamic'
export default async function Anggota() {
  const sb = createClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) redirect('/login')
  const [{ data: daftar }, { data: angkatan }, { data: admin }] = await Promise.all([
    sb.from('anggota').select('id,nama_adat,nama_lengkap,status,jabatan,peran,nta,no_hp,aktif,angkatan(kode)').order('nama_adat'),
    sb.from('angkatan').select('id,kode,nama').order('kode'),
    sb.rpc('is_admin_anggota')])
  return (<main>
    <div className="atas"><h1>Daftar Anggota</h1><form action={keluar}><button>Keluar</button></form></div>
    {admin && <FormTambah angkatan={angkatan || []} />}
    <div className="tabel"><table><thead><tr><th>Nama adat</th><th>Nama lengkap</th><th>Status</th><th>Jabatan</th><th>Angkatan</th><th>NTA</th><th>No HP</th></tr></thead>
      <tbody>{(daftar || []).map(a => (<tr key={a.id}>
        <td>{a.nama_adat}</td><td>{a.nama_lengkap}</td><td>{STATUS[a.status] || '-'}</td>
        <td>{a.jabatan}{a.peran !== 'anggota' ? ` (${PERAN[a.peran]})` : ''}</td><td>{a.angkatan?.kode || '-'}</td><td>{a.nta || '-'}</td><td>{a.no_hp || '-'}</td></tr>))}</tbody></table></div>
  </main>)
}
