import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, ArrowLeft, Twitter, Linkedin, Facebook, BookmarkPlus } from 'lucide-react';
import { pageVariants, sectionVariants, itemVariants } from '@/lib/animations';
import { getBlogPostBySlug } from '@/data/blogs';

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [markdownContent, setMarkdownContent] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (slug) {
      const blogPost = getBlogPostBySlug(slug);
      if (blogPost) {
        setPost(blogPost);
        loadMarkdownContent(slug);
      } else {
        navigate('/blogs');
      }
    }
  }, [slug, navigate]);

  const loadMarkdownContent = async (postSlug) => {
    const blogPost = getBlogPostBySlug(postSlug);
    if (blogPost && blogPost.content) {
      setMarkdownContent(blogPost.content);
    } else {
      setMarkdownContent(`# ${post?.title}\n\nContent for this blog post is being prepared. Please check back soon!`);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title || '';

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(url);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="overflow-x-hidden relative min-h-screen pt-0 bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117] text-foreground"
    >
      <div className="relative z-10">
        {/* Back Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/blogs')}
            className="text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Button>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-16">
          <motion.header
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            className="mb-12"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(post.publishDate + 'T00:00:00Z').toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={isBookmarked ? 'text-primary border-primary' : ''}
                  >
                    <BookmarkPlus className="w-4 h-4 mr-2" />
                    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleShare('twitter')}>
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare('linkedin')}>
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare('facebook')}>
                      <Facebook className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="border-border text-muted-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </motion.header>

          {/* Article Content */}
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            className="prose prose-lg prose-invert max-w-none"
          >
            <motion.div variants={itemVariants} className="border border-border/20 rounded-lg p-8" style={{ backgroundColor: 'rgba(22, 20, 32, 0.8)' }}>
              <div className="markdown-content text-muted-foreground leading-relaxed">
                {/* Simple markdown-like rendering for now */}
                {markdownContent.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold text-foreground mb-6 mt-8 first:mt-0">{line.substring(2)}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-bold text-foreground mb-4 mt-8">{line.substring(3)}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-semibold text-foreground mb-3 mt-6">{line.substring(4)}</h3>;
                  }
                  if (line.startsWith('```')) {
                    // Simple code block handling
                    return <pre key={index} className="bg-background border border-border p-4 rounded-lg mb-4 overflow-x-auto"><code className="text-green-400">{line}</code></pre>;
                  }
                  if (line.trim() === '') {
                    return <br key={index} />;
                  }
                  return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Author Bio */}
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            className="mt-16"
          >
            <motion.div variants={itemVariants}>
              <div className="border border-border/20 rounded-lg p-6" style={{ backgroundColor: 'rgba(22, 20, 32, 0.8)' }}>
                <div className="text-foreground mb-4">About the Author</div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {post.author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{post.author.name}</h3>
                    <p className="text-muted-foreground">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Related Posts */}
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            className="mt-16"
          >
            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-foreground mb-8">
              Related Articles
            </motion.h2>
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Placeholder for related posts */}
              <div className="border border-border/20 rounded-lg p-6" style={{ backgroundColor: 'rgba(22, 20, 32, 0.8)' }}>
                <div className="text-foreground text-lg mb-2">Related Post 1</div>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
              <div className="border border-border/20 rounded-lg p-6" style={{ backgroundColor: 'rgba(22, 20, 32, 0.8)' }}>
                <div className="text-foreground text-lg mb-2">Related Post 2</div>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </motion.div>
          </motion.div>
        </article>
      </div>
    </motion.div>
  );
};

export default BlogPostPage;
