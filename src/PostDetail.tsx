import { useMutation, useQuery } from '@tanstack/react-query';
import { Comment, Post } from './types/post';

async function fetchComments(postId: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  return response.json();
}

async function deletePost(postId: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: 'DELETE',
  });
  return response.json();
}

async function updatePost(postId: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: 'PATCH',
    body: JSON.stringify({ title: 'REACT QUERY FOREVER!!!!' }),
  });
  return response.json();
}

export interface Props {
  post: Post;
}

export function PostDetail({ post }: Props) {
  const { data, isError, isLoading, error } = useQuery<Comment[], Error>(
    ['comments', post.id],
    () => fetchComments(post.id)
  );

  const {
    mutate: deleteMutate,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
    isSuccess: deleteIsSuccess,
  } = useMutation(() => deletePost(post.id));

  const {
    mutate: updateMutate,
    isLoading: updateIsLoading,
    isError: updateIsError,
    isSuccess: updateIsSuccess,
  } = useMutation(() => updatePost(post.id));

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return <h3>Error to fetch error: {`${error.toString()}`}</h3>;
  }

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button
        onClick={() => {
          deleteMutate();
        }}
      >
        Delete
      </button>
      {deleteIsError && <p style={{ color: 'red' }}>Error deleting the post</p>}
      {deleteIsLoading && <p style={{ color: 'red' }}>Deleting...</p>}
      {deleteIsSuccess && <p style={{ color: 'green' }}>Post been deleted</p>}
      <button
        onClick={() => {
          updateMutate();
        }}
      >
        Update title
      </button>
      {updateIsError && <p style={{ color: 'red' }}>Error updating the post</p>}
      {updateIsLoading && <p style={{ color: 'red' }}>Updating...</p>}
      {updateIsSuccess && <p style={{ color: 'green' }}>Post been updated</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
