import Landing from '@/modules/landing'
import PublicLayout from '@/components/layouts/public-layout'

export default function Home() {
  return (
    <PublicLayout showNav>
      <Landing />
    </PublicLayout>
  )
}
