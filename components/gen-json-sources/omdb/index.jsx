const
  API_URL = 'https://www.omdbapi.com/?apikey=a2b07930&s=green',
  config = {
    API_URL,
    columns: [
      { title: 'Id', getVal: ({ id }) => id },
      { title: 'Title', getVal: obj => obj.Title },
      { title: 'Year', getVal: ({ Year }) => Year },
      { title: 'Poster', getVal: ({ Poster }) => <img src={Poster} alt={name} /> },
    ],
    genObj() { return { id: Math.random() }; },
    async fetcher() {
      const
        response = await fetch(API_URL);
      if (!response.ok) throw new Error('fetch ' + response.status);
      return (await response.json()).Search.map(obj => Object.assign(obj, { id: obj.imdbID }));
    }
  };

export default config;