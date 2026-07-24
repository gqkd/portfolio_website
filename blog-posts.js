/* Single source of truth for blog posts.
   Order = newest first. The Blog page renders all of these
   (posts[0] = featured, the rest = grid); the Portfolio homepage
   shows the latest 3 (posts.slice(0,3)) automatically. */
(function () {
  var POSTS = [
    {
      id: 'sap-azure',
      cat: 'data-eng',
      catLabel: 'data eng',
      featured: true,
      status: 'coming soon',
      readTime: '12 min read',
      image: 'uploads/giulio_62477_httpss.mj.runA_hnchSvAg8_uniform_better_the_backgr_193fe038-4461-4b08-a7c1-3d2e07aa21e5.png',
      href: '#',
      title: '5 things nobody tells you before migrating a SAP pipeline to Azure',
      excerpt: "Time windows, NULL semantics in Spark SQL, and why your test always passes but production doesn't. An honest diary from someone who lived it.",
      excerptLong: "Time windows, NULL semantics in Spark SQL, and why your test always passes but production doesn't. An honest field diary from someone who lived the migration end to end — the wins, the 3am incidents, and the rules I'd tattoo on every new hire."
    },
    {
      id: 'ironman',
      cat: 'sport',
      catLabel: 'sport',
      status: 'coming soon',
      href: '#',
      title: 'What an Ironman and a data pipeline have in common',
      excerpt: 'Pacing, iteration, and the art of not giving up at km 30. Reflections on discipline and engineering.'
    },
    {
      id: 'local-llm',
      cat: 'ai',
      catLabel: 'ai & tooling',
      status: 'coming soon',
      href: '#',
      title: 'Running LLMs locally for code review: is it worth it?',
      excerpt: "A year after building an offline Developer-Reviewer agent with CodeLlama. What worked, what didn't."
    },
    {
      id: 'sleep-uncertainty',
      cat: 'biomed',
      catLabel: 'biomedical ai',
      status: 'coming soon',
      href: '#',
      title: 'Quantifying uncertainty in a sleep-staging model',
      excerpt: 'Why a confident wrong prediction is dangerous in clinical AI, and how I added calibrated uncertainty to DeepSleepNet.'
    },
    {
      id: 'kpi-dashboard',
      cat: 'finance',
      catLabel: 'finance & crypto',
      status: 'coming soon',
      href: '#',
      title: 'Building a KPI dashboard finance actually trusts',
      excerpt: 'Reconciling economic, market, and internal data streams into one Power BI view — and the data-quality checks that earned sign-off.'
    },
    {
      id: 'idempotency',
      cat: 'data-eng',
      catLabel: 'data eng',
      status: 'coming soon',
      href: '#',
      title: 'Idempotency is the only word that matters in ETL',
      excerpt: 'Reruns happen. Designing pipelines that produce the same result whether they run once or five times — patterns and anti-patterns.'
    },
    {
      id: 'pyspark-pandas',
      cat: 'ai',
      catLabel: 'ai & tooling',
      status: 'coming soon',
      href: '#',
      title: 'PySpark vs Pandas: when each one actually wins',
      excerpt: 'Benchmarks from real workloads, the overhead nobody mentions, and a decision tree for picking the right tool.'
    }
  ];

  window.BLOG_POSTS = POSTS;
  try { window.dispatchEvent(new Event('blogposts:ready')); } catch (e) {}
})();
