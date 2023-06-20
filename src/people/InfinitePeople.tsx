import InfiniteScroll from 'react-infinite-scroller';
import { Person, PersonType } from './Person';
import { useInfiniteQuery } from '@tanstack/react-query';

const initialUrl = 'https://swapi.dev/api/people/';
const fetchUrl = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ['peoples'],
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  return (
    <>
      <InfiniteScroll
        loadMore={() => fetchNextPage()}
        hasMore={hasNextPage}
      >
        {data?.pages.map((pageData) => {
          return pageData.results.map((person: PersonType) => {
            return (
              <Person
                name={person.name}
                hair_color={person.hair_color}
                eye_color={person.eye_color}
              />
            );
          });
        })}
      </InfiniteScroll>
      {isFetching && <div className="loading">loading...</div>}
      {!hasNextPage && <div>Last Page</div>}
    </>
  );
}
