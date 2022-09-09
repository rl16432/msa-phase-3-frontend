import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { user } = router.query

  return <p>Post: {user}</p>
}

export default Post