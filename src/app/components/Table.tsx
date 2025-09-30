import type { postTypes } from "@/zodSchemas/posts.schema";

export function Table({ posts }: { posts: postTypes[] }) {
  return (
    <div
      className="rounded-2xl shadow-lg w-11/12 mx-auto m-4"
      style={{
        background: "var(--card-bg)",
        color: "var(--text-secondary)",
      }}
    >
      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-[var(--card-bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--card-bg)]/75">
            <tr className="text-left" style={{ color: "var(--text-main)" }}>
              <th className="px-4 py-3 border-b border-black/10 whitespace-nowrap text-sm font-semibold">
                ID
              </th>
              <th className="px-4 py-3 border-b border-black/10 text-sm font-semibold">
                Title
              </th>
              <th className="px-4 py-3 border-b border-black/10 text-sm font-semibold">
                Body
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, i) => (
              <tr
                key={post.id}
                className={`transition-colors hover:bg-black/5 ${
                  i % 2 === 1 ? "bg-black/[0.025]" : ""
                }`}
              >
                <td className="px-4 py-3 border-b border-black/10 font-medium whitespace-nowrap align-top">
                  {post.id}
                </td>
                <td className="px-4 py-3 border-b border-black/10 align-top max-w-[45ch]">
                  <span
                    className="font-semibold"
                    style={{ color: "var(--text-main)" }}
                  >
                    {post.title}
                  </span>
                </td>
                <td className="px-4 py-3 border-b border-black/10 align-top">
                  <span className="block max-w-[80ch] truncate md:whitespace-normal md:line-clamp-3">
                    {post.body}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
