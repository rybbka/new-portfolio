import { createClient } from 'contentful';

// Remove all console.logs as they can interfere with build
const createContentfulClient = (preview = false) => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: preview ? process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN,
    host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  });

  return client;
};

// Export a single function that creates the client on demand
export async function getContentful(preview = false) {
  'use server'; // Explicitly mark as server code
  return createContentfulClient(preview);
}
