const path = require('path');
require('dotenv').config();

module.exports = {
  siteMetadata: {
       title: 'Gatsby blog',
       description: 'Project to learn Gatsby',
       author: 'Dhren',
     },
  plugins: [
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          common: path.resolve(__dirname, 'src/common'),
          'common-app': path.resolve(__dirname, 'src/common-app'),
          core: path.resolve(__dirname, 'src/core'),
          layouts: path.resolve(__dirname, 'src/layouts'),
          pods: path.resolve(__dirname, 'src/pods'),
        },
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Open Sans:300,400,800'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Gatsby Blog',
        short_name: 'Blog Dhren',
        start_url: '/',
        background_color: '#f5f7fb',
        theme_color: '#d9d900',
        display: 'fullscreen',
        icon: 'src/core/images/favicon.png',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
   'gatsby-plugin-sharp',
   {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-images-contentful',
        },
      ],
    },
  },
   {
     resolve: 'gatsby-source-filesystem',
     options: {
       name: 'images',
       path: path.resolve(__dirname, 'src/core/images'),
     },
   },
  
   
      {
            resolve: 'gatsby-source-contentful',
            options: {
              spaceId: process.env.CONTENTFUL_SPACE_ID,
              accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
            },
          },
  ],
};