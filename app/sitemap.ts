import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://bridgelys.se',
      lastModified: new Date(),
    },
  ]
}