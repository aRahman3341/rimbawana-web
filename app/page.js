import Link from 'next/link'
export default function Beranda() {
  return (<>
    <section className="hero">
      <img src="/logo.jpeg" alt="Logo Rimbawana" />
      <h1>UKM Rimbawana</h1>
      <p>Universitas Pendidikan Indonesia - Kampus di Cibiru</p>
      <p style={{ marginTop: 20 }}><Link className="btn kuning" href="/login">Masuk Anggota</Link></p>
    </section>
    <main>
      <h2>Tentang Kami</h2>
      <p>Rimbawana adalah organisasi yang berorientasi pada pendidikan dan lingkungan, dengan divisi Pendidikan Lingkungan Hidup, Panjat Tebing, dan Hutan Gunung.</p>
      <p>Sekretariat: Gd. PKM, Jl. Raya Cibiru Km. 15 Bandung 40393 - rimbawana04@upi.edu</p>
    </main></>)
}
