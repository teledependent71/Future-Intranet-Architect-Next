import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import authorsResource from '../resources/authors'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Future Intranet Architect</title>
          <meta
            property="og:title"
            content="test-page - Future Intranet Architect"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_bko2ki) => (
            <>
              <h1 id={context_bko2ki?.Name}>Heading</h1>
            </>
          )}
          initialData={props.contextBko2kiProp}
          persistDataDuringLoading={true}
          key={props?.contextBko2kiProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextBko2kiProp = await authorsResource({
      ...context?.params,
    })
    return {
      props: {
        contextBko2kiProp: contextBko2kiProp?.data?.[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
