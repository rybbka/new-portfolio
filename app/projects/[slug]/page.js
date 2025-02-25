import { getContentful } from '@/lib/contentful';
import ProjectView from './ProjectView';

async function getProject(slug) {
  const client = await getContentful();
  const response = await client.getEntries({
    content_type: 'project',
    'fields.slug': slug,
    include: 2,
  });

  if (!response.items.length) {
    return null;
  }

  const project = response.items[0];
  // Ensure all image URLs have https:
  if (project.fields.featuredImage) {
    project.fields.featuredImage.fields.file.url = `https:${project.fields.featuredImage.fields.file.url}`;
  }
  if (project.fields.additionalImages) {
    project.fields.additionalImages.forEach(img => {
      img.fields.file.url = `https:${img.fields.file.url}`;
    });
  }
  return project;
}

export default async function ProjectPage({ params }) {
  const project = await getProject(params.slug);
  if (!project) return <div>Project not found</div>;

  console.log('Slug:', params.slug);
  console.log('Project data:', JSON.stringify(project, null, 2));

  return <ProjectView project={project} />;
}
