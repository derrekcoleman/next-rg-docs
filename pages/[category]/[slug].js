import { useEffect, useState } from 'react';
import Head from 'next/head';
import Markdown from 'react-markdown';
import matter from 'gray-matter';
import { Sidebar, MobileSidebar } from '../../components/PageWrapper';
import LogInButton from '../../components/LogIn';
import { MobileSidebarButton } from '../../components/MobileSidebarButton';
import { Heading, Box, Grid } from '@chakra-ui/react';
import gfm from 'remark-gfm';
import raw from 'rehype-raw';

export default function Home() {
  const [pageData, setPageData] = useState();
  const [currentPageData, setCurrentPageData] = useState();
  const [currentPageContent, setCurrentPageContent] = useState();
  const [currentSlug, setCurrentSlug] = useState();
  const [slugParameters, setSlugParameters] = useState();
  const [windowWidth, setWindowWith] = useState();
  const [isSidebarVisible, setIsSidebarVisible] = useState();

  useEffect(() => {
    const slug = window.location.pathname;
    setCurrentSlug(`${slug}`);
    const width = window.innerWidth;
    console.log(5 + '5');
    setWindowWith(width);
    const getData = async () => {
      if (window.sessionStorage.getItem('privateData')) {
        const stringifiedPrivateData = window.sessionStorage.getItem('privateData');
			  const privateData = JSON.parse(stringifiedPrivateData);
			  setPageData(privateData);
        return null;
      }
      if (!window?.sessionStorage.getItem('publicData')) {
        const response = await fetch('/api/getPublicDocs');
        const resJson = await response.json();
        const stringifiedPublicData = JSON.stringify(resJson.data);
        window.sessionStorage.setItem('publicData', stringifiedPublicData);
        setPageData(resJson.data);
        return null;
      }
      if (window?.sessionStorage.getItem('publicData')) {
        const stringifiedPublicData = window.sessionStorage.getItem(
          'publicData',
        );
        const publicData = JSON.parse(stringifiedPublicData);
        setPageData(publicData);
        return null;
      }
    };
    getData();
  }, []);

  useEffect(() => {
    setSlugParameters();
    if (typeof currentSlug !== 'undefined') {
      let slugParams = currentSlug?.split('/');
      slugParams.splice(0, 1);
      setSlugParameters(slugParams);
    }
  }, [currentSlug]);

  useEffect(() => {
    if (
      typeof slugParameters !== 'undefined' &&
      typeof pageData !== 'undefined'
    ) {
      pageData?.forEach((post) => {
        if (slugParameters[1] === post.slug) {
          const { data, content } = matter(post.fileContent);
          setCurrentPageData(data);
          setCurrentPageContent(content);
        }
      });
    }
  }, [pageData, slugParameters]);

  return (
    <>
      {typeof currentPageData !== 'undefined' &&
        typeof currentPageContent !== 'undefined' &&
        windowWidth > 450 && (
          <>
            <Head>
              <title>{`${currentPageData.category} | ${currentPageData.title}`}</title>
            </Head>
            <Box h='100vh' w='100vw' sx={{ position: `relative` }}>
              <Grid templateColumns='1fr 4fr'>
                <Sidebar data={pageData} />
                <Box
                  sx={{
                    backgroundColor: `brand.900`,
                    padding: `2rem`,
                    color: 'white',
                    overflowY: `scroll`,
                    maxHeight: `100vh`,
                  }}
                >
                  <Box sx={{ maxWidth: `800px`, margin: `0 auto` }}>
                    <Heading as='h2' sx={{ fontSize: `3rem` }}>
                      {currentPageData?.title}
                    </Heading>
                    <div className='md-container'>
                      <Markdown remarkPlugins={[gfm]} rehypePlugins={[raw]}>
                        {currentPageContent}
                      </Markdown>
                    </div>
                  </Box>
                </Box>
              </Grid>
            </Box>
            <LogInButton setDataFunction={(d) => setPageData(d)} />
            {/* d for data */}
          </>
        )}
      {typeof currentPageData !== 'undefined' &&
        typeof currentPageContent !== 'undefined' &&
        windowWidth <= 450 && (
          <>
            <Head>
              <title>{`${currentPageData.category} | ${currentPageData.title}`}</title>
            </Head>
            <Box h='100vh' w='100vw' sx={{ position: `relative` }}>
              <Grid templateColumns='1fr'>
                <Box
                  sx={{
                    backgroundColor: `brand.900`,
                    padding: `2rem`,
                    color: 'white',
                    overflowY: `scroll`,
                    maxHeight: `100vh`,
                  }}
                >
                  <Box sx={{ maxWidth: `800px`, margin: `0 auto` }}>
                    <Heading
                      as='h2'
                      sx={{
                        fontSize: `3rem`,
                        marginTop: `3rem`,
                        marginBottom: `1rem`,
                      }}
                    >
                      {currentPageData?.title}
                    </Heading>
                    <div className='md-container'>
                      <Markdown remarkPlugins={[gfm]} rehypePlugins={[raw]}>
                        {currentPageContent}
                      </Markdown>
                    </div>
                  </Box>
                </Box>
              </Grid>
            </Box>
            <LogInButton setDataFunction={(d) => setPageData(d)} />{' '}
            {/* d for data */}
            <MobileSidebar data={pageData} isVisible={isSidebarVisible} />
            <MobileSidebarButton
              onClick={() => setIsSidebarVisible((v) => !v)}
            />
          </>
        )}
    </>
  );
}
