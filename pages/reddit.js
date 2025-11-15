import Head from 'next/head';
import RedditImageFetcher from '../components/RedditImageFetcher';

export default function RedditPage() {
  return (
    <>
      <Head>
        <title>Reddit Image Fetcher | Overlay Banner Generator</title>
        <meta name="description" content="Extract and process images from Reddit posts with custom overlay designs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <RedditImageFetcher />
      </main>
    </>
  );
}
