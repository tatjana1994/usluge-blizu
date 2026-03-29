import type { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const supabase = await createClient();

  const { data: listings } = await supabase
    .from('listings')
    .select('slug, created_at')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/oglasi`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...((listings ?? []).map((listing) => ({
      url: `${baseUrl}/oglasi/${listing.slug}`,
      lastModified: new Date(listing.created_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })) satisfies MetadataRoute.Sitemap),
  ];
}
