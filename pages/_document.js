import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#32899e" />
        <meta
          name="description"
          content="Create and share your opinions and polls with images on this app. Choose your privacy settings and share your polls with friends."
        />
        <meta
          name="keywords"
          content="opinions, polls, images, privacy, sharing"
        />
        <meta property="og:title" content="Opinion & Poll App" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.example.com/" />
        <meta
          property="og:image"
          content="https://www.example.com/images/opinion-poll-app.jpg"
        />
        <meta
          property="og:description"
          content="Create and share your opinions and polls with images on this app. Choose your privacy settings and share your polls with friends."
        />
        <meta property="og:site_name" content="PollDoh" />
        <meta name="twitter:title" content="PollDoh" />
        <meta
          name="twitter:description"
          content="Create and share your opinions and polls with images on this app. Choose your privacy settings and share your polls with friends."
        />
        <meta
          name="twitter:image"
          content="https://polldoh.vercel.app/android-chrome-512x512.png"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
