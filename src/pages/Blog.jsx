import { CreatePost } from "../components/CreatePost";
import { PostFilter } from "../components/PostFilter";
import { PostSorting } from "../components/PostSorting";
import { PostList } from "../components/PostList";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { getPosts } from "../api/posts";
import { Header } from "../components/Header";

export function Blog() {
  const [author, setAuthor] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("descending");
  const postsQuery = useQuery({
    queryKey: ["posts", { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  });
  const posts = postsQuery.data ?? [];

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <>
      <div className="min-h-screen p-6 bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <div className="flex justify-end mb-6 gap-x-5">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="rounded-full p-3 bg-white shadow-md border border-slate-200 transition-all duration-300 hover:shadow-lg dark:bg-slate-800 dark:border-slate-700 cursor-pointer"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
          <div>
            <Header />
          </div>
        </div>

        <CreatePost />
        <br />
        <br />
        <span className="w-24 text-base font-semibold text-slate-700 dark:text-slate-300 capitalize">
          Filter by:
        </span>
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
        {/* <hr /> */}
        <PostList posts={posts} />
      </div>
    </>
  );
}
