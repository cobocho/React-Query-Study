import { useEffect, useState } from 'react';
import { PostDetail } from './PostDetail';
import { Post } from './types/post';
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

const maxPostPage = 10;

async function fetchPosts(page: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < maxPostPage) {
      queryClient.prefetchQuery(['posts', currentPage + 1], () => fetchPosts(currentPage + 1));
    }
  }, [currentPage, queryClient]);

  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery<Post[], Error>(
    ['posts', currentPage],
    () => fetchPosts(currentPage),
    { staleTime: 2000, keepPreviousData: true }
  );

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return <h3>Error to fetch error: {`${error.toString()}`}</h3>;
  }

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage === maxPostPage}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
