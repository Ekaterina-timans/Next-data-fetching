const
  API_URL = 'https://rickandmortyapi.com/api/character/?page=1',
  config = {
    API_URL,
    columns: [
      { title: 'ID', getVal: obj => obj.id },
      { title: 'Name', getVal: obj => obj.name },
      { title: 'Image', getVal: ({ image, name }) => <img src={image} alt={name} /> },
      { title: 'Status', getVal: ({ status }) => status },
    ],
    genObj() { return { id: Math.random() }; },
    async fetcher() {
      const
        response = await fetch(API_URL);
      if (!response.ok) throw new Error('fetch ' + response.status);
      return (await response.json()).results;
    }
  };
export default config;