import PostsTable from '@/components/PostTable';
import BackButton from '@/components/backButton';
import PostsPagination from "@/components/postsPagination"

const PostsPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <PostsTable />
      <PostsPagination />
    </>
  )
};

export default PostsPage;