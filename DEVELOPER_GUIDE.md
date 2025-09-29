# Developer Guide: Managing Authenticated Content

## Table of Contents
1. [Adding Protected Routes](#adding-protected-routes)
2. [Adding Gated Content](#adding-gated-content)
3. [Removing Protected Routes](#removing-protected-routes)
4. [Removing Gated Content](#removing-gated-content)
5. [Troubleshooting](#troubleshooting)

---

## Adding Protected Routes

Protected routes require authentication to access and redirect to login if the user is not authenticated.

### Step 1: Add Edge Function Route

**File to edit:** `netlify.toml`

Add a new edge function configuration:

```toml
[[edge_functions]]
  path = "/your-section/*"
  function = "auth-guard"
```

**Example:** Protecting a new settings section:

```toml
[[edge_functions]]
  path = "/settings/*"
  function = "auth-guard"
```

### Step 2: Create Protected Pages

Create your Astro pages normally:

```
src/pages/
└── settings/
    ├── profile.astro
    ├── preferences.astro
    └── billing.astro
```

These pages will be built as static HTML but protected by the edge function.

### Step 3: Test Locally

```bash
# Start Netlify Dev
netlify dev

# Test without auth (should redirect)
curl -i http://localhost:8888/settings/profile/

# Test with auth (should load)
# 1. Get auth cookie first
curl -c cookies.txt -X POST http://localhost:8888/.netlify/functions/set-auth-cookie \
  -H "Content-Type: application/json" \
  -d '{"token":"test-token"}'

# 2. Access with cookie
curl -b cookies.txt http://localhost:8888/settings/profile/
```

### Step 4: Deploy

```bash
git add netlify.toml src/pages/settings/
git commit -m "Add protected settings section"
git push
```

### Important Notes

- **Always use wildcard:** `/settings/*` not `/settings` (to catch all sub-paths)
- **Include trailing slash in tests:** Astro builds pages with trailing slashes
- **Edge function applies to all sub-paths:** No need to configure each page individually

---

## Adding Gated Content

Gated content serves different versions to authenticated vs. unauthenticated users at the same URL.

### Step 1: Decide What to Gate

Ask yourself:
- Which section should have premium content? (e.g., `/patterns/*`, `/compliance/*`)
- What makes content "premium"? (implementation details, advanced examples, etc.)
- Should all pages in the section be gated, or just some?

### Step 2: Add Edge Function Configuration

**File to edit:** `netlify.toml`

Add two configurations:

```toml
# Content gating - serves different content based on auth
[[edge_functions]]
  path = "/your-section/*"
  function = "content-gate"

# Block direct access to gated content
[[edge_functions]]
  path = "/gated/*"
  function = "block-gated"
```

**Note:** The `block-gated` configuration only needs to be added once, regardless of how many sections you gate.

**Example:** Gating the patterns section:

```toml
[[edge_functions]]
  path = "/patterns/*"
  function = "content-gate"

[[edge_functions]]
  path = "/gated/*"
  function = "block-gated"
```

### Step 3: Create Directory Structure

Create a parallel directory structure in `/gated/`:

```
src/pages/
├── patterns/
│   └── forms-and-validation.md       # Public version
└── gated/
    └── patterns/
        └── forms-and-validation.md   # Premium version
```

**Directory naming must match exactly** - the edge function does a path replacement:
- `/patterns/forms-and-validation/` → `/gated/patterns/forms-and-validation/`

### Step 4: Create Content Versions

#### Option A: Keep Public, Enhance Premium

Leave the public version as-is and add extra content to the gated version.

**Public version:** `src/pages/patterns/forms-and-validation.md`
```markdown
---
title: Forms and Validation
---

## Basic Form Structure

Standard form guidelines...

## Validation Rules

Basic validation patterns...
```

**Gated version:** `src/pages/gated/patterns/forms-and-validation.md`
```markdown
---
title: Forms and Validation
---

:::note{.premium}
🔓 **Premium Content** - Enhanced version with implementation examples
:::

## Basic Form Structure

Standard form guidelines...

## Validation Rules

Basic validation patterns...

---

## 🎯 Implementation Guide (Premium)

Detailed code examples...

## 🔧 Advanced Patterns (Premium)

Complex validation scenarios...

## 🧪 Testing Strategies (Premium)

How to test forms...
```

#### Option B: Create Lite Public, Full Premium

Reduce the public version and move full content to premium.

**Public version:** `src/pages/patterns/forms-and-validation.md`
```markdown
---
title: Forms and Validation
---

## Overview

Forms are essential for user input. This guide covers basic usage.

:::note
Sign in to access implementation guides, code examples, and advanced patterns.
:::

## Basic Principles

1. Clear labels
2. Helpful error messages
3. Logical field order
```

**Gated version:** `src/pages/gated/patterns/forms-and-validation.md`
```markdown
---
title: Forms and Validation
---

## Complete Implementation Guide

[Full detailed content here...]
```

### Step 5: Add Visual Indicators (Optional)

Add a banner to show users they're viewing premium content:

```markdown
:::note{.premium}
🔓 **Premium Content** - You're viewing the enhanced version
:::
```

Or add a "Sign in for more" callout in the public version:

```markdown
:::note
📖 **Want More?** Sign in to access:
- Implementation examples
- Advanced patterns
- Testing strategies
:::
```

### Step 6: Test Both Versions

```bash
# Start server
netlify dev

# Test public version (no auth)
curl http://localhost:8888/patterns/forms-and-validation/ > public.html
grep -i "premium" public.html  # Should be empty

# Set auth cookie
curl -c cookies.txt -X POST http://localhost:8888/.netlify/functions/set-auth-cookie \
  -H "Content-Type: application/json" \
  -d '{"token":"test-token"}'

# Test gated version (with auth)
curl -b cookies.txt http://localhost:8888/patterns/forms-and-validation/ > premium.html
grep -i "premium" premium.html  # Should show premium sections

# Verify direct access blocked
curl -i http://localhost:8888/gated/patterns/forms-and-validation/
# Should return 404
```

### Step 7: Deploy

```bash
git add netlify.toml src/pages/patterns/ src/pages/gated/patterns/
git commit -m "Add gated content for patterns section"
git push
```

### Best Practices for Gated Content

**DO:**
- ✅ Keep public versions useful (don't make them feel incomplete)
- ✅ Clearly mark premium sections (use banners/badges)
- ✅ Maintain identical frontmatter in both versions
- ✅ Test both versions before deploying

**DON'T:**
- ❌ Make public version feel like a "tease" (frustrating UX)
- ❌ Forget to update both versions when content changes
- ❌ Use different frontmatter (breaks layouts)
- ❌ Gate essential information (keep documentation accessible)

---

## Removing Protected Routes

### Step 1: Remove Edge Function Configuration

**File to edit:** `netlify.toml`

Delete or comment out the edge function block:

```toml
# Remove this:
# [[edge_functions]]
#   path = "/settings/*"
#   function = "auth-guard"
```

### Step 2: Test Locally

```bash
netlify dev

# Route should now be accessible without auth
curl http://localhost:8888/settings/profile/
# Should return 200 OK, not redirect
```

### Step 3: Deploy

```bash
git add netlify.toml
git commit -m "Remove protection from settings section"
git push
```

**Note:** The pages themselves don't need to change - removing the edge function configuration is sufficient.

---

## Removing Gated Content

### Option A: Make All Content Public

#### Step 1: Move Content Back

Copy the gated version content back to the public version:

```bash
# Copy gated to public (overwrites public with full content)
cp src/pages/gated/patterns/forms-and-validation.md \
   src/pages/patterns/forms-and-validation.md
```

#### Step 2: Remove Gated Version

```bash
rm -rf src/pages/gated/patterns/
```

#### Step 3: Remove Edge Function Configurations

**File to edit:** `netlify.toml`

```toml
# Remove these:
# [[edge_functions]]
#   path = "/patterns/*"
#   function = "content-gate"
```

**Keep the `block-gated` configuration** if you still have other gated sections.

#### Step 4: Deploy

```bash
git add netlify.toml src/pages/patterns/ src/pages/gated/
git commit -m "Remove content gating from patterns section"
git push
```

### Option B: Keep Different Versions, Remove Gating

If you want to keep both versions but make them separately accessible:

#### Step 1: Rename Gated Directory

```bash
# Rename gated to a public path
mv src/pages/gated/patterns/ src/pages/patterns-premium/
```

#### Step 2: Update Edge Function Configuration

```toml
# Remove content-gate
# [[edge_functions]]
#   path = "/patterns/*"
#   function = "content-gate"

# Keep block-gated only if other sections still use it
# [[edge_functions]]
#   path = "/gated/*"
#   function = "block-gated"
```

#### Step 3: Update Links

Update any links that reference the old paths.

#### Step 4: Deploy

```bash
git add netlify.toml src/pages/patterns-premium/
git commit -m "Make premium patterns publicly accessible at /patterns-premium/"
git push
```

---

## Troubleshooting

### Issue: Edge Function Not Running

**Symptoms:**
- Protected route loads without authentication
- No redirect to login

**Diagnosis:**
```bash
# Check netlify.toml syntax
cat netlify.toml | grep -A2 "edge_functions"

# Check Netlify Dev logs
netlify dev
# Look for "Loaded edge function auth-guard" message
```

**Solutions:**
1. Verify path uses wildcard: `/auth/*` not `/auth`
2. Restart Netlify Dev after config changes
3. Check edge function file exists: `netlify/edge-functions/auth-guard.js`

### Issue: Content Gating Shows Wrong Version

**Symptoms:**
- Always seeing public version (even when logged in)
- Always seeing premium version (even when not logged in)

**Diagnosis:**
```bash
# Check if cookie is being set
curl -c cookies.txt -X POST http://localhost:8888/.netlify/functions/set-auth-cookie \
  -H "Content-Type: application/json" \
  -d '{"token":"test"}'

# Check cookie file
cat cookies.txt | grep firebase_session

# Test with cookie
curl -b cookies.txt -i http://localhost:8888/components/checkbox/ | head -20
# Look for "x-nf-edge-functions: content-gate" header
```

**Solutions:**
1. Verify `content-gate` edge function is loaded (check Netlify Dev logs)
2. Check gated file exists at correct path: `src/pages/gated/components/checkbox.md`
3. Verify directory structure matches: `/components/x/` → `/gated/components/x/`
4. Clear cookies and retry: `rm cookies.txt`

### Issue: Direct Gated Access Not Blocked

**Symptoms:**
- Can access `/gated/components/checkbox/` directly
- Returns 200 instead of 404

**Diagnosis:**
```bash
# Check if block-gated is running
curl -i http://localhost:8888/gated/components/checkbox/ | head -15
# Look for "x-nf-edge-functions: block-gated" header
```

**Solutions:**
1. Verify `block-gated` configuration exists in `netlify.toml`
2. Check edge function returns 404: `netlify/edge-functions/block-gated.js`
3. Restart Netlify Dev

### Issue: Redirect Loop on Protected Routes

**Symptoms:**
- Browser shows "Too many redirects"
- Cannot access protected page even when logged in

**Diagnosis:**
```bash
# Check if cookie is being set correctly
curl -v -c cookies.txt -X POST http://localhost:8888/.netlify/functions/set-auth-cookie \
  -H "Content-Type: application/json" \
  -d '{"token":"test"}' 2>&1 | grep -i "set-cookie"
```

**Solutions:**
1. Verify cookie name matches: should be `firebase_session`
2. Check edge function looks for correct cookie name
3. Ensure login page is NOT protected by auth-guard
4. Check redirect URL in edge function matches login path

### Issue: Login Works Locally But Not on Netlify

**Symptoms:**
- Local testing succeeds
- Production/preview deployment fails

**Common causes:**

1. **Missing environment variables:**
   ```bash
   # Check Netlify environment variables
   # Go to: Site Settings > Environment Variables
   # Verify these exist:
   # - PUBLIC_FIREBASE_API_KEY
   # - PUBLIC_FIREBASE_AUTH_DOMAIN
   # - PUBLIC_FIREBASE_PROJECT_ID
   # - PUBLIC_FIREBASE_APP_ID
   ```

2. **Cookie security flags:**
   - Production requires `Secure` flag (HTTPS only)
   - Check `set-auth-cookie.js` handles production vs. local correctly

3. **CORS issues:**
   - Check Netlify function logs in dashboard
   - Verify `credentials: 'include'` in fetch calls

### Getting Help

If issues persist:

1. **Check edge function logs** in Netlify dashboard: Deploy > Functions > Edge Functions
2. **Check Netlify function logs** in dashboard: Deploy > Functions > Logs
3. **Enable verbose logging** in edge functions:
   ```javascript
   console.log('[Auth Guard] Cookie:', context.cookies.get('firebase_session'))
   console.log('[Auth Guard] Path:', url.pathname)
   ```
4. **Test in incognito/private browsing** to eliminate cached auth state

---

## Quick Reference

### Common Tasks

| Task | Files to Edit | Commands |
|------|--------------|----------|
| Protect new route | `netlify.toml` | Add edge function config |
| Unprotect route | `netlify.toml` | Remove edge function config |
| Gate new section | `netlify.toml`, create `/gated/` files | Add content-gate config |
| Remove gating | `netlify.toml`, merge content | Remove content-gate config |
| Test locally | - | `netlify dev` |
| Deploy changes | - | `git push` |

### Edge Function Paths Reference

```toml
# Route protection (hard block)
[[edge_functions]]
  path = "/section/*"
  function = "auth-guard"

# Content gating (different content)
[[edge_functions]]
  path = "/section/*"
  function = "content-gate"

# Block gated directory (always needed)
[[edge_functions]]
  path = "/gated/*"
  function = "block-gated"
```

### File Structure Reference

```
Project Root
├── netlify.toml                      # Edge function configuration
├── netlify/
│   ├── edge-functions/
│   │   ├── auth-guard.js            # Route protection logic
│   │   ├── content-gate.js          # Content switching logic
│   │   └── block-gated.js           # Gated access blocking
│   └── functions/
│       ├── set-auth-cookie.js       # Sets HTTP-only cookie
│       ├── clear-auth-cookie.js     # Clears cookie on logout
│       └── check-auth.js            # Checks auth status
└── src/
    └── pages/
        ├── your-section/
        │   └── page.md              # Public version
        └── gated/
            └── your-section/
                └── page.md          # Premium version
```