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
      title: 'Welcome to My New Blog!',
      slug: 'welcome-to-my-new-blog',
      excerpt: 'This is your first blog post. Feel free to edit it or delete it and create your own content.',
      content: `# Welcome to My New Blog! 🎉

This is your first blog post on your new professional blog platform.

## Features You'll Love

### Rich Text Editing
Write your posts using **Markdown** with a live preview. You can:
- Create headings and subheadings
- Format text as **bold** or *italic*
- Add lists like this one
- Insert code blocks with syntax highlighting

\`\`\`javascript
const greeting = "Hello, World!"
console.log(greeting)
\`\`\`

### Image Uploads
Upload images directly to your posts using ImgBB integration. Just click on the cover image area or add images inline in your content.

### Categories & Tags
Organize your content with:
- Predefined categories
- Custom tags for better discoverability

## Getting Started

1. **Edit this post** - Click the edit icon in the top right
2. **Create a new post** - Click "New Post" in the header
3. **Upload an image** - Try adding a cover image
4. **Publish** - Toggle the "Published" switch to make it visible

## Happy Blogging! 📝

This is just the beginning. Customize your blog, share your thoughts, and build your online presence.

*Note: Remember to add your ImgBB API key to the .env file to enable image uploads!*
`,
      category: 'Personal',
      tags: 'welcome, first-post, tutorial',
      published: true,
      featured: true,
      readTime: 3,
      authorId: user.id,
    },
  })

  console.log('✓ Sample post created:', post.title)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
