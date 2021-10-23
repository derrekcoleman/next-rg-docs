import { loadComponents } from 'next/dist/server/load-components';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Sidebar, NormalTwoArgFunction } from '../components/Sidebar';

export default function renderTest() {
  /**
   * getData is an async function to
   * a) check status of the user's current metamask/web3 provider address
   * b) compare that to a dictionary of DAO member address
   * c) if the current web3 provider address matches,
   * d) call an API that returns something.
   *
   * @returns A secure result from the server
   */
  const getData = async () => {
    // store an anonymous asynchronous function into a variable called getData;
    // getData is *just* a variable, to trigger it we need to call await getData(); inside of another async function
    // membership = getMember();
    const membership = true;
    let body = { membership };
    body = JSON.stringify(body);

    let myHeaders = new Headers();
    const myInit = {
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
      body,
      membership: true,
    };
    const url = '/api/test';
    const response = await fetch(url, myInit);
    const resJson = await response.json();

    // console.log(resJson);
    return resJson;
  };

  const [pageData, setPageData] = useState();

  useEffect(async () => {
    const returnedData = await getData();
    setPageData(returnedData.msg);
  }, []);

  const objectToBeStored = {
    markdown: {
      slug: '# hello World',
    },
  };

  return (
    <div className='page-container'>
      <Sidebar
        Links={{
          link1: {
            name: 'Getting Started',
            href: '/getting-started',
          },
          link2: {
            name: 'SDK',
            href: '/sdk',
          },
        }}
      />
      <div>
        <ReactMarkdown children={pageData} remarkPlugins={[remarkGfm]} />
      </div>
    </div>
  );
}
