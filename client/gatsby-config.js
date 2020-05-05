module.exports = {
  pathPrefix: '/texas-county-covid-19',
  siteMetadata: {
    title: 'Texas COVID19',
    description: 'Texas Covid19 Choropleth by County',
    homepage: 'https://markcmurphy.github.io/texas-county-covid-19',
    author: 'Mark Murphy',
  },
  plugins: [
    // `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //     ignore: [**/.*],
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-svgr`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-material-design-for-bootstrap`,
        short_name: `MDB starter`,
        start_url: `/`,
        background_color: `#4B5EB8`,
        theme_color: `#68008C`,
        display: `standalone`,
        // icon: `${__dirname}/src/images/mdb-react-small.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
