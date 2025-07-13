import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2022-10-23';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Use CDN in production (non-preview)
  useCdn: dataset === 'production',
});
