import { useState } from 'react';
import GenFetcher from './GenFetcher';
import GenTable from './GenTable';

export default function MainJsonSource({config: {fetcher, columns}}){
    const
        [data, setData] = useState(null),
        [filterStr, setFilterStr] = useState(''),
        [sortByColumnN, setSortByColumnN] = useState(null),
        filteredData = filterStr
            ? data?.filter(el => columns.map(({ getVal }) => getVal(el))
            .filter(x => 'string' === typeof x)
            .some(x => x.toLowerCase().includes(filterStr.toLowerCase())))
            : data,
        getVal = columns[Math.abs(sortByColumnN) - 1]?.getVal || (() => null),
        sortData = sortByColumnN
            ? data.toSorted((a, b) => 'string' === typeof getVal(a) ? Math.sign(sortByColumnN) * getVal(a).localeCompare(getVal(b)) : 1)
            : filteredData,
        columnsWithButtons = columns.concat({
            title: 'actions', getVal: ({ id }) => <>
              <button data-id={id} data-action='info'>ℹ️</button>
              <button data-id={id} data-action='edit'>✏️</button>
              <button data-id={id} data-action='del'>❌</button>
            </>
        });

        function onClick(evt) {
            const
              source = evt.target.closest('button[data-action][data-id]');
              if (source) {
                const { id, action } = source.dataset;
                switch (action) {
                  case 'del':
                    setData(old => old.filter(el => String(el.id) !== id));
                  //   // fetch(API_URL+id,{method:'DELETE'});
                    return;
                  case 'edit':
                    // eslint-disable-next-line no-case-declarations
                    const index = data.findIndex(obj => id === String(obj.id));
                    setValues(columns.map(({ getVal }) => getVal(data[index])));
                    setEditedId(id);
                    return;
                  case 'cancel':
                    setEditedId(null);
                    setValues(columns.map(() => '_'));
                    return;
                }
            }
            const
                th = evt.target.closest('thead th');
            if (th) {
                const newSortN = (Math.abs(sortByColumnN) === 1 + th.cellIndex)
                    ? -sortByColumnN
                    : 1 + th.cellIndex;
                setSortByColumnN(newSortN);          
            }

    return <div onClick={onClick}>
        <input value={filterStr} onInput={evt => setFilterStr(evt.target.value)} />
        <GenFetcher fetcher={fetcher} onLoadCallback={setData}>
            <GenTable data={sortData} columns={columnsWithButtons} sortByColumnN={sortByColumnN}/>
        </GenFetcher>
    </div>
}