import { NextResponse } from "next/server";
import { z } from "zod";
import { getPosts } from "@/app/api/posts/postsApi";
import type { postTypes } from "@/zodSchemas/posts.schema";

const QuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(10),
  cursor: z.string().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parse = QuerySchema.safeParse({
    limit: searchParams.get("limit") ?? undefined,
    cursor: searchParams.get("cursor") ?? undefined,
  });
  if (!parse.success) {
    return NextResponse.json(
      { error: "Invalid query", details: parse.error.flatten() },
      { status: 400 }
    );
  }

  const { limit, cursor } = parse.data;

  const allPosts: postTypes[] = await getPosts();

  const start = cursor ? Math.max(0, Number(cursor)) : 0;
  const end = Math.min(allPosts.length, start + limit);
  const items = allPosts.slice(start, end);

  const nextCursor = end < allPosts.length ? String(end) : null;

  return NextResponse.json(
    {
      items,
      nextCursor,
      hasMore: nextCursor !== null,
      total: allPosts.length,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
