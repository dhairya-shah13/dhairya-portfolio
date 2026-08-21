import Layout from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import BlogsPage from './pages/BlogsPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { detailProjects } from './data/projects.js';
import { blogPosts } from './data/blogs.js';

// Dynamic routes: getStaticPaths tells vite-react-ssg which concrete URLs
// to prerender as static HTML at build time.
const projectRoute = {
  path: 'projects/:slug',
  element: <ProjectPage />,
  getStaticPaths: () => detailProjects.map((p) => `projects/${p.slug}`),
};

const blogRoute = {
  path: 'blogs/:slug',
  element: <BlogPostPage />,
  getStaticPaths: () => blogPosts.map((b) => `blogs/${b.slug}`),
};

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      projectRoute,
      { path: 'blogs', element: <BlogsPage /> },
      blogRoute,
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
