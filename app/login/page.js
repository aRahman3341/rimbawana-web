'use client'
import { useFormState } from 'react-dom'
import { masuk } from './actions'
import InputPassword from '@/components/InputPassword'

export default function Login() {
  const [s, aksi] = useFormState(masuk, null)
  return (
    <div className="split">
      <div className="kiri">
        <form className="kartu" action={aksi}>
          <h1>Masuk Anggota</h1>
          <label>Nama adat</label>
          <input name="nama_adat" autoComplete="username" required />
          <label>Password</label>
          <InputPassword name="password" autoComplete="current-password" />
          <p className="err">{s?.error}</p>
          <button>Masuk</button>
        </form>
      </div>
      <div className="kanan">
        <img src="/logo.jpeg" alt="Rimbawana" />
        <h2>UKM Rimbawana</h2>
        <p>UPI Kampus di Cibiru</p>
      </div>
    </div>
  )
}