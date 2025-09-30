"use client";

import { useState } from "react";
import { AddPostModal } from "@/app/components/AddPostModal";
import { createPost } from "@/app/api/posts/postsApi";

type ResultProps =
  | {
      id: number;
      title: string;
      body: string;
      userId: number;
    }
  | { error?: string }
  | null;

export default function PostsPage() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<ResultProps>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: {
    title: string;
    text: string;
    file: File | null;
  }) => {
    try {
      setLoading(true);

      const response = await createPost(data);

      setResult(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResult({ error: error.message });
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center py-12 px-4 gap-6"
      style={{ background: "var(--bg-gradient)" }}
    >
      <h1
        className="text-3xl font-extrabold drop-shadow-lg text-center"
        style={{ color: "var(--text-main)" }}
      >
        Send POST
      </h1>

      <button
        onClick={() => setOpen(true)}
        className="rounded-2xl px-5 py-3 shadow hover:shadow-md transition"
        style={{ background: "var(--card-bg)", color: "var(--text-main)" }}
      >
        Open Modal
      </button>

      {loading && <p>⏳ Sending...</p>}

      {result && (
        <div
          className="rounded-xl shadow p-4 text-sm w-full max-w-md"
          style={{
            background: "var(--card-bg)",
            color: "var(--text-secondary)",
          }}
        >
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <AddPostModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
