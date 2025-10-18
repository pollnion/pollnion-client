async function getUser(username: string) {
  const res = await fetch(`https://api.pollnion.com/users/${username}`)
  if (!res.ok) return null
  return res.json()
}

export async function generateMetadata({params}: {params: {username: string}}) {
  const user = await getUser(params.username)
  return {
    title: user ? `${user.displayName} | Pollnion` : `${params.username} | Pollnion`,
    description: user?.bio ?? `See what ${params.username} is polling about on Pollnion.`,
  }
}

const Page = async ({params}: {params: {username: string}}) => {
  const user = await getUser(params.username)

  if (!user) return <div>User not found 😢</div>

  return (
    <div>
      <h1>{user.displayName}</h1>
      <p>{user.bio}</p>
    </div>
  )
}

export default Page
