# giulio-quaglia.com — Site Repository

Personal portfolio and blog. Built with vanilla HTML/CSS/JS, no frameworks, no build step.
Hosted on Netlify with automatic deploys from this repository.

---

## Folder structure

```
/
├── index.html                        # Portfolio homepage
├── blog.html                         # Blog index (reads posts automatically)
├── post.html                         # Post reader template (shared by all posts)
├── CV_Giulio_Quaglia_DataEng.pdf     # CV — linked from the contact section
├── README.md
└── posts/
    ├── images/                       # All images, GIFs, and video files
    │   └── ...
    ├── sap-azure-migration.md
    ├── ironman-data-pipeline.md
    └── ...                           # Your future posts go here
```

---

## How to write a new post

### Step 1 — Create the Markdown file

Create a new `.md` file inside `posts/`. The filename becomes the URL slug, so use lowercase words separated by hyphens.

Example filename: `posts/my-post-about-python.md`

Every file must start with a **frontmatter block** between two `---` lines:

```
---
title: Your Post Title Here
date: 2025-07-20
category: data eng
excerpt: One sentence that appears in the blog list as a preview.
---

Your post content starts here...
```

**Valid categories:**

| Value to use in frontmatter | Shown as in the UI |
|---|---|
| `data eng` | data eng |
| `machine learning eng` | ml eng |
| `software eng` | software eng |
| `biomed eng` | biomed eng |
| `finance` | finance |
| `cryptography` | cryptography |
| `health` | health |
| `sport` | sport |

---

### Step 2 — Register the post in blog.html

Open `blog.html` and find this block near the top of the `<script>` section (around line 5):

```js
const POST_FILES = [
  'sap-azure-migration',
  'ironman-data-pipeline',
];
```

Add your new filename (without `.md`) to the array:

```js
const POST_FILES = [
  'sap-azure-migration',
  'ironman-data-pipeline',
  'my-post-about-python',   // <- add here
];
```

Posts are sorted by date automatically, newest first.

### Step 3 — Push to GitHub

```bash
git add .
git commit -m "post: my post about python"
git push
```

Netlify detects the push and redeploys in ~30 seconds. Done.

---

## Markdown reference

### Text formatting

```markdown
**bold text**
*italic text*
***bold and italic***
`inline code`
[link text](https://example.com)
```

### Headings

```markdown
## Section heading
### Subsection heading
```

### Lists

```markdown
- unordered item
- another item

1. ordered item
2. another item
```

### Blockquote

```markdown
> This text appears as a highlighted quote block.
```

### Horizontal rule

```markdown
---
```

---

## Code snippets

Use triple backticks with the language name for syntax highlighting.

Supported languages: `python`, `sql`, `bash`, `javascript`, `java`, `r`, `yaml`

````markdown
```python
df = spark.read.parquet("s3://bucket/data")
df.groupBy("category").agg(count("*")).show()
```
````

````markdown
```sql
SELECT user_id, COUNT(*) AS events
FROM events
WHERE date >= '2025-01-01'
GROUP BY user_id
```
````

````markdown
```bash
pip install pandas
python pipeline.py --env prod
```
````

---

## Images and GIFs

Put the file in `posts/images/` then reference it in your post.

**Plain image or GIF:**
```markdown
![alt text](images/filename.png)
![animation](images/demo.gif)
```

**Image with caption (shown below the image):**
```markdown
![alt text](images/filename.png "This is the caption")
```

Images are lazy-loaded automatically. Use `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`.

---

## Videos

### Local video file (mp4)

Put the file in `posts/images/` and use the `@[video]` syntax:

```markdown
@[video](images/demo.mp4)
```

Displays a native HTML5 video player with controls.

### YouTube embed

Use only the video ID — the part after `?v=` in the YouTube URL.

For `https://www.youtube.com/watch?v=dQw4w9WgXcQ` the ID is `dQw4w9WgXcQ`:

```markdown
@[youtube](dQw4w9WgXcQ)
```

### Vimeo embed

Use only the numeric video ID from the Vimeo URL:

```markdown
@[vimeo](123456789)
```

Both embeds are responsive 16:9 and lazy-loaded.

---

## Updating the CV

Replace `CV_Giulio_Quaglia_DataEng.pdf` in the root folder with the new file, keeping the same filename. The download button in the contact section will automatically serve the new file.

If you want to use a different filename, update this line in `index.html`:

```html
<a href="CV_Giulio_Quaglia_DataEng.pdf" download class="btn">download cv ↓</a>
```

---

## Domain setup (Wix DNS → Netlify)

1. Deploy this repo on [Netlify](https://app.netlify.com) and link it to this GitHub repository.
2. In Netlify: **Site settings → Domain management → Add custom domain** → enter your domain.
3. Netlify will show you two DNS values — an `A` record and a `CNAME`.
4. In Wix: **Domains → Manage → DNS Records** → replace the existing A record and add the CNAME with Netlify's values.
5. Wait up to 48 hours for propagation (usually under 30 minutes).
6. Netlify provisions an SSL certificate automatically.

---

## Local development

No build tools needed. Just open `index.html` directly in a browser for the portfolio.

For the blog, the post loader uses `fetch()` to read `.md` files, which requires a local server (browsers block local file fetches by default). Run any of these:

```bash
# Python (built-in)
python3 -m http.server 8000

# Node (if installed)
npx serve .

# VS Code
# Install the "Live Server" extension, right-click index.html → Open with Live Server
```

Then open `http://localhost:8000` in your browser.
