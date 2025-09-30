"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Table } from "@/app/components/Table";
import { SkeletonTable } from "@/app/components/SkeletonTable";
import { usePostsPage } from "@/app/features/usePostsPage";

const LIMIT = 10;

export default function PostsPageCSR() {
  const { posts, cursor, loading, error, fetchPage } = usePostsPage(LIMIT);
  const [initialLoading, setInitialLoading] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const hasMore = cursor !== null;

  useEffect(() => {
    fetchPage(null).finally(() => setInitialLoading(false));
  }, [fetchPage]);

  const loadMore = useMemo(
    () => () => {
      if (!loading && hasMore) fetchPage(cursor);
    },
    [cursor, fetchPage, hasMore, loading]
  );

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "300px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, loadMore]);

  return (
    <main
      className="min-h-screen flex flex-col items-center py-12 px-4"
      style={{ background: "var(--bg-gradient)" }}
    >
      <h1
        className="text-4xl font-extrabold mb-10 drop-shadow-lg text-center"
        style={{ color: "var(--text-main)" }}
      >
        Posts - Client-Side Rendering, Lazy loading
      </h1>

      {error && (
        <div className="w-full max-w-screen-2xl mb-6 px-4 py-3 rounded-xl border border-red-300/40 bg-red-500/10 text-red-800">
          {error}
        </div>
      )}

      {initialLoading ? (
        <SkeletonTable rows={LIMIT} />
      ) : (
        <>
          <Table posts={posts} />
          <div ref={sentinelRef} className="h-12" aria-hidden />
        </>
      )}
    </main>
  );
}
