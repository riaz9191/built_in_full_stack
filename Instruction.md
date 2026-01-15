# 📚 Complete Setup & Usage Instructions

A modern, production-ready personal blog platform built with Next.js, TypeScript, Tailwind CSS, Prisma, and shadcn/ui components.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Database Configuration](#database-configuration)
4. [Environment Setup](#environment-setup)
5. [Running the Application](#running-the-application)
6. [Creating Blog Posts](#creating-blog-posts)
7. [Project Structure](#project-structure)
8. [Available Commands](#available-commands)
9. [Technology Stack](#technology-stack)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (package manager) - [Download](https://npm.sh/)
- **Git** (for version control)
- **A code editor** (VS Code recommended)

Check your installations:

```bash
node --version
npm --version
git --version
```

---

## Project Setup

### Step 1: Install Dependencies

Navigate to the project directory and install all dependencies:

```bash
cd /Users/riaz.a/Desktop/PEN/workspace-4dffb2be-cad8-4bc3-833a-2c26930699a9\ \(1\)

npm install
```

This will install all packages defined in `package.json`.

### Step 2: Verify Installation

Confirm that key packages are installed:

```bash
npm list @prisma/client next tailwindcss
```

---

## Database Configuration

### Step 1: Understand Your Database Setup

Your project uses **SQLite** with **Prisma ORM**:

- **Database Type**: SQLite (lightweight, file-based)
- **Location**: `db/custom.db` (in project root)
- **ORM**: Prisma v6.11.1
- **Schema**: [prisma/schema.prisma](prisma/schema.prisma)

### Step 2: Database Models

Your database includes two main tables:

#### User Model
```
id          - String (unique)
email       - String (unique)
name        - String (optional)
createdAt   - DateTime
updatedAt   - DateTime
posts       - Post[] (relationship)
```

#### Post Model
```
id          - String (unique)
title       - String
slug        - String (unique, URL-friendly)
content     - String (optional, Markdown)
excerpt     - String (optional, short description)
coverImage  - String (optional, image URL)
category    - String (optional)
tags        - String (optional, comma-separated)
published   - Boolean (default: false)
featured    - Boolean (default: false)
authorId    - String (links to User)
readTime    - Int (optional, minutes)
createdAt   - DateTime
updatedAt   - DateTime
```

### Step 3: Initialize the Database

Push the schema to create the database:

```bash
npm run db:push
```

This command will:
1. Create the `db/` directory if it doesn't exist
2. Generate the SQLite database file: `db/custom.db`
3. Create the `User` and `Post` tables

### Step 4: Seed the Database (Optional)

Create an initial admin user:

```bash
npm run db:generate
node seed.js
```

---

## Environment Setup

### Step 1: Create `.env` File

Create a `.env` file in the project root directory:

```bash
touch .env
```

### Step 2: Add Environment Variables

Open `.env` and add the following:

```env
# Database Configuration (SQLite)
DATABASE_URL="file:./db/custom.db"

# Image Upload (ImgBB API)
IMGBB_API_KEY=your_actual_api_key_here

# Application Environment
NODE_ENV=development
```

### Step 3: Get ImgBB API Key (For Image Uploads)

To enable image uploads in blog posts:

1. Visit [ImgBB API](https://api.imgbb.com/)
2. Sign up for a free account or log in
3. Go to your dashboard and copy your API key
4. Replace `your_actual_api_key_here` in `.env` with your actual key

Example:
```env
IMGBB_API_KEY=a1b2c3d4e5f6g7h8i9j0
```

### Step 4: Verify Environment Setup

Check that your `.env` file is properly configured:

```bash
cat .env
```

Should output:
```
DATABASE_URL=file:./db/custom.db
IMGBB_API_KEY=your_api_key
NODE_ENV=development
```

---

## Running the Application

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

Expected output:
```
  ▲ Next.js 15.3.5
  - Local:        http://localhost:8888
  - Environments: .env
```

Visit **http://localhost:8888** in your browser.

### Production Build

Build for production:

```bash
npm run build
```

This command will:
1. Optimize your application
2. Generate production-ready files in `.next/`
3. Create a standalone server bundle

### Production Server

Run the production server:

```bash
npm run start
```

---

## Creating Blog Posts

### Access the Blog

1. Open your browser to: **http://localhost:8888**
2. Navigate to **Blog** from the main menu
3. You'll see a list of posts (2 sample posts included)

### Create a New Post

#### Method 1: Via UI (Recommended)

1. Click the **"New Post"** button (top right)
2. Fill in the post details:

| Field | Required | Description |
|-------|----------|-------------|
| **Title** | ✅ | Post title (e.g., "My First Blog Post") |
| **Slug** | ❌ | URL-friendly version (auto-generated from title) |
| **Excerpt** | ❌ | Short description (appears in listings) |
| **Category** | ❌ | Choose: Technology, Research, Personal, etc. |
| **Tags** | ❌ | Keywords (press Enter after each tag) |
| **Cover Image** | ❌ | Upload image (requires ImgBB API key) |
| **Content** | ❌ | Write using Markdown in the rich editor |
| **Published** | ❌ | Toggle to make post visible |
| **Featured** | ❌ | Toggle to highlight on homepage |

3. Click **"Save"** to create the post

#### Method 2: Via API (Advanced)

Use the internal API endpoint:

```bash
curl -X POST http://localhost:8888/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Post",
    "slug": "my-post",
    "excerpt": "This is my post",
    "content": "## Content\nThis is the main content",
    "category": "Technology",
    "published": true
  }'
```

### Using Markdown in Content

The rich editor supports full Markdown syntax:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
~~Strikethrough~~

- Bullet point
- Another point

1. Numbered item
2. Another item

[Link text](https://example.com)

![Image alt](https://example.com/image.jpg)

> Blockquote text

\`\`\`javascript
// Code block
const greeting = "Hello, World!";
\`\`\`
```

### Search & Filter Posts

- **Search**: Use the search bar to find posts by title or content
- **Categories**: Filter posts by category
- **Featured**: View only featured posts
- **Sort**: Sort by date (newest first)

---

## Project Structure

```
project-root/
├── prisma/
│   └── schema.prisma           # Database schema definition
├── src/
│   ├── app/
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Global styles
│   │   ├── blog/               # Blog pages
│   │   └── api/                # API routes
│   ├── components/
│   │   └── ui/                 # shadcn/ui components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/
│   │   ├── db.ts              # Prisma client instance
│   │   ├── seed-db.ts         # Database seeding
│   │   └── utils.ts           # Utility functions
│
├── public/                      # Static assets (images, robots.txt)
├── db/
│   └── custom.db              # SQLite database file
│
├── .env                        # Environment variables
├── package.json               # Project dependencies
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS config
├── next.config.ts             # Next.js configuration
└── Instruction.md             # This file
```

---

## Available Commands

### Development & Build

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint to check code quality
npm run lint
```

### Database Operations

```bash
# Push schema changes to database (create tables)
npm run db:push

# Generate Prisma client (after schema changes)
npm run db:generate

# Create and run migrations (development)
npm run db:migrate

# Reset database completely (WARNING: deletes all data)
npm run db:reset
```

### Other Commands

```bash
# View project in browser
open http://localhost:8888

# Check Node version
node --version

# Check npm version
npm --version
```

---

## Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS
- **shadcn/ui** - Accessible, customizable components
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

### Backend & Data
- **Prisma 6** - TypeScript ORM
- **SQLite** - Database (file-based)
- **NextAuth.js** - Authentication (optional)
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Development Tools
- **npm** - Fast JavaScript runtime
- **ESLint** - Code quality
- **TypeScript** - Type checking

---

## Troubleshooting

### Issue: `DATABASE_URL` environment variable not found

**Solution:**
1. Verify `.env` file exists in project root
2. Check it contains: `DATABASE_URL="file:./db/custom.db"`
3. Restart the development server

```bash
# Verify .env exists
ls -la .env

# Restart dev server
npm run dev
```

### Issue: Database file not created

**Solution:**
Run the database push command:

```bash
npm run db:push
```

This will create `db/custom.db` automatically.

### Issue: Cannot find module 'prisma'

**Solution:**
Reinstall dependencies:

```bash
rm -rf node_modules .npm
npm install
npm run db:generate
```

### Issue: Port 8888 already in use

**Solution:**
Either kill the existing process or use a different port:

```bash
# Option 1: Kill process on port 8888 (macOS/Linux)
lsof -ti :8888 | xargs kill -9

# Option 2: Use different port
npm run dev -- -p 3000  # Uses port 3000 instead
```

### Issue: ImgBB API key not working

**Solution:**
1. Verify API key is correct in `.env`
2. Ensure there are no extra spaces: `IMGBB_API_KEY=key_without_spaces`
3. Check API key is active on [ImgBB Dashboard](https://api.imgbb.com/)
4. Restart development server after updating `.env`

### Issue: Posts not appearing

**Solution:**
1. Ensure post is marked as **published**
2. Check the post was saved (look for confirmation message)
3. Refresh the browser
4. Check database has data:

```bash
npm run db:migrate
```

### Issue: Cannot upload images

**Solution:**
1. Verify `IMGBB_API_KEY` is set in `.env`
2. Check ImgBB API key is valid
3. Ensure you're in a logged-in session
4. Check browser console for error messages (F12 → Console)

### Need More Help?

- Check [Next.js Documentation](https://nextjs.org/docs)
- Check [Prisma Documentation](https://www.prisma.io/docs)
- Check [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## Quick Start Summary

```bash
# 1. Install dependencies
npm install

# 2. Create .env file with DATABASE_URL
echo 'DATABASE_URL="file:./db/custom.db"' > .env
echo 'IMGBB_API_KEY=your_api_key' >> .env

# 3. Initialize database
npm run db:push

# 4. Start development server
npm run dev

# 5. Open browser
open http://localhost:8888
```

---

## Important Notes

⚠️ **Data Persistence**: Your database is stored locally in `db/custom.db`. If you delete this file, all posts will be lost.

💾 **Backup Your Database**: Before making major changes, backup the `db/` folder:

```bash
cp -r db db.backup
```

🔒 **Security**: Never commit `.env` file to Git. It contains sensitive API keys. Add to `.gitignore`:

```bash
echo ".env" >> .gitignore
echo "db/*.db" >> .gitignore
```

---

## Next Steps

1. ✅ Set up the project (completed)
2. ✅ Configure database (completed)
3. ✅ Get ImgBB API key
4. 📝 Create your first blog post
5. 🎨 Customize the design and colors
6. 🚀 Deploy to production (Vercel, Railway, etc.)

Happy blogging! 🎉

---

**Last Updated**: January 15, 2026  
**Version**: 1.0.0  
**Author**: Z.ai Code Scaffold
