const fs = require('fs');
const path = require('path');

function generate() {
  // Define static routes
  const staticRoutes = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.9', changefreq: 'monthly' },
  ];

  // Get dynamic routes from content
  const blogDir = path.join(process.cwd(), 'public/blog');
  const projectsDir = path.join(process.cwd(), 'public/projects');
  
  const blogRoutes = [];
  const projectRoutes = [];

  // Get blog routes
  if (fs.existsSync(blogDir)) {
    const blogFolders = fs.readdirSync(blogDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    blogFolders.forEach(folder => {
      blogRoutes.push({
        url: `/blog/${folder}`,
        priority: '0.8',
        changefreq: 'weekly'
      });
    });
  }

  // Get project routes
  if (fs.existsSync(projectsDir)) {
    const projectFolders = fs.readdirSync(projectsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    projectFolders.forEach(folder => {
      projectRoutes.push({
        url: `/projects/${folder}`,
        priority: '0.8',
        changefreq: 'monthly'
      });
    });
  }

  const allRoutes = [...staticRoutes, ...blogRoutes, ...projectRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>https://www.mohammedabdirahman.com${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

generate();