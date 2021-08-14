import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Grommet, Image, Box, Text, Tabs, Tab } from "grommet";
import Container from "components/shared/container";
import { SectionHeading, SectionBg } from "components/shared/section";
import { RichText } from "prismic-reactjs";
import { extractText } from "lib/utils";
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import { queryRepeatableDocuments } from "utils/queries";
import dayjs from "dayjs";

const BlogBg = styled(SectionBg)`
  text-align: initial;
  padding: 0;
`;

const BlogHeading = styled(SectionHeading)`
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 0px;
`;

const FrontList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const FrontListItem = styled.li`
  display: grid;
  grid-template-columns: 32.5% 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin: 20px 0;
`;

const TabList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const TabListItem = styled.li`
  display: grid;
  grid-template-columns: 32.5% 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  font-size: 16px;
  padding: 20px;
`;

const TabListTitle = styled.h3`
  margin: 0;
  padding: 0;
`;

const TabListDate = styled.p`
  margin: 0;
  padding: 0;
  font-size: 14px;
`;

const TabListContent = styled.div`
  margin-left: 20px;
`;

const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`;

const TabListImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const customTheme = deepMerge(grommet, {
  tab: {
    active: {
      background: "#7FC622",
      color: "white",
    },
    background: "#00790B",
    border: undefined,
    color: "white",
    margin: undefined,
    pad: {
      top: "10px",
      bottom: "10px",
    },
    extend: () => css`
      text-align: center;
    `,
  },
  tabs: {
    background: undefined,
    header: {
      background: "#7FC622",
      extend: () => css`
        padding-bottom: 5px;

        button {
          flex: 1 0 auto;
        }
      `,
    },
    panel: {
      // TODO: Fix up shadows and follow design
      extend: ({ theme }) => css`
        border: 1px solid black;
      `,
    },
  },
});

const getBlogs = async (idArray) => {
  const documents = await queryRepeatableDocuments((doc) =>
    idArray.includes(doc.uid)
  );

  return documents;
};

const BlogSection = ({ slice }) => {
  const [blogObject, setBlogObject] = useState({
    featured: [],
    front: [],
    popular: [],
  });

  const { items, primary } = slice;
  const title = extractText(primary.title);
  const blogIds = items.map((item) => item.blog_link.uid);
  const featuredBlogIds = items
    .filter((item) => item.type === "featured" || item.type === "front")
    .map((item) => item.blog_link.uid);
  const frontBlogIds = items
    .filter((item) => item.type === "front")
    .map((item) => item.blog_link.uid);
  const popularBlogIds = items
    .filter((item) => item.type === "popular")
    .map((item) => item.blog_link.uid);

  useEffect(() => {
    if (
      !(
        blogObject.featured.length &&
        blogObject.front.length &&
        blogObject.popular.length
      )
    ) {
      getBlogs(blogIds).then((blogArr) => {
        setBlogObject({
          featured: blogArr.filter((blog) =>
            featuredBlogIds.includes(blog.uid)
          ),
          front: blogArr.filter((blog) => frontBlogIds.includes(blog.uid)),
          popular: blogArr.filter((blog) => popularBlogIds.includes(blog.uid)),
        });
      });
    }
  }, []);

  return (
    <BlogBg>
      <Container>
        <BlogHeading as="h2" color="brand">
          {title}
        </BlogHeading>
        <Grid>
          <div>
            <FrontList>
              {blogObject.front.map((blog) => {
                const { data, first_publication_date } = blog;
                const { image, content, title } = data;

                return (
                  <FrontListItem>
                    <div>
                      <TabListImage src={image.url || ""} />
                    </div>
                    <CenteredContent>
                      <p>
                        {dayjs(first_publication_date).format("MMMM D, YYYY")}
                      </p>
                      <h3>{RichText.asText(title)}</h3>
                      <p>
                        <RichText render={content} />
                      </p>
                      <a href="#">Read More</a>
                    </CenteredContent>
                  </FrontListItem>
                );
              })}
            </FrontList>
          </div>
          <div>
            <Grommet theme={customTheme}>
              <Tabs>
                <Tab title="Featured">
                  <TabList>
                    {blogObject.featured.map((blog) => {
                      const { data, first_publication_date } = blog;
                      const { image, title } = data;

                      return (
                        <TabListItem>
                          <div>
                            <TabListImage src={image.url || ""} />
                          </div>
                          <TabListContent>
                            <TabListTitle>
                              {RichText.asText(title)}
                            </TabListTitle>
                            <TabListDate>
                              {dayjs(first_publication_date).format(
                                "MMMM D, YYYY"
                              )}
                            </TabListDate>
                          </TabListContent>
                        </TabListItem>
                      );
                    })}
                  </TabList>
                </Tab>
                <Tab title="Popular">
                  <TabList>
                    {blogObject.popular.map((blog) => {
                      const { data, first_publication_date } = blog;
                      const { image, title } = data;

                      return (
                        <TabListItem>
                          <div>
                            <TabListImage src={image.url || ""} />
                          </div>
                          <TabListContent>
                            <TabListTitle>
                              {RichText.asText(title)}
                            </TabListTitle>
                            <TabListDate>
                              {dayjs(first_publication_date).format(
                                "MMMM D, YYYY"
                              )}
                            </TabListDate>
                          </TabListContent>
                        </TabListItem>
                      );
                    })}
                  </TabList>
                </Tab>
              </Tabs>
            </Grommet>
          </div>
        </Grid>
      </Container>
    </BlogBg>
  );
};

export default BlogSection;
