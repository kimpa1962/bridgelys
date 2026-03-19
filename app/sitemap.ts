import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://bridgelys.se',
      lastModified: new Date(),
    },
    {
      url: 'https://bridgelys.se/services/web-development',
      lastModified: new Date(),
    },
    {
      url: 'https://bridgelys.se/services/seo',
      lastModified: new Date(),
    },
    {
      url: 'https://bridgelys.se/services',
      lastModified: new Date(),
    },
  ]
}