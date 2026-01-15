const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findFirst()

  if (!user) {
    console.log('No user found')
    return
  }

  const post = await prisma.post.create({
    data: {
      title: 'Getting Started with Next.js 15',
      slug: 'getting-started-with-nextjs-15',
      excerpt: 'A comprehensive guide to building modern web applications with Next.js 15 and the App Router.',
      content: `# Getting Started with Next.js 15 🚀

Next.js 15 is the latest version of the popular React framework, packed with powerful features for building modern web applications.

## What's New in Next.js 15?

### Improved Performance
- Faster server components
- Enhanced caching strategies
- Better image optimization

### App Router
The App Router provides:
- **Nested layouts** - Share UI between multiple pages
- **Server Components** - Render on the server for better performance
- **Streaming** - Progressive rendering for better UX

## Key Features

### 1. File-Based Routing
Create routes by creating files in the \`app\` directory:

\`\`\`
app/
├── layout.tsx
├── page.tsx
└── blog/
    ├── page.tsx
    └── [slug]/
        └── page.tsx
\`\`\`

### 2. Server Components
By default, components in Next.js 15 are server components:

\`\`\`typescript
async function BlogPosts() {
  const posts = await db.post.findMany()
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
\`\`\`

### 3. API Routes
Create API endpoints easily:

\`\`\`typescript
// app/api/posts/route.ts
export async function GET() {
  const posts = await db.post.findMany()
  return Response.json(posts)
}
\`\`\`

## Best Practices

1. **Use Server Components** by default for better performance
2. **Opt-in to Client Components** with \`'use client'\` only when needed
3. **Leverage Caching** for data fetching
4. **Use TypeScript** for better type safety

## Conclusion

Next.js 15 makes it easier than ever to build fast, modern web applications. Start building today!

*Happy coding! 💻*
`,
      category: 'Technology',
      tags: 'nextjs, react, web-development, tutorial',
      published: true,
      featured: false,
      readTime: 5,
      authorId: user.id,
    },
  })

  console.log('✓ Tech post created:', post.title)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
