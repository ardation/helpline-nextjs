const siteUrl = process.env.SITE_URL || 'https://findahelpline.com';
module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    exclude: ['/widget', '/widget/*', '/i/*', '/server-sitemap.xml'],
    sitemapSize: 7000,
    robotsTxtOptions: {
        additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
    },
};
