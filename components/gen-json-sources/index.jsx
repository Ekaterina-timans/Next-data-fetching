import { useState } from 'react';
import GenFetcher from './GenFetcher';
import GenTable from './GenTable';

export default function MainJsonSource({config: {fetcher, columns}}){
    const
        [data, setData] = useState(null);

    return <>
        <GenFetcher fetcher={fetcher} onLoadCallback={setData}>
            <GenTable data={data} columns={columns}/>
        </GenFetcher>
    </>
}