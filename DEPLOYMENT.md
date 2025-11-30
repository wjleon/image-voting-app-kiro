# Deployment Guide

## Pre-Deployment Checklist

### Code Preparation
- [ ] All tests passing (`npm test`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Environment variables documented in `.env.example`
- [ ] Database schema is up to date
- [ ] Images are ingested and seed data is ready

### Database Setup
- [ ] PostgreSQL database provisioned
- [ ] Connection string obtained
- [ ] Connection pooling configured (for serverless)
- [ ] Database migrations applied
- [ ] Seed data loaded (if applicable)

### Environment Variables
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `ADMIN_PASSWORD` - Secure admin password (min 8 characters)
- [ ] `NODE_ENV` - Set to "production"

## Vercel Deployment

### Initial Setup

1. **Create Vercel Project**
   ```bash
   # Install Vercel CLI (optional)
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   ```

2. **Link Repository**
   - Go to https://vercel.com/new
   - Import your Git repository
   - Vercel auto-detects Next.js configuration

3. **Configure Environment Variables**
   - Navigate to: Project Settings → Environment Variables
   - Add required variables for all environments:
     - Production
     - Preview
     - Development

### Database Configuration

#### Option 1: Vercel Postgres

```bash
# Create Vercel Postgres database
vercel postgres create

# Link to your project
vercel link

# Get connection string
vercel env pull
```

#### Option 2: External Database (Supabase, Railway, etc.)

1. Create PostgreSQL database on your provider
2. Get connection string with pooling enabled
3. Add to Vercel environment variables

### Deploy

```bash
# Deploy to production
vercel --prod

# Or push to main branch for automatic deployment
git push origin main
```

### Post-Deployment Tasks

1. **Run Database Migrations**
   ```bash
   # Using Vercel CLI
   vercel env pull .env.production
   DATABASE_URL="your-connection-string" npx prisma migrate deploy
   ```

2. **Seed Database**
   ```bash
   DATABASE_URL="your-connection-string" npx prisma db seed
   ```

3. **Verify Deployment**
   - [ ] Homepage loads correctly
   - [ ] Images display properly
   - [ ] Voting functionality works
   - [ ] Admin dashboard accessible at `/admin`
   - [ ] API routes respond correctly

4. **Test Admin Access**
   - Navigate to `https://your-app.vercel.app/admin`
   - Login with username: `admin`
   - Password: your `ADMIN_PASSWORD`

## Troubleshooting

### Common Issues

#### Database Connection Errors

**Problem**: "Can't reach database server"

**Solutions**:
- Verify `DATABASE_URL` is correct
- Check database is accessible from Vercel's IP ranges
- Ensure connection pooling is enabled
- For Vercel Postgres, use the pooled connection string

#### Build Failures

**Problem**: Build fails with Prisma errors

**Solutions**:
- Ensure `prisma generate` runs before build
- Check `vercel.json` has correct build command
- Verify Prisma schema is valid

#### Image Loading Issues

**Problem**: Images don't load or show 404

**Solutions**:
- Verify images are in `/public/images/` directory
- Check image paths in database match file locations
- Ensure images are committed to Git (not in `.gitignore`)

#### Admin Authentication Fails

**Problem**: Can't access admin dashboard

**Solutions**:
- Verify `ADMIN_PASSWORD` environment variable is set
- Check middleware is deployed (should see in Vercel logs)
- Try clearing browser cache/cookies
- Verify username is `admin` (lowercase)

### Performance Optimization

1. **Enable Edge Caching**
   - Static images are cached automatically
   - API routes use appropriate cache headers

2. **Database Connection Pooling**
   - Use connection pooling for serverless
   - Configure `connection_limit` in Prisma schema if needed

3. **Image Optimization**
   - Next.js automatically optimizes images
   - Configured in `next.config.ts`
   - Uses AVIF/WebP formats when supported

## Monitoring

### Vercel Dashboard

- **Analytics**: View page views and performance
- **Logs**: Check function logs for errors
- **Deployments**: Track deployment history

### Database Monitoring

- Monitor connection count
- Check query performance
- Set up alerts for errors

## Rollback

If deployment has issues:

```bash
# Rollback to previous deployment
vercel rollback
```

Or use Vercel dashboard:
1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

## Security Checklist

- [ ] `ADMIN_PASSWORD` is strong and unique
- [ ] Database credentials are secure
- [ ] Environment variables are not exposed in client code
- [ ] HTTPS is enabled (automatic on Vercel)
- [ ] Admin routes are protected by middleware
- [ ] Database has proper access controls

## Maintenance

### Regular Tasks

1. **Monitor Database Size**
   - Check storage usage
   - Archive old votes if needed

2. **Update Dependencies**
   ```bash
   npm update
   npm audit fix
   ```

3. **Database Backups**
   - Configure automatic backups
   - Test restore procedures

4. **Review Logs**
   - Check for errors
   - Monitor performance issues

## Support

For issues:
1. Check Vercel logs
2. Review database logs
3. Test locally with production environment variables
4. Check GitHub issues for similar problems
