'use client'
import { useFormState } from 'react-dom'
import { masuk } from './actions'
export default function Login() {
  const [s, aksi] = useFormState(masuk, null)
  return (<main><form className="kartu" action={aksi}>
    <h1>Masuk Anggota</h1>
    <label>Nama adat</label><input name="nama_adat" autoComplete="username" required />
    <label>Password</label><input name="password" type="password" autoComplete="current-password" required />
    <p className="err">{s?.error}</p><button>Masuk</button>
  </form></main>)
}
