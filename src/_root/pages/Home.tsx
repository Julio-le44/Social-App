import Loader from '@/components/shared/Loader';
import PostCard from '@/components/shared/PostCard';
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';

const Home = () => {
  const {data: post, isPending: isPostLoading, isError : isErrorPost} = useGetRecentPosts()

  return (
    <div className='flex flex-1'>
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !post? (
            <Loader />
            ):( 
              <ul className='flex flex-col flex-1 gap-9 w-full'>
                {post?.documents.map((post:Models.Document, i: number) => (
                <li key={i}><PostCard key={post.imageId} post={post}/></li>) 
                )}
              </ul>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Home
