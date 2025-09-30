import { getPosts } from "@/app/api/posts/postsApi";
import { Pagination } from "@/app/components/Pagination";
import { Table } from "@/app/components/Table";
import type { postTypes } from "@/zodSchemas/posts.schema";

export const dynamic = "force-dynamic";
const PAGE_SIZE = 10;

type Search = { [key: string]: string | string[] | undefined };

export default async function PostsPageSSR({
  searchParams,
}: {
  searchParams?: Search;
}) {
  const pageParam = Array.isArray(searchParams?.page)
    ? searchParams?.page[0]
    : searchParams?.page;
  const pageNum = Math.max(1, Number(pageParam) || 1);

  const data: postTypes[] = await getPosts();

  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  const page = Math.min(totalPages, pageNum);

  const startCut = (page - 1) * PAGE_SIZE;
  const posts = data.slice(startCut, startCut + PAGE_SIZE);

  return (
    <main
      className="min-h-screen flex flex-col items-center py-12 px-4"
      style={{ background: "var(--bg-gradient)" }}
    >
      <h1
        className="text-4xl font-extrabold mb-10 drop-shadow-lg text-center"
        style={{ color: "var(--text-main)" }}
      >
        Posts — Server-Side Rendering, Pagination
      </h1>
      <Table posts={posts} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  );
}
