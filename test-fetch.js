
const { fetchProjectBySlug } = require('./src/features/projects/services/fetch-projects');

async function test() {
  try {
    const slug = 'project-alpha';
    console.log(`Fetching project with slug: ${slug}`);
    const project = await fetchProjectBySlug(slug);
    console.log('Result:', project ? 'Found' : 'Not Found');
    if (project) {
      console.log('Project Name:', project.name);
    }
  } catch (error) {
    console.error('Error fetching project:', error);
  }
}

test();
