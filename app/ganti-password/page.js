'use client'
import { useFormState } from 'react-dom'
import { gantiPassword } from './actions'
export default function Ganti() {
  const [s, aksi] = useFormState(gantiPassword, null)
  return (<main><form className="kartu" action={aksi}>
    <h1>Ganti Password</h1><p>Buat password baru sebelum melanjutkan.</p>
    <label>Password baru</label><input name="baru" type="password" autoComplete="new-password" required />
    <label>Ulangi password</label><input name="ulang" type="password" autoComplete="new-password" required />
    <p className="err">{s?.error}</p><button>Simpan</button>
  </form></main>)
}
