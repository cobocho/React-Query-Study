import InfiniteScroll from 'react-infinite-scroller';
import { Species } from './Species';
import { useInfiniteQuery } from '@tanstack/react-query';

const initialUrl = 'https://swapi.dev/api/species/';
const fetchUrl = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query

  const { data } = useInfiniteQuery(
    ['species'],
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  return (
    <>
      <InfiniteScroll></InfiniteScroll>
    </>
  );
}
