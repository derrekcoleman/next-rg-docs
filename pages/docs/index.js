import { useState, useEffect } from 'react';
import { Sidebar, MobileSidebar } from '../../components/PageWrapper';
import LogInButton from '../../components/LogIn';
import { MobileSidebarButton } from '../../components/MobileSidebarButton';
import { Center, Heading, Box, VStack, Grid } from '@chakra-ui/react';

export default function Page() {
  const [pageData, setPageData] = useState();
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    const width = window?.innerWidth;
    setWindowWidth(width);
    const getData = async () => {
      if (!window?.sessionStorage.getItem('publicData')) {
        const response = await fetch(`https://next-rg-docs.vercel.app/api/getPublicDocs`); // returns 'localhost' locally
        const resJson = await response.json();
        const stringifiedPublicData = JSON.stringify(resJson.data);
        window.sessionStorage.setItem('publicData', stringifiedPublicData);
        setPageData(resJson.data);
      }
      if (window?.sessionStorage.getItem('publicData')) {
        const stringifiedPublicData = window.sessionStorage.getItem(
          'publicData',
        );
        const publicData = JSON.parse(stringifiedPublicData);
        setPageData(publicData);
      }
    };
    getData();
  }, []);

  // Set current page to the first item in the PageData array
  useEffect(() => {
    if (typeof pageData !== 'undefined') {
      const publicCategories = Object.keys(pageData);
      console.log(publicCategories);
    }
  }, [pageData]);

  return (
    <>
      {typeof pageData !== 'undefined' && windowWidth > 450 && (
        <>
          <Box
            h='100vh'
            w='100vw'
            overflow='hidden'
            sx={{ position: `relative` }}
          >
            <Grid templateColumns='1fr 4fr'>
              <Sidebar data={pageData} />
              <Center
                bg='brand.900'
                h='100%'
                w='100%'
                color='brand.500'
                sx={{ userSelect: 'none' }}
              >
                <VStack align='center' spacing='3rem' sx={{ zIndex: `2` }}>
                  <Heading
                    as='h1'
                    size='3xl'
                    sx={{ textAlign: `center`, textShadow: `0px 4px black` }}
                  >
                    This is a documentation index page.
                  </Heading>
                  <Heading
                    as='h2'
                    size='xl'
                    sx={{ textAlign: `center`, textShadow: `0px 4px black` }}
                  >
                    Use the sidebar to select a doc and start reading.
                  </Heading>
                </VStack>
              </Center>
            </Grid>
          </Box>
          <LogInButton setDataFunction={(d) => setPageData(d)} />{' '}
          {/* d for data */}
        </>
      )}
      {typeof pageData !== 'undefined' && windowWidth <= 450 && (
        <>
          <Box
            h='100vh'
            w='100vw'
            overflow='hidden'
            sx={{ position: `relative` }}
          >
            <Grid templateColumns='1fr 4fr'>
              <Sidebar data={pageData} />
              <Center
                bg='brand.900'
                h='100%'
                w='100%'
                color='brand.500'
                sx={{ userSelect: 'none' }}
              >
                <VStack align='center' spacing='3rem' sx={{ zIndex: `2` }}>
                  <Heading
                    as='h1'
                    size='3xl'
                    sx={{ textAlign: `center`, textShadow: `0px 4px black` }}
                  >
                    This is a documentation index page.
                  </Heading>
                  <Heading
                    as='h2'
                    size='xl'
                    sx={{ textAlign: `center`, textShadow: `0px 4px black` }}
                  >
                    Use the sidebar to select a doc and start reading.
                  </Heading>
                </VStack>
              </Center>
            </Grid>
          </Box>
          <LogInButton setDataFunction={(d) => setPageData(d)} />{' '}
          {/* d for data */}
          <MobileSidebar data={pageData} isVisible={isSidebarVisible} />
          <MobileSidebarButton onClick={() => setIsSidebarVisible((v) => !v)} />
        </>
      )}
    </>
  );
}
