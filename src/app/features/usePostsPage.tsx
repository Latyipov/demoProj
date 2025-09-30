"use client";

import { useCallback, useRef, useState } from "react";
import type { postTypes } from "@/zodSchemas/posts.schema";

export function usePostsPage(limit: number) {
  const [posts, setPosts] = useState<postTypes[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pendingRef = useRef(false);

  const fetchPage = useCallback(
    async (next: string | null) => {
      if (pendingRef.current) return;
      pendingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const qs = new URLSearchParams({ limit: String(limit) });
        if (next) qs.set("cursor", next);

        const res = await fetch(`/api/posts/pageableApi?${qs}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: { items: postTypes[]; nextCursor: string | null } =
          await res.json();

        setPosts((prev) => {
          const map = new Map(prev.map((p) => [p.id, p]));
          for (const item of data.items) map.set(item.id, item);
          return Array.from(map.values());
        });

        setCursor(data.nextCursor);
      } catch (error: any) {
        setError(error?.message ?? "Failed to load");
      } finally {
        setLoading(false);
        pendingRef.current = false;
      }
    },
    [limit]
  );

  return { posts, cursor, loading, error, fetchPage, setPosts };
}
