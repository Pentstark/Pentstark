import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

// Minimal frontmatter parser compatible with the requested spec
function parseMarkdown(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  if (!match) return { metadata: {}, body: content.trim() };
  const [, fm, body] = match;
  const metadata = {};

  fm.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let rawValue = line.slice(idx + 1).trim();

    // Remove surrounding quotes if present
    if ((rawValue.startsWith('"') && rawValue.endsWith('"')) || (rawValue.startsWith("'") && rawValue.endsWith("'"))) {
      rawValue = rawValue.slice(1, -1);
    }

    // Parse arrays (JSON-like)
    if (rawValue.startsWith("[")) {
      try {
        metadata[key] = JSON.parse(rawValue);
        return;
      } catch {}
    }
    // Parse booleans
    if (rawValue === "true" || rawValue === "false") {
      metadata[key] = rawValue === "true";
      return;
    }
    // Parse numbers (date stays string)
    if (!isNaN(Number(rawValue)) && key !== "date") {
      metadata[key] = Number(rawValue);
      return;
    }
    metadata[key] = rawValue;
  });

  return { metadata, body: body.trim() };
}

// Blog loader using Vite's glob imports
async function loadAllBlogs() {
  // Path relative to this file: src/pages -> ../content/blogs/*.md
  const blogModules = import.meta.glob("../content/blogs/*.md", {
    as: "raw",
    eager: false,
  });

  const entries = Object.entries(blogModules);
  const blogs = await Promise.all(
    entries.map(async ([path, loader]) => {
      try {
        const content = await loader();
        const { metadata, body } = parseMarkdown(content);
        const slug = metadata.slug || path.split("/").pop().replace(".md", "");
        return { ...metadata, content: body, slug };
      } catch (e) {
        console.error("Failed to load blog:", path, e);
        return null;
      }
    })
  );

  const filtered = blogs.filter(Boolean);
  // Sort by date (newest first) when possible
  return filtered.sort((a, b) => (new Date(b?.date || 0) - new Date(a?.date || 0)));
}

async function loadBlogBySlug(slug) {
  const blogs = await loadAllBlogs();
  return blogs.find((b) => b.slug === slug);
}

function BlogCard({ blog }) {
  const fallback = "/offense.png";
  const imgSrc = blog.image || fallback;
  return (
    <Link
      to={`/blogs/${blog.slug}`}
      className="group block rounded-2xl border border-primary/20 bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl"
    >
      <div className="relative">
        <img
          src={imgSrc}
          alt={blog.title}
          loading="lazy"
          className="w-full h-56 object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallback;
          }}
        />
        {blog.featured && (
          <span className="absolute top-3 right-3 bg-pink-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
            {blog.category || "General"}
          </span>
          <span>{blog.readTime || ""}</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
          {blog.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{blog.excerpt}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>{blog.author || "PentStark"}</span>
          <span>{blog.date || ""}</span>
        </div>
        {Array.isArray(blog.tags) && blog.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

export function BlogsIndex() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let mounted = true;
    (async () => {
      const items = await loadAllBlogs();
      if (mounted) {
        setBlogs(items);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(blogs.map((b) => b.category).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return blogs.filter((b) => {
      if (filter !== "all" && (b.category || "").toLowerCase() !== filter.toLowerCase()) return false;
      if (!q) return true;
      const hay = `${b.title} ${b.excerpt} ${(b.tags || []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [blogs, search, filter]);

  return (
    <section className="py-12 md:py-16 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center mb-8">
          <span className="block text-xs font-bold text-white/70 tracking-widest mb-1">
            INSIGHTS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-orbitron">
            Cybersecurity Blog
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Articles on AI security, network defense, and cloud hardening.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles, tags..."
            className="w-full sm:w-1/2 px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 rounded-full border text-xs transition-colors ${
                  filter === cat
                    ? "bg-primary/20 border-primary/40 text-white"
                    : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                }`}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center text-muted-foreground py-16">Loading...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">
            No posts yet. Add markdown files to src/content/blogs.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const item = await loadBlogBySlug(slug);
      if (mounted) {
        setBlog(item || null);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) return <div className="text-center text-muted-foreground py-16">Loading...</div>;
  if (!blog) return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center text-muted-foreground">Blog not found.</div>
      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/blogs")}
          className="px-4 py-2 rounded-md border border-white/10 text-white hover:bg-white/10"
        >
          Back to Blogs
        </button>
      </div>
    </div>
  );

  const fallback = "/offense.png";

  return (
    <article className="py-12 md:py-16 bg-transparent">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        <button
          onClick={() => navigate("/blogs")}
          className="text-sm text-muted-foreground hover:text-white mb-6"
        >
          ← Back to Blogs
        </button>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-orbitron mb-3">
          {blog.title}
        </h1>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-6">
          <span>{blog.author || "PentStark"}</span>
          {blog.date && <span className="opacity-60">•</span>}
          <span>{blog.date}</span>
          {blog.readTime && <>
            <span className="opacity-60">•</span>
            <span>{blog.readTime}</span>
          </>}
        </div>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full rounded-xl border border-white/10 mb-8"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallback;
            }}
          />
        )}

        <div className="max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-3xl md:text-4xl font-bold text-white mt-8 mb-4" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-xl md:text-2xl font-semibold text-white mt-6 mb-3" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-gray-300 leading-7 mb-4" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-6 space-y-2 mb-4" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-6 space-y-2 mb-4" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-gray-300 leading-7" {...props} />
              ),
              pre: ({ node, ...props }) => (
                <pre className="bg-black/40 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6" {...props} />
              ),
              code: ({ node, inline, className, children, ...props }) => (
                inline ? (
                  <code className="px-1.5 py-0.5 rounded bg-white/10 text-white/90" {...props}>
                    {children}
                  </code>
                ) : (
                  <code className={className} {...props}>{children}</code>
                )
              ),
              a: ({ node, ...props }) => (
                <a className="text-primary hover:underline" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-primary/40 pl-4 italic text-gray-300 my-4" {...props} />
              ),
              img: ({ node, ...props }) => (
                <img className="rounded-lg border border-white/10 my-4" {...props} />
              )
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>

        {Array.isArray(blog.tags) && blog.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

// Default export = Listing page
export default BlogsIndex;
