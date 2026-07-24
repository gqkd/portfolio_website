/* Single source of truth for the blog list (homepage + blog.html).
   STATIC by design: the post metadata below is set synchronously, with no
   runtime fetch — so the blog always renders, even where fetching .md at
   load time is unreliable. The full article is still loaded by post.html
   (post.html?p=<slug> reads posts/<slug>.md) when a post is opened.

   TO ADD A POST:
     1) create  posts/<slug>.md  (with frontmatter) — post.html renders it
     2) add an entry to POSTS below (newest first)
   The homepage (latest 3), the blog list, and the filter chips update from here. */
(function () {
  var POSTS = [
    {
      slug: '2024-02-03-crash-biomechanics',
      cat: 'biomed-eng', catLabel: 'biomed eng',
      status: '03 Feb 2024', readTime: '4 min read',
      title: 'What happens to your body in a 50 km/h crash',
      excerpt: 'A frontal impact at 50 km/h lasts under 200 milliseconds. The biomechanics of those milliseconds explains why urban speed limits are exactly where they are.'
    },
    {
      slug: '2024-01-27-hip-biomechanics',
      cat: 'biomed-eng', catLabel: 'biomed eng',
      status: '27 Jan 2024', readTime: '4 min read',
      title: 'Hip biomechanics: how much does standing on one leg actually cost?',
      excerpt: 'When you lift one foot while walking, the force on your hip joint reaches 3x your body weight. Here is the lever mechanics behind that number and why it determines how prosthetics are engineered.'
    },
    {
      slug: '2024-01-20-neural-network-calibration',
      cat: 'machine-learning-eng', catLabel: 'ml eng',
      status: '20 Jan 2024', readTime: '4 min read',
      title: "When the neural network doesn't know what it doesn't know",
      excerpt: 'Deep learning models are systematically overconfident. They output 99% confidence and are often wrong. This is what calibration means, why it matters, and what you can do about it.'
    },
    {
      slug: '2024-01-13-sleep-stages',
      cat: 'health', catLabel: 'health',
      status: '13 Jan 2024', readTime: '6 min read',
      title: 'Sleep explained with data: what actually happens at night',
      excerpt: 'Sleep is not a uniform off state. It is a precise sequence of stages with distinct biological functions, and EEG data shows a brain that is anything but inactive at night.'
    },
    {
      slug: '2024-01-06-osseointegration',
      cat: 'biomed-eng', catLabel: 'biomed eng',
      status: '06 Jan 2024', readTime: '5 min read',
      title: 'Osseointegration: why a dental implant is more engineering than medicine',
      excerpt: 'A titanium implant can fuse with bone so completely that removing it would fracture the bone itself. The explanation lives in surface chemistry, not in surgical technique.'
    }
  ];

  // Normalise into the shape the pages consume.
  window.BLOG_POSTS = POSTS.map(function (p) {
    return {
      id: p.slug,
      slug: p.slug,
      cat: p.cat,
      catLabel: p.catLabel,
      status: p.status,
      readTime: p.readTime,
      image: '',
      href: 'post.html?p=' + p.slug,
      title: p.title,
      excerpt: p.excerpt,
      excerptLong: p.excerpt
    };
  });
  try { window.dispatchEvent(new Event('blogposts:ready')); } catch (e) {}
})();
