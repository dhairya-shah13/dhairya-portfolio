import Layout from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { detailProjects } from './data/projects.js';

// Dynamic route: useParams() only captures values from ':param' segments, so
// the project route must be dynamic. getStaticPaths tells vite-react-ssg which
// concrete URLs to prerender as static HTML.
const projectRoute = {
  path: 'projects/:slug',
  element: <ProjectPage />,
  getStaticPaths: () => detailProjects.map((p) => `projects/${p.slug}`),
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
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
