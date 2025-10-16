import Landing from '@/modules/landing'
import PublicLayout from '@/components/base/layouts/public-layout'

export default function Home() {
  return (
    <PublicLayout showNav showFooter>
      <Landing />
    </PublicLayout>
  )
}
