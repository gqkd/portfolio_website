/* Single source of truth for the blog.
   Loads the real Markdown posts in posts/ (the same files post.html renders),
   parses their frontmatter, and exposes window.BLOG_POSTS for:
     - the homepage  (index.html) -> latest 3
     - the blog page (blog.html)  -> featured (newest) + grid + filters

   TO ADD A POST:
     1) drop a new  posts/<slug>.md  (with title/date/category/excerpt frontmatter)
     2) add its '<slug>' to POST_FILES below
   The blog list, the homepage, and the filter chips update automatically. */
(function () {
  // Registration list — order doesn't matter (sorted by date, newest first).
  var POST_FILES = [
    '2024-02-03-crash-biomechanics',
    '2024-01-27-hip-biomechanics',
    '2024-01-20-neural-network-calibration',
    '2024-01-13-sleep-stages',
    '2024-01-06-osseointegration'
  ];

  // frontmatter category -> short label shown on cards & filter chips
  var CAT_LABELS = {
    'data eng': 'data eng',
    'machine learning eng': 'ml eng',
    'software eng': 'software eng',
    'biomed eng': 'biomed eng',
    'finance': 'finance',
    'cryptography': 'crypto',
    'health': 'health',
    'sport': 'sport'
  };

  function slugifyCat(c) { return (c || '').toLowerCase().trim().replace(/\s+/g, '-'); }

  function parseFrontmatter(text) {
    var m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m) return { meta: {}, body: text };
    var meta = {};
    m[1].split('\n').forEach(function (line) {
      var i = line.indexOf(':');
      if (i !== -1) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    });
    return { meta: meta, body: m[2] };
  }

  function readTime(body) {
    var n = body.trim().split(/\s+/).length;
    return Math.max(1, Math.round(n / 200)) + ' min read';
  }

  function fmtDate(str) {
    var d = new Date(str);
    if (isNaN(d)) return str || '';
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function toPost(slug, meta, body) {
    var cat = meta.category || '';
    return {
      id: slug,
      slug: slug,
      cat: slugifyCat(cat),
      catLabel: CAT_LABELS[cat.toLowerCase()] || cat,
      status: fmtDate(meta.date),
      readTime: readTime(body),
      image: '',                       // diagrams live inside the post; featured card stays dark
      href: 'post.html?p=' + slug,
      title: meta.title || slug,
      excerpt: meta.excerpt || '',
      excerptLong: meta.excerpt || ''
    };
  }

  function publish(posts) {
    posts.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    window.BLOG_POSTS = posts.map(function (p) { return p.post; });
    try { window.dispatchEvent(new Event('blogposts:ready')); } catch (e) {}
  }

  Promise.all(POST_FILES.map(function (slug) {
    return fetch('posts/' + slug + '.md')
      .then(function (r) { return r.ok ? r.text() : null; })
      .then(function (text) {
        if (!text) return null;
        var p = parseFrontmatter(text);
        return { date: p.meta.date, post: toPost(slug, p.meta, p.body) };
      })
      .catch(function () { return null; });
  })).then(function (entries) {
    publish(entries.filter(Boolean));
  });
})();
