import { postsSchema } from "@/zodSchemas/posts.schema";
const URL = "https://jsonplaceholder.typicode.com/posts";

export async function getPosts() {
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error("API response error");
  }
  const data = await response.json();
  return postsSchema.parse(data);
}

export async function createPost(data: {
  title: string;
  text: string;
  file: File | null;
}) {
  // formData - for file sending

  // const formData = new FormData();
  // formData.append("title", data.title);
  // formData.append("body", data.text);
  // if (data.file) {
  //   formData.append("file", data.file);
  // }

  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: data.title,
      body: data.text,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  return res.json();
}
