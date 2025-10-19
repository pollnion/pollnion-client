import SearchPage from '@/modules/search'

export async function generateMetadata({params}: {params: {username: string}}) {
  const {username} = params
  return {
    title: `Search`,
    description: `See what ${username} is polling about on Pollnion.`,
  }
}

export default function Page() {
  return <SearchPage />
}
