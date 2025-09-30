import { z } from "zod";

export const postSchema = z.object({
  userId: z.number().min(1),
  id: z.number().min(1),
  title: z.string(),
  body: z.string(),
});

export const postsSchema = z.array(postSchema);

export type postTypes = z.infer<typeof postSchema>;
