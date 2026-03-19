import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bridgelys.se'

  const routes = [
    '',
    '/about-us',
    '/contact',
    '/join-network',
    '/services/accessibility',
    '/services/educations',
    '/services/procurement',
    '/services/project-management',
    '/services/seo',
    '/services/web-development',
  ]

  const languages = ['sv', 'en']

  return languages.flatMap((lang) =>
    routes.map((route) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
    }))
  )
}