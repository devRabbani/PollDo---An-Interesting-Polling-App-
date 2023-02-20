import Nav from '@/components/Nav'
import PrivateRoute from '@/components/PrivateRoute'
import AuthContextProvider from '@/context/AuthContext'
import PollsContextProvider from '@/context/PollsContext'
import '@/styles/globals.css'
import '@/styles/nprogress.css'

import { Dosis } from '@next/font/google'
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

const dosis = Dosis({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  // Router
  const { pathname } = useRouter()

  useEffect(() => {
    const handleStart = () => nProgress.start()
    const handleStop = () => nProgress.done()

    Router.events.on('routeChangeStart', handleStart)
    Router.events.on('routeChangeComplete', handleStop)
    Router.events.on('routeChangeError', handleStop)

    return () => {
      Router.events.off('routeChangeStart', handleStart)
      Router.events.off('routeChangeComplete', handleStop)
      Router.events.off('routeChangeError', handleStop)
    }
  }, [])

  useEffect(() => {
    console.log(
      '%cCan%cWeBe!',
      'color: #e47e24; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;',
      'color: #fff; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;'
    )
    console.log(
      '%cHey explorer!, Are you lost?? Because this is not the right place for you. If you want to work with us at CanWeBe contact us now.',
      'color: #e1e1e1; font-size: 1.5em;'
    )
  }, [])

  return (
    <>
      <Head>
        <title>PollDoh</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <main className={dosis.className}>
        <AuthContextProvider>
          <Nav />
          <PollsContextProvider>
            {pathname === '/mypolls' || pathname === '/create' ? (
              <PrivateRoute>
                <Component {...pageProps} />
              </PrivateRoute>
            ) : (
              <Component {...pageProps} />
            )}
          </PollsContextProvider>
        </AuthContextProvider>
        <Toaster
          toastOptions={{
            style: {
              fontSize: '1.7rem',
            },
          }}
        />
      </main>
    </>
  )
}
