# Personal Blog Website

A professional personal blog website with a rich editor and photo upload functionality using ImgBB.

## Features

- 📝 **Rich Text Editor** - MDX Editor for creating beautiful blog posts with Markdown
- 🖼️ **Photo Upload** - Integrated with ImgBB for easy image hosting
- 🏷️ **Categories & Tags** - Organize your posts with categories and tags
- ⭐ **Featured Posts** - Highlight your best content
- 🔍 **Search** - Find posts quickly with built-in search
- 📱 **Responsive Design** - Looks great on all devices
- 🌓 **Clean UI** - Professional design with shadcn/ui components

## Setup Instructions

### 1. ImgBB API Key

To enable image uploads, you need to get an ImgBB API key:

1. Go to [ImgBB API](https://api.imgbb.com/)
2. Sign up or log in
3. Get your API key from the dashboard
4. Add it to your `.env` file:

```bash
IMGBB_API_KEY=your_actual_api_key_here
```

### 2. Restart the Server

After adding the API key, restart the development server:

```bash
# The server should auto-restart, but if not:
# Stop the current server (Ctrl+C)
# Then start it again:
bun run dev
```

## How to Use

### Creating a Post

1. Navigate to `/blog`
2. Click the "New Post" button
3. Fill in the post details:
   - **Title**: Your post title (required)
   - **Slug**: URL-friendly version (auto-generated from title)
   - **Excerpt**: Brief description
   - **Category**: Select from predefined categories
   - **Tags**: Add relevant tags (press Enter to add)
   - **Cover Image**: Click to upload an image
   - **Content**: Write your post using Markdown

4. Toggle switches for:
   - **Published**: Make the post visible to readers
   - **Featured**: Highlight the post on the homepage

5. Click "Create Post" to publish

### Editing a Post

1. Open any blog post
2. Click the edit icon (✏️) in the top right
3. Make your changes
4. Click "Save Changes"

### Deleting a Post

1. Open the post you want to delete
2. Click the trash icon (🗑️) in the top right
3. Confirm the deletion

## Markdown Support

The blog supports standard Markdown syntax:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- List item 1
- List item 2

1. Numbered item 1
2. Numbered item 2

[Link text](url)
![Image alt](image-url)

\`\`\`javascript
const code = "here";
\`\`\`

> Blockquote
```

## Categories

Predefined categories include:
- Technology
- Research
- Personal
- Tutorial
- Opinion
- Review
- Career

## API Routes

The blog exposes the following API routes:

- `GET /api/blog/posts` - Get all posts
- `POST /api/blog/posts` - Create a new post
- `GET /api/blog/posts/[slug]` - Get a post by slug
- `GET /api/blog/posts/by-id/[id]` - Get a post by ID
- `PATCH /api/blog/posts/[id]` - Update a post
- `DELETE /api/blog/posts/[id]` - Delete a post
- `POST /api/blog/upload-image` - Upload an image to ImgBB

## Database Schema

The blog uses Prisma with SQLite. The schema includes:

- **id**: Unique identifier
- **title**: Post title
- **slug**: URL-friendly identifier (unique)
- **content**: Post content (Markdown)
- **excerpt**: Brief description
- **coverImage**: Cover image URL
- **category**: Post category
- **tags**: Comma-separated tags
- **published**: Visibility status
- **featured**: Featured post status
- **readTime**: Estimated reading time
- **authorId**: User who created the post
- **createdAt**: Creation date
- **updatedAt**: Last update date

## Customization

### Adding New Categories

Edit `src/app/blog/new/page.tsx` and `src/app/blog/edit/[id]/page.tsx`:

```typescript
const CATEGORIES = [
  'Technology',
  'Research',
  // Add your categories here
]
```

### Styling

The blog uses Tailwind CSS with shadcn/ui components. You can customize:
- Colors in `tailwind.config.ts`
- Components in `src/components/ui/`
- Global styles in `src/app/globals.css`

## Troubleshooting

### Images not uploading
- Check that your ImgBB API key is correct in `.env`
- Ensure the image file size is under ImgBB's limit (32MB)
- Check the browser console for error messages

### Posts not appearing
- Make sure the "Published" toggle is enabled
- Check the database: the post must have `published: true`

### Editor not loading
- Clear your browser cache
- Ensure you have a stable internet connection

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Editor**: @mdxeditor/editor
- **Database**: Prisma ORM with SQLite
- **Image Hosting**: ImgBB
- **Markdown**: react-markdown with remark-gfm
- **Code Highlighting**: react-syntax-highlighter

## License

This is your personal blog. Feel free to customize it however you like!
