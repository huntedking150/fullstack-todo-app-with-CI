import { CreatePost } from "./components/CreatePost";
import { PostFilter } from "./components/PostFilter";
import { PostSorting } from "./components/PostSorting";
import { PostList } from "./components/PostList";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";
import { useState } from "react";

export function Blog() {
  const [author, setAuthor] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("descending");
  const postsQuery = useQuery({
    queryKey: ["posts", { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  });
  const posts = postsQuery.data ?? [];
  return (
    <div className="p-4">
      <CreatePost />
      <br />
      <br />
      Filter by:
      <PostFilter
        field="author"
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <PostSorting
        fields={["createdAt", "updatedAt"]}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  );
}
