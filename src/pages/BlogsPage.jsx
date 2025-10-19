import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

// Minimal frontmatter parser compatible with the requested spec
function parseMarkdown(content) {
  // Support both LF and CRLF line endings
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
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

// Helpers
function estimateReadTime(text, wpm = 200) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wpm));
  return { words, text: `${minutes} min read` };
}

function deriveExcerpt(md, maxWords = 40) {
  if (!md) return "";
  // Strip stray frontmatter-like key: value lines if the file missed --- delimiters
  const lines = md.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; break; }
    if (/^[A-Za-z0-9_-]+:\s/.test(line)) { i++; continue; }
    break;
  }
  const cleaned = lines.slice(i).join("\n");
  // take first non-heading, non-image, non-code paragraph
  const blocks = cleaned
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);
  const para = blocks.find((b) => !b.startsWith("#") && !b.startsWith("!") && !b.startsWith("```") );
  const text = (para || cleaned).replace(/[`*_>#-]/g, "").replace(/\n/g, " ");
  const words = text.split(/\s+/).filter(Boolean);
  return words.slice(0, maxWords).join(" ") + (words.length > maxWords ? "…" : "");
}

function formatDate(d) {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date)) return String(d);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function slugify(text = "") {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function childrenToText(children) {
  if (!children) return "";
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (children.props && children.props.children) return childrenToText(children.props.children);
  return "";
}

// Convert slug-like strings (my-post-title) to a human-readable Title Case
function humanizeSlug(str = "") {
  if (!str) return "";
  return String(str)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function isSlugLike(str = "") {
  if (!str) return false;
  const s = String(str).trim();
  return /[-_]/.test(s) && s.toLowerCase() === s;
}

// Blog loader using Vite's glob imports + optional curated control from data/blogs/index.js
async function loadAllBlogs() {
  // Path relative to this file: src/pages -> ../content/blogs/*.md
  const globContent = import.meta.glob("../content/blogs/*.md", {
    as: "raw",
    eager: false,
  });
  const globData = import.meta.glob("../data/blogs/*.md", {
    as: "raw",
    eager: false,
  });

  // Merge both locations if both exist
  const entries = [
    ...Object.entries(globContent || {}),
    ...Object.entries(globData || {}),
  ];
  const blogs = await Promise.all(
    entries.map(async ([path, loader]) => {
      try {
        const content = await loader();
        const { metadata, body } = parseMarkdown(content);
        const slug = metadata.slug || path.split("/").pop().replace(".md", "");

        // Normalize categories (accept category or categories)
        let categories = [];
        if (Array.isArray(metadata.categories)) categories = metadata.categories;
        else if (metadata.categories) categories = String(metadata.categories).split(",").map((s) => s.trim()).filter(Boolean);
        else if (metadata.category) categories = [String(metadata.category)];

        const primaryCategory = categories[0] || "General";

        // Normalize tags
        let tags = [];
        if (Array.isArray(metadata.tags)) tags = metadata.tags;
        else if (metadata.tags) tags = String(metadata.tags).split(",").map((s) => s.trim()).filter(Boolean);

        // Derive excerpt and read time if missing
        const excerpt = metadata.excerpt || deriveExcerpt(body);
        const rt = estimateReadTime(body);
        const readTime = metadata.readTime || rt.text;
        const wordCount = rt.words;

        const computedTitle = metadata.title || (isSlugLike(slug) ? humanizeSlug(slug) : slug);
        return {
          ...metadata,
          slug,
          title: computedTitle,
          content: body,
          categories,
          category: primaryCategory,
          tags,
          excerpt,
          readTime,
          wordCount,
        };
      } catch (e) {
        console.error("Failed to load blog:", path, e);
        return null;
      }
    })
  );

  const mdBlogs = blogs.filter(Boolean);

  // Optionally import curated posts and categories from index.js control file
  // Toggle via VITE_ENABLE_CURATED=true to include curated samples
  const enableCurated = (import.meta.env && import.meta.env.VITE_ENABLE_CURATED === 'true');
  let curated = [];
  let curatedCategories = [];
  if (enableCurated) {
    try {
      const mod = await import("../data/blogs/index.js");
      const list = mod.blogPosts || [];
      curatedCategories = mod.blogCategories || [];
      curated = list.map((p) => {
        const content = p.content || "";
        const rt = estimateReadTime(content);
        // Normalize tags and categories
        const categories = p.categories || (p.category ? [p.category] : []);
        const tags = Array.isArray(p.tags) ? p.tags : (p.tags ? String(p.tags).split(",").map((s) => s.trim()) : []);
        const baseSlug = p.slug || p.id;
        const computedTitle = p.title || (isSlugLike(baseSlug) ? humanizeSlug(baseSlug) : baseSlug);
        return {
          slug: baseSlug,
          title: computedTitle,
          author: typeof p.author === "string" ? p.author : (p.author?.name || "PentStark"),
          authorAvatar: typeof p.author === "object" ? (p.author?.avatar || undefined) : (p.authorAvatar || undefined),
          authorBio: typeof p.author === "object" ? (p.author?.bio || undefined) : (p.authorBio || undefined),
          image: p.coverImage || p.image,
          date: p.publishDate || p.date,
          featured: !!p.featured,
          categories,
          category: categories[0] || "General",
          tags,
          excerpt: p.excerpt || deriveExcerpt(content),
          readTime: p.readTime || rt.text,
          wordCount: rt.words,
          content,
        };
      });
    } catch (e) {
      // Optional control file missing; ignore
    }
  }

  // Merge curated and markdown posts by slug (curated wins)
  const bySlug = new Map();
  for (const b of mdBlogs) bySlug.set(b.slug, b);
  for (const c of curated) bySlug.set(c.slug, { ...(bySlug.get(c.slug) || {}), ...c });
  const merged = Array.from(bySlug.values());

  // Sort by date (newest first) when possible
  merged.sort((a, b) => (new Date(b?.date || 0) - new Date(a?.date || 0)));

  return { blogs: merged, curatedCategories };
}

async function loadBlogBySlug(slug) {
  const { blogs } = await loadAllBlogs();
  return blogs.find((b) => b.slug === slug);
}

function BlogCard({ blog }) {
  const fallback = "/offense.png";
  const imgSrc = blog.image || fallback;
  return (
    <Link
      to={`/blogs/${blog.slug}`}
      className="group h-full rounded-2xl border border-primary/20 bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl flex flex-col"
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
  <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center flex-wrap gap-2 text-[11px] text-muted-foreground mb-2">
          {(blog.categories || [blog.category]).filter(Boolean).slice(0, 2).map((cat) => (
            <span key={cat} className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              {cat}
            </span>
          ))}
          {blog.readTime && (
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
              {blog.readTime}
            </span>
          )}
          {blog.wordCount ? (
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
              {blog.wordCount.toLocaleString()} words
            </span>
          ) : null}
        </div>
        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary transition-colors line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{blog.excerpt}</p>
        <div className="flex-1" />
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{blog.author || "PentStark"}</span>
          <span>{formatDate(blog.date)}</span>
        </div>
        {Array.isArray(blog.tags) && blog.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5 max-h-[48px] overflow-hidden">
            {blog.tags.slice(0, 6).map((tag) => (
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
  const [sortBy, setSortBy] = useState("newest"); // newest | oldest | popular | readtime-asc | readtime-desc
  const [curatedCategories, setCuratedCategories] = useState([]);
  const enableCurated = (import.meta.env && import.meta.env.VITE_ENABLE_CURATED === 'true');
  const filterRowRef = useRef(null);
  const curatedRowRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { blogs: items, curatedCategories } = await loadAllBlogs();
      if (mounted) {
        setBlogs(items);
        setCuratedCategories(Array.isArray(curatedCategories) ? curatedCategories : []);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(
      blogs.flatMap((b) => (Array.isArray(b.categories) ? b.categories : [b.category])).filter(Boolean)
    );
    return ["all", ...Array.from(set)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return blogs.filter((b) => {
      if (
        filter !== "all" &&
        !((Array.isArray(b.categories) ? b.categories : [b.category]).some((c) => String(c).toLowerCase() === filter.toLowerCase()))
      )
        return false;
      if (!q) return true;
      const hay = `${b.title} ${b.excerpt} ${(b.tags || []).join(" ")} ${(b.categories || [b.category]).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [blogs, search, filter]);

  const sortedBlogs = useMemo(() => {
    const arr = [...filteredBlogs];
    const scorePopular = (b) => {
      // Simple popularity heuristic: featured > more tags > newer > longer
      const featured = b.featured ? 1 : 0;
      const tagCount = Array.isArray(b.tags) ? b.tags.length : 0;
      const date = new Date(b.date || 0).getTime() || 0;
      const lengthScore = (b.wordCount || 0) / 1000; // small weight
      return featured * 1000 + tagCount * 10 + date / 10_000_000 + lengthScore;
    };
    switch (sortBy) {
      case "oldest":
        return arr.sort((a, b) => (new Date(a.date || 0) - new Date(b.date || 0)));
      case "popular":
        return arr.sort((a, b) => scorePopular(b) - scorePopular(a));
      case "readtime-asc":
        return arr.sort((a, b) => (a.wordCount || 0) - (b.wordCount || 0));
      case "readtime-desc":
        return arr.sort((a, b) => (b.wordCount || 0) - (a.wordCount || 0));
      case "newest":
      default:
        return arr.sort((a, b) => (new Date(b.date || 0) - new Date(a.date || 0)));
    }
  }, [filteredBlogs, sortBy]);

  return (
    <section className="py-12 md:py-16 bg-transparent">
      <div className="max-w-[100rem] mx-auto px-3 sm:px-6 md:px-8 lg:px-12">
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
          {!loading && (
            <p className="text-xs text-white/50 mt-1">{filteredBlogs.length} of {blogs.length} posts</p>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles, tags..."
            className="w-full sm:w-1/2 px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end w-full">
            <div className="relative w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => filterRowRef.current && filterRowRef.current.scrollBy({ left: -280, behavior: 'smooth' })}
                  className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white hover:bg-white/10"
                  aria-label="Scroll categories left"
                >
                  ‹
                </button>
                <div ref={filterRowRef} className="flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap pr-1 max-w-full sm:max-w-[40rem]">
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
                <button
                  onClick={() => filterRowRef.current && filterRowRef.current.scrollBy({ left: 280, behavior: 'smooth' })}
                  className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white hover:bg-white/10"
                  aria-label="Scroll categories right"
                >
                  ›
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-white/60">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm text-white focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="popular">Popular</option>
                <option value="readtime-asc">Shorter read</option>
                <option value="readtime-desc">Longer read</option>
              </select>
            </div>
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
          <>
            {/* JSON-LD: Blog schema for listing page */}
            {(() => {
              const origin = typeof window !== "undefined" ? window.location.origin : "";
              const blogUrl = `${origin}/blogs`;
              const postsLd = blogs.slice(0, 10).map((b) => ({
                "@type": "BlogPosting",
                headline: b.title,
                url: `${origin}/blogs/${b.slug}`,
                datePublished: b.date || undefined,
                image: b.image || undefined,
                author: { "@type": "Organization", name: b.author || "PentStark" },
                keywords: Array.isArray(b.tags) ? b.tags.join(", ") : undefined,
              }));
              const jsonLd = {
                "@context": "https://schema.org",
                "@type": "Blog",
                name: "PentStark Blog",
                description: "Articles on AI security, network defense, and cloud hardening.",
                url: blogUrl,
                blogPost: postsLd,
                publisher: { "@type": "Organization", name: "PentStark" },
              };
              return (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
              );
            })()}
            {/* Optional curated categories showcase */}
            {enableCurated && curatedCategories.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => curatedRowRef.current && curatedRowRef.current.scrollBy({ left: -320, behavior: 'smooth' })}
                    className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white hover:bg-white/10"
                    aria-label="Scroll curated left"
                  >
                    ‹
                  </button>
                  <div ref={curatedRowRef} className="flex gap-3 overflow-x-auto no-scrollbar whitespace-nowrap pr-1">
                    {curatedCategories.slice(0, 12).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          const target = (c.title || c.id || "").toString();
                          // Try to pick an existing categories[] value that case-insensitively equals this
                          const match = categories.find((k) => k.toLowerCase() === target.toLowerCase());
                          setFilter(match || target);
                        }}
                        className={`inline-block min-w-[220px] group text-left rounded-xl border ${
                          filter === (c.title || c.id)
                            ? "border-primary/50"
                            : "border-white/10 hover:border-white/20"
                        } bg-gradient-to-r ${c.color || "from-white/5 to-white/0"} p-4 transition-colors`}
                      >
                        <div className="text-sm font-semibold text-white">{c.title}</div>
                        {c.description && (
                          <div className="text-[11px] text-white/60 mt-1">{c.description}</div>
                        )}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => curatedRowRef.current && curatedRowRef.current.scrollBy({ left: 320, behavior: 'smooth' })}
                    className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white hover:bg-white/10"
                    aria-label="Scroll curated right"
                  >
                    ›
                  </button>
                </div>
              </div>
            )}

            {/* Featured row (only when not searching or filtering) */}
            {search.trim() === "" && filter === "all" && (
              (() => {
                const featured = sortedBlogs.filter((b) => b.featured).slice(0, 3);
                if (featured.length === 0) return null;
                return (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white/90 font-semibold">Featured</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {featured.map((blog) => (
                        <BlogCard key={blog.slug} blog={blog} />
                      ))}
                    </div>
                  </div>
                );
              })()
            )}

            {/* Main grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {sortedBlogs
                .filter((b) => !(search.trim() === "" && filter === "all" && b.featured))
                .map((blog) => (
                  <BlogCard key={blog.slug} blog={blog} />
                ))}
            </div>
          </>
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
  const [progress, setProgress] = useState(0);
  const contentRef = useRef(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [toc, setToc] = useState([]);
  const headingIdCountsRef = useRef({});
  const [tocOpen, setTocOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const tocDesktopRef = useRef(null);
  const tocMobileRef = useRef(null);

  // Helper to generate unique, deterministic heading ids per render
  const getUniqueHeadingId = (text) => {
    const base = slugify(text || "");
    const map = headingIdCountsRef.current || {};
    if (!map[base]) {
      map[base] = 1;
      headingIdCountsRef.current = map;
      return base;
    }
    map[base] += 1;
    headingIdCountsRef.current = map;
    return `${base}-${map[base]}`;
  };

  // Compute dynamic scroll offset considering scroll-mt and fixed header
  const computeOffset = () => {
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    let offset = Math.round(6 * rem); // scroll-mt-24 ~= 6rem
    try {
      const fixedTop = Array.from(document.querySelectorAll('*')).find((node) => {
        const s = getComputedStyle(node);
        return s.position === 'fixed' && s.top === '0px' && (node.getBoundingClientRect?.().height || 0) > 40 && (node.getBoundingClientRect?.().width || 0) > 200;
      });
      if (fixedTop && fixedTop.getBoundingClientRect) {
        offset = Math.max(offset, Math.ceil(fixedTop.getBoundingClientRect().height + 8));
      }
    } catch {}
    return offset;
  };

  // Smooth scroll to a heading by id with sticky header offset
  const scrollToId = (id) => {
    if (!id) return false;
    const el = document.getElementById(id);
    if (!el) return false;
    const offset = computeOffset();
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
    // Retry after paint in case layout shifts
    requestAnimationFrame(() => {
      window.scrollTo({ top, behavior: "smooth" });
    });
    setTimeout(() => {
      window.scrollTo({ top, behavior: "smooth" });
    }, 120);
    // Immediately update active TOC highlight so feedback is instant
    try { setActiveId(id); } catch {}
    return true;
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { blogs: items } = await loadAllBlogs();
      const item = items.find((b) => b.slug === slug) || null;
      if (!mounted) return;
      setAllBlogs(items);
      setBlog(item);
      setLoading(false);

      // Compute prev/next based on date-sorted list (newest first)
      const idx = items.findIndex((b) => b.slug === slug);
      if (idx !== -1) {
        const newer = idx - 1 >= 0 ? items[idx - 1] : null;
        const older = idx + 1 < items.length ? items[idx + 1] : null;
        setNextPost(newer);
        setPrevPost(older);
      }

      // Related posts by shared categories/tags
      if (item) {
        const catSet = new Set((item.categories || [item.category]).filter(Boolean).map(String));
        const tagSet = new Set((item.tags || []).map(String));
        const scored = items
          .filter((b) => b.slug !== item.slug)
          .map((b) => {
            const bcats = new Set((b.categories || [b.category]).filter(Boolean).map(String));
            const btags = new Set((b.tags || []).map(String));
            let score = 0;
            bcats.forEach((c) => { if (catSet.has(c)) score += 2; });
            btags.forEach((t) => { if (tagSet.has(t)) score += 1; });
            score += (b.featured ? 1 : 0);
            score += (new Date(b.date || 0).getTime() || 0) / 10_000_000_000;
            return { b, score };
          })
          .sort((x, y) => y.score - x.score)
          .slice(0, 3)
          .map((x) => x.b);
        setRelatedPosts(scored);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [slug]);

  // Reading progress bar
  useEffect(() => {
    function onScroll() {
      const el = contentRef.current;
      if (!el) return setProgress(0);
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(window.scrollY - (el.offsetTop || 0), 0), total);
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, pct)));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [contentRef, blog]);

  // Build TOC from the rendered DOM to guarantee heading IDs match
  useEffect(() => {
    if (!blog?.content) { setToc([]); return; }
    const container = contentRef.current;
    if (!container) { setToc([]); return; }

    // Wait for ReactMarkdown to finish painting
    const raf = requestAnimationFrame(() => {
      const counts = {};
      let auto = 0;
      const items = [];
      const nodeList = container.querySelectorAll("h1, h2, h3, h4, h5, h6");
      nodeList.forEach((el) => {
        const level = Number(el.tagName.replace("H", "")) || 1;
        const text = (el.textContent || "").trim();
        let id = (el.getAttribute("id") || "").trim();
        if (!id) {
          let base = slugify(text || "");
          if (!base) { base = `section-${++auto}`; }
          counts[base] = (counts[base] || 0) + 1;
          id = counts[base] === 1 ? base : `${base}-${counts[base]}`;
          el.setAttribute("id", id);
        }
        items.push({ id, text, level });
      });
      setToc(items);
    });

    return () => cancelAnimationFrame(raf);
  }, [blog?.content]);

  // If URL has a hash, scroll to it after headings are ready
  useEffect(() => {
    if (!toc || toc.length === 0) return;
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash) return;
    const id = hash.replace(/^#/, "");
    const r1 = requestAnimationFrame(() => {
      scrollToId(id);
    });
    return () => cancelAnimationFrame(r1);
  }, [toc]);

  // Reset heading id counters when content changes so render + TOC stay in sync
  useEffect(() => {
    headingIdCountsRef.current = {};
  }, [blog?.content]);

  // TOC scroll spy: highlight active section while scrolling
  useEffect(() => {
    if (!toc || toc.length === 0) { setActiveId(null); return; }
    let ticking = false;
    const getOffset = () => computeOffset();
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        let current = toc[0]?.id || null;
        for (let i = 0; i < toc.length; i++) {
          const item = toc[i];
          const el = document.getElementById(item.id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top;
          if (top - getOffset() <= 0) {
            current = item.id;
          } else {
            break;
          }
        }
        setActiveId(current);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);

  // Keep active TOC item visible in the desktop TOC container
  useEffect(() => {
    if (!activeId) return;
    const el = tocDesktopRef.current?.querySelector(`a[data-id="${activeId}"]`);
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [activeId]);

  // Keep active TOC item visible in mobile TOC when open
  useEffect(() => {
    if (!activeId || !tocOpen) return;
    const el = tocMobileRef.current?.querySelector(`a[data-id="${activeId}"]`);
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [activeId, tocOpen]);

  // SEO: set document title, meta tags and canonical
  useEffect(() => {
    if (!blog) return;
    const siteName = "PentStark";
    const title = `${blog.title} | ${siteName} Blog`;
    const desc = blog.excerpt || `${blog.title} - ${siteName}`;
    const url = typeof window !== "undefined" ? window.location.href : `https://pentstark.com/blogs/${blog.slug}`;
    document.title = title;

    const ensureMeta = (name, attr, value) => {
      let el = document.querySelector(`meta[${name}="${attr}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(name, attr);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value || "");
    };
    ensureMeta("name", "description", desc);
    ensureMeta("property", "og:title", title);
    ensureMeta("property", "og:description", desc);
    ensureMeta("property", "og:type", "article");
    ensureMeta("property", "og:url", url);
    if (blog.image) ensureMeta("property", "og:image", blog.image);
    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:title", title);
    ensureMeta("name", "twitter:description", desc);
    if (blog.image) ensureMeta("name", "twitter:image", blog.image);

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", url);
  }, [blog]);

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
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-40">
        <div
          className="h-full bg-gradient-to-r from-primary/70 to-pink-500/70"
          style={{ width: `${progress}%` }}
        />
      </div>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <button
          onClick={() => navigate("/blogs")}
          className="text-sm text-muted-foreground hover:text-white mb-6"
        >
          ← Back to Blogs
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          <div>
            {/* Header */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-orbitron mb-2">
              {blog.title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
              {blog.authorAvatar && (
                <img src={blog.authorAvatar} alt={blog.author || "Author"} className="w-6 h-6 rounded-full border border-white/10" />
              )}
              <span>{blog.author || "PentStark"}</span>
              <span className="opacity-60">•</span>
              <span>{formatDate(blog.date)}</span>
              {blog.readTime && (
                <>
                  <span className="opacity-60">•</span>
                  <span>{blog.readTime}{blog.wordCount ? ` • ${blog.wordCount.toLocaleString()} words` : ""}</span>
                </>
              )}
            </div>
            {blog.authorBio && (
              <p className="text-xs text-white/60 mb-3">{blog.authorBio}</p>
            )}
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-5">
              {(blog.categories || [blog.category]).filter(Boolean).map((cat) => (
                <span key={cat} className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  {cat}
                </span>
              ))}
            </div>
            <hr className="border-white/10 mb-6" />

            {/* Mobile TOC (collapsible) */}
            {toc.length > 0 && (
              <div className="lg:hidden mb-6 sticky top-16 z-30">
                <button
                  onClick={() => setTocOpen((s) => !s)}
                  className="w-full flex items-center justify-between gap-2 text-sm px-3 py-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/10"
                  aria-expanded={tocOpen}
                  aria-controls="mobile-toc"
                >
                  <span className="text-white/90 font-medium">Table of contents</span>
                  <span className="text-white/70">{tocOpen ? "−" : "+"}</span>
                </button>
                {tocOpen && (
                  <div id="mobile-toc" className="mt-2 border border-white/10 rounded-lg p-3 bg-white/5 max-h-[calc(100vh-6rem)] overflow-auto" ref={tocMobileRef}>
                    <nav className="space-y-1">
                      {toc.map((item) => {
                        const pad = Math.max(0, Math.min(item.level - 1, 4)) * 8;
                        return (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            data-id={item.id}
                            className={`block text-xs rounded px-2 py-1.5 transition-colors ${activeId === item.id ? "bg-primary/10 text-primary border-l-2 border-primary" : "text-white/80 hover:text-white hover:bg-white/5"}`}
                            aria-current={activeId === item.id ? "true" : undefined}
                            style={{ paddingLeft: pad + 8 }}
                            onClick={(e) => {
                              e.preventDefault();
                              const ok = scrollToId(item.id);
                              // Ensure immediate highlight on click
                              setActiveId(item.id);
                              // Update hash in history (so back button works)
                              if (history.pushState) {
                                history.pushState(null, "", `#${item.id}`);
                              } else if (!ok) {
                                // Fallback to default hash navigation
                                window.location.hash = `#${item.id}`;
                              }
                              setTocOpen(false);
                            }}
                          >
                            {item.text}
                          </a>
                        );
                      })}
                    </nav>
                  </div>
                )}
              </div>
            )}

            {/* Share buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {(() => {
                const url = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
                const text = encodeURIComponent(blog.title);
                return (
                  <>
                    <button
                      onClick={() => window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank")}
                      className="text-xs px-3 py-1 rounded-md border border-white/10 text-white hover:bg-white/10"
                    >
                      Share on X/Twitter
                    </button>
                    <button
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank")}
                      className="text-xs px-3 py-1 rounded-md border border-white/10 text-white hover:bg-white/10"
                    >
                      Share on LinkedIn
                    </button>
                    <button
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")}
                      className="text-xs px-3 py-1 rounded-md border border-white/10 text-white hover:bg-white/10"
                    >
                      Share on Facebook
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(window.location.href);
                          alert("Link copied to clipboard");
                        } catch {}
                      }}
                      className="text-xs px-3 py-1 rounded-md border border-white/10 text-white hover:bg-white/10"
                    >
                      Copy Link
                    </button>
                  </>
                );
              })()}
            </div>

            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full max-h-[60vh] object-cover rounded-xl border border-white/10 mb-8"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallback;
                }}
              />
            )}

            <div className="max-w-3xl mx-auto overflow-x-hidden" ref={contentRef}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ node, children, ...props }) => {
                    const text = childrenToText(children);
                    const id = getUniqueHeadingId(text);
                    return <h1 id={id} className="scroll-mt-24 text-3xl md:text-4xl font-bold text-white mt-8 mb-4" {...props}>{children}</h1>;
                  },
                  h2: ({ node, children, ...props }) => {
                    const text = childrenToText(children);
                    const id = getUniqueHeadingId(text);
                    return <h2 id={id} className="scroll-mt-24 text-2xl md:text-3xl font-semibold text-white mt-8 mb-3" {...props}>{children}</h2>;
                  },
                  h3: ({ node, children, ...props }) => {
                    const text = childrenToText(children);
                    const id = getUniqueHeadingId(text);
                    return <h3 id={id} className="scroll-mt-24 text-xl md:text-2xl font-semibold text-white mt-6 mb-3" {...props}>{children}</h3>;
                  },
                  h4: ({ node, children, ...props }) => {
                    const text = childrenToText(children);
                    const id = getUniqueHeadingId(text);
                    return <h4 id={id} className="scroll-mt-24 text-lg md:text-xl font-semibold text-white mt-6 mb-2" {...props}>{children}</h4>;
                  },
                  h5: ({ node, children, ...props }) => {
                    const text = childrenToText(children);
                    const id = getUniqueHeadingId(text);
                    return <h5 id={id} className="scroll-mt-24 text-base md:text-lg font-semibold text-white mt-5 mb-2" {...props}>{children}</h5>;
                  },
                  h6: ({ node, children, ...props }) => {
                    const text = childrenToText(children);
                    const id = getUniqueHeadingId(text);
                    return <h6 id={id} className="scroll-mt-24 text-sm md:text-base font-semibold text-white mt-4 mb-2 uppercase tracking-wide" {...props}>{children}</h6>;
                  },
                  p: ({ node, ...props }) => (
                    <p className="text-gray-300 leading-7 mb-4 break-words" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-white/70" {...props} />
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
                  a: ({ node, href, ...props }) => {
                    const isExternal = typeof href === 'string' && /^https?:\/\//.test(href);
                    return (
                      <a
                        href={href}
                        className="text-primary hover:underline break-words"
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer nofollow" : undefined}
                        {...props}
                      />
                    );
                  },
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-primary/40 pl-4 italic text-gray-300 my-4" {...props} />
                  ),
                  img: ({ node, alt, ...props }) => (
                    <img alt={alt || ''} className="rounded-lg border border-white/10 my-4 max-w-full max-h-[60vh] w-full object-contain mx-auto" {...props} />
                  ),
                  hr: () => <hr className="my-6 border-white/10" />,
                  table: ({ node, ...props }) => (
                    <div className="my-6 overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse" {...props} />
                    </div>
                  ),
                  th: ({ node, ...props }) => (
                    <th className="border-b border-white/10 px-3 py-2 text-white bg-white/5" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="border-b border-white/5 px-3 py-2 text-gray-300 align-top" {...props} />
                  ),
                }}
              >
                {blog.content}
              </ReactMarkdown>
            </div>

        
          </div>

          {/* TOC sidebar */}
          <aside className="hidden lg:block">
            {toc.length > 0 && (
              <div className="sticky top-24 w-full border border-white/10 rounded-xl p-4 bg-white/5 backdrop-blur-sm max-h-[calc(100vh-8rem)] overflow-auto" ref={tocDesktopRef}>
                <div className="text-xs font-semibold text-white/80 mb-2">Table of contents</div>
                <nav className="space-y-0.5">
                  {toc.map((item) => {
                    const pad = Math.max(0, Math.min(item.level - 1, 4)) * 8; // 0..32px
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        data-id={item.id}
                        className={`block text-xs rounded px-2 py-1.5 transition-colors ${activeId === item.id ? "bg-primary/10 text-primary border-l-2 border-primary font-semibold" : "text-white/70 hover:text-white hover:bg-white/5"}`}
                        aria-current={activeId === item.id ? "true" : undefined}
                        style={{ paddingLeft: pad + 8 }}
                        onClick={(e) => {
                          e.preventDefault();
                          const ok = scrollToId(item.id);
                          // Ensure immediate highlight on click
                          setActiveId(item.id);
                          if (history.pushState) {
                            history.pushState(null, "", `#${item.id}`);
                          } else if (!ok) {
                            // Fallback to default hash navigation
                            window.location.hash = `#${item.id}`;
                          }
                        }}
                      >
                        {item.text}
                      </a>
                    );
                  })}
                </nav>
              </div>
            )}
          </aside>
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

        {/* Prev / Next navigation */}
        {(prevPost || nextPost) && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {prevPost && (
              <Link to={`/blogs/${prevPost.slug}`} className="group p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
                <div className="text-xs text-white/60 mb-1">Previous</div>
                <div className="text-white group-hover:text-primary font-medium">{prevPost.title}</div>
                <div className="text-xs text-white/50 mt-1">{formatDate(prevPost.date)} • {prevPost.readTime}</div>
              </Link>
            )}
            {nextPost && (
              <Link to={`/blogs/${nextPost.slug}`} className="group p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition md:text-right">
                <div className="text-xs text-white/60 mb-1">Next</div>
                <div className="text-white group-hover:text-primary font-medium">{nextPost.title}</div>
                <div className="text-xs text-white/50 mt-1">{formatDate(nextPost.date)} • {nextPost.readTime}</div>
              </Link>
            )}
          </div>
        )}

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-white/90 font-semibold mb-3">Related posts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} to={`/blogs/${rp.slug}`} className="group p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
                  <div className="text-white group-hover:text-primary font-medium line-clamp-2">{rp.title}</div>
                  <div className="text-xs text-white/50 mt-1">{formatDate(rp.date)} • {rp.readTime}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {/* JSON-LD structured data */}
        {(() => {
          const minutes = Math.max(1, Math.ceil((blog.wordCount || 0) / 200));
          const jsonLd = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.excerpt || undefined,
            author: { "@type": "Organization", name: blog.author || "PentStark" },
            datePublished: blog.date || undefined,
            dateModified: blog.date || undefined,
            image: blog.image || undefined,
            mainEntityOfPage: typeof window !== "undefined" ? window.location.href : undefined,
            keywords: Array.isArray(blog.tags) ? blog.tags.join(", ") : undefined,
            wordCount: blog.wordCount || undefined,
            timeRequired: `PT${minutes}M`,
          };
          return (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          );
        })()}
      </div>
    </article>
  );
}

// Default export = Listing page
export default BlogsIndex;
