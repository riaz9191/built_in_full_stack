# 🔄 Migrating from SQLite to PostgreSQL

## Why Migrate?

SQLite is great for local development, but PostgreSQL is required for production deployments on platforms like Vercel, Railway, and most cloud services.

---

## Quick Migration (5 minutes)

### Step 1: Get PostgreSQL Database (Free)

Choose one:

**Supabase (Recommended):**
1. Sign up: [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from: Settings → Database → Connection String (URI mode)

**Railway:**
1. Sign up: [railway.app](https://railway.app)
2. New Project → Add PostgreSQL
3. Copy `DATABASE_URL` from Variables tab

**Vercel Postgres:**
```bash
npm i -g vercel
vercel login
vercel postgres create
```

**Neon:**
1. Sign up: [neon.tech](https://neon.tech)
2. Create project
3. Copy connection string

### Step 2: Update Your .env File

Replace this line:
```env
DATABASE_URL="file:./db/custom.db"
```

With your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://username:password@hostname:5432/database_name"
```

Example (Supabase):
```env
DATABASE_URL="postgresql://postgres:yourpassword@db.xxxxx.supabase.co:5432/postgres"
```

### Step 3: Update Prisma Schema

✅ **Already done!** Your [prisma/schema.prisma](prisma/schema.prisma) is already configured for PostgreSQL.

### Step 4: Push Schema to PostgreSQL

```bash
# Generate new Prisma client
bun run db:generate

# Push schema to PostgreSQL
bun run db:push
```

This creates all tables in your PostgreSQL database.

### Step 5: (Optional) Migrate Existing Data

If you have data in SQLite you want to keep:

```bash
# Install migration tool
npm install -g prisma-migrate

# Export SQLite data
sqlite3 db/custom.db .dump > data.sql

# Import to PostgreSQL (adjust connection string)
psql $DATABASE_URL < data.sql
```

Or manually export/import via Prisma Studio:
```bash
# Open SQLite database
DATABASE_URL="file:./db/custom.db" bunx prisma studio

# Export data, then switch DATABASE_URL and import
```

### Step 6: Test Your App

```bash
# Start development server
bun run dev

# Visit http://localhost:8888
# Try creating a blog post to test database connection
```

### Step 7: Deploy to Production

See [DEPLOYMENT.md](DEPLOYMENT.md) for full deployment guide.

---

## Keep Both (Development vs Production)

You can use SQLite locally and PostgreSQL in production:

**Development (.env):**
```env
DATABASE_URL="file:./db/custom.db"
```

**Production (.env.production):**
```env
DATABASE_URL="postgresql://..."
```

**Update Prisma schema to support both:**

```prisma
datasource db {
  provider = "postgresql" // Use PostgreSQL as primary
  url      = env("DATABASE_URL")
}
```

Then use different DATABASE_URL values per environment.

---

## Troubleshooting

### Error: "relation does not exist"

**Fix:** Run migrations:
```bash
bun run db:push
```

### Error: "connection refused"

**Fix:** Check your connection string format and credentials:
```bash
# Test connection
bunx prisma db push
```

### Error: "SSL required"

**Fix:** Add `?sslmode=require` to connection string:
```env
DATABASE_URL="postgresql://...?sslmode=require"
```

### Want to switch back to SQLite?

```bash
# In .env
DATABASE_URL="file:./db/custom.db"

# In prisma/schema.prisma
# Change provider to "sqlite"

# Regenerate client
bun run db:generate
bun run db:push
```

---

## Verification Checklist

- [ ] PostgreSQL database created
- [ ] Connection string added to `.env`
- [ ] `bun run db:push` executed successfully
- [ ] App runs without database errors
- [ ] Can create/read blog posts
- [ ] Ready for production deployment

---

**Done!** Your app now uses PostgreSQL and is production-ready! 🎉

Next: Follow [DEPLOYMENT.md](DEPLOYMENT.md) to deploy to Vercel, Railway, or any platform.
