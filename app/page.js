import { getContentful } from '@/lib/contentful';
import ProjectGrid from './components/ProjectGrid';

async function getProjects() {
  const client = await getContentful();
  const response = await client.getEntries({
    content_type: 'project',
    include: 2,
    order: 'fields.order'
  });

  const items = response.items.map(item => {
    if (item.fields.featuredImage) {
      const url = item.fields.featuredImage.fields.file.url;
      item.fields.featuredImage.fields.file.url = `https:${url}`;

      const totalImages = 1 + (item.fields.additionalImages?.length || 0);
      item.fields.totalImages = totalImages;
    }
    return item;
  });

  items.sort((a, b) => (a.fields.order || 0) - (b.fields.order || 0));
  return items;
}

export default async function Home() {
  const projects = await getProjects();
  return <ProjectGrid initialProjects={projects} />;
}
