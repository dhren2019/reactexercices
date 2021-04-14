import React from 'react';
import {SEO} from 'common/components'

const BlogPage = () => {
  return (
    <>
      <SEO title="Blog"
        keywords={[
          'lemoncode',
          'gatsby',
          'gatsby by sample',
          'frontent',
          'ssr',
        ]}
      />
      <div>This is a blog page</div>
    </>
  );
};

export default BlogPage;