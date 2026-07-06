import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { cursos } from '@/lib/cursos'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const home: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  const cursoPages: MetadataRoute.Sitemap = cursos.map((c) => ({
    url: `${SITE_URL}/cursos/${c.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...home, ...cursoPages]
}
