// Label tampilan. Ubah "AP" ke kepanjangan yang benar bila perlu.
export const STATUS = { AM: 'Anggota Muda (AM)', AP: 'AP' }
export const PERAN = { ketua_adat: 'Ketua Adat', sekretaris: 'Sekretaris', bendahara: 'Bendahara', perlengkapan: 'Perlengkapan', anggota: '-' }

// Email teknis untuk Supabase Auth, dibuat dari nama adat (tidak untuk dikirimi email)
export function emailTeknis(namaAdat) {
  const slug = namaAdat.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `${slug || 'anggota'}@${process.env.EMAIL_DOMAIN_TEKNIS || 'anggota.invalid'}`
}
