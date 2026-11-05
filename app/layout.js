import './globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
const font = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })
export const metadata = { title: 'Rimbawana UPI Kampus Cibiru', description: 'UKM Rimbawana - UPI Kampus di Cibiru' }
export default function Root({ children }) { return (<html lang="id"><body className={font.className}>{children}</body></html>) }
