import { searchState } from "@/atom";
import Loader from "@/components/Loader";
import Loading from "@/components/Loading";
import SearchFilter from "@/components/SearchFilter";
import StoreList from "@/components/StoreList";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { StoreType } from "@/interface";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useRecoilValue } from "recoil";

export default function StoreListPage() {
  const router = useRouter();
  const listRef = useRef<HTMLDivElement | null>(null);

  const pageRef = useIntersectionObserver(listRef, {});

  // 페이지의 마지막에 도달했는가 
  const isPageEnd = !!pageRef?.isIntersecting;

  const searchValue = useRecoilValue(searchState);

  const searchParams = {
    q: searchValue?.q,
    district: searchValue?.district,
  };

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios("/api/stores?page=" + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
        ...searchParams,
      },
    });

    return data;
  };

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery(["stores", searchParams], fetchStores, {
    getNextPageParam: (lastPage: any) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.error("fetchNext Error", res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [isPageEnd, fetchNextPage]);

  if (isError)
    return (
      <div className="w-full h-screen mx-auto pt-[30%] text-red-500 text-center font-semibold">
        Error...
      </div>
    );

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <SearchFilter />
      <ul role="list" className="divide-y divide-gray-200">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((store: StoreType, index: number) => (
                <StoreList key={index} index={index} store={store}/>
              ))}
            </React.Fragment>
          ))
        )}
      </ul>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={listRef} />
    </div>
  );
}
