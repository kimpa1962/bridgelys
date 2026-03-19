import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bridgelys.se'

  const routes = [
    '',
    '/services/procurement',
    '/services/project-management',
    '/services/accessibility',
    '/services/seo',
    '/services/educations',
    '/services/web-development',
    '/about-us',
    '/contact',
    '/join-network'
  ]

  const languages = ['sv', 'en']

  const urls = []

  for (const lang of languages) {
    for (const route of routes) {
      urls.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
      })
    }
  }

  return urls
}