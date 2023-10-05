import jsph from '@/components/gen-json-sources/jsph';
import omdb from '@/components/gen-json-sources/omdb';
import ram from '@/components/gen-json-sources/ram';

import Error from 'next/error';

import { useRouter } from 'next/router';
import MainJsonSource from '../../components/gen-json-sources';

export default function JsonTablePage() {
  const
    router = useRouter(),
    { query: { slug } } = router,
    config = ({ jsph, omdb, ram })[slug];
  if (config)
    return <MainJsonSource key={slug} config={config} />;
  return <Error statusCode={'wrong way'}/>;
}