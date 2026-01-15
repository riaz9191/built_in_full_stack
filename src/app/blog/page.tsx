'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'
import { Search, Calendar, Clock, BookOpen, ArrowRight, Edit2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string | null
  category: string | null
  tags: string | null
  published: boolean
  featured: boolean
  readTime: number | null
  createdAt: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [searchQuery, selectedCategory, posts])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog/posts')
      const data = await response.json()
      setPosts(data)
      setFilteredPosts(data)

      const uniqueCategories = Array.from(new Set(data.map((p: BlogPost) => p.category).filter(Boolean)))
      setCategories(uniqueCategories)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    setFilteredPosts(filtered)
  }

  const featuredPosts = filteredPosts.filter(post => post.featured && post.published)
  const regularPosts = filteredPosts.filter(post => !post.featured && post.published)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                My Blog
              </h1>
            </motion.div>
            <Link href="/blog/new">
              <Button className="gap-2">
                <Edit2 className="h-4 w-4" />
                New Post
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Welcome to My Blog
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Exploring ideas, sharing research, and documenting the journey of learning and discovery
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-sm text-gray-500">Filter:</span>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-48 w-full rounded-lg" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No posts found</h3>
            <p className="text-gray-500">Try adjusting your search or create a new post</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-2xl">⭐</span> Featured Posts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full border-2 border-primary/20">
                          {post.coverImage && (
                            <div className="relative h-48 w-full">
                              <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <Badge className="absolute top-4 right-4 bg-primary">
                                Featured
                              </Badge>
                            </div>
                          )}
                          <CardHeader>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                              <Calendar className="h-4 w-4" />
                              {new Date(post.createdAt).toLocaleDateString()}
                              {post.readTime && (
                                <>
                                  <span>•</span>
                                  <Clock className="h-4 w-4" />
                                  {post.readTime} min read
                                </>
                              )}
                            </div>
                            <h4 className="text-xl font-bold line-clamp-2">{post.title}</h4>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt || 'No excerpt available'}</p>
                            {post.tags && (
                              <div className="flex flex-wrap gap-2">
                                {post.tags.split(',').slice(0, 3).map((tag, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {tag.trim()}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </CardContent>
                          <CardFooter>
                            <Button variant="ghost" className="ml-auto gap-2 group">
                              Read More
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </CardFooter>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* All Posts */}
            {regularPosts.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold mb-6">All Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                          {post.coverImage && (
                            <div className="relative h-48 w-full">
                              <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <CardHeader>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                              <Calendar className="h-4 w-4" />
                              {new Date(post.createdAt).toLocaleDateString()}
                              {post.readTime && (
                                <>
                                  <span>•</span>
                                  <Clock className="h-4 w-4" />
                                  {post.readTime} min read
                                </>
                              )}
                            </div>
                            {post.category && (
                              <Badge variant="secondary" className="w-fit mb-2">
                                {post.category}
                              </Badge>
                            )}
                            <h4 className="text-lg font-bold line-clamp-2">{post.title}</h4>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 line-clamp-3 mb-4 text-sm">{post.excerpt || 'No excerpt available'}</p>
                            {post.tags && (
                              <div className="flex flex-wrap gap-2">
                                {post.tags.split(',').slice(0, 3).map((tag, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {tag.trim()}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </CardContent>
                          <CardFooter>
                            <Button variant="ghost" className="ml-auto gap-2 group">
                              Read More
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </CardFooter>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="flex items-center justify-center gap-2">
              <BookOpen className="h-5 w-5" />
              © {new Date().getFullYear()} My Personal Blog. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
