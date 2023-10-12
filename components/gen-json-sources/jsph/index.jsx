import toast from 'react-hot-toast';
const
  API_URL = 'https://jsonplaceholder.typicode.com/users',
  config = {
    API_URL,
    columns: [
      { title: 'ID', getVal: obj => obj.id },
      { title: 'Name', getVal: ({ name }) => name, setVal: name => ({ name }) },
      { title: 'Email', getVal: ({ email }) => email, setVal: email => ({ email }) },
      { title: 'Address', getVal: ({ address: { street, suite, city } }) => `${city}, ${street} ${suite}`, },
      { title: 'Website', getVal: ({ website }) => website, setVal: website => ({ website }) },
      { title: 'Phone number', getVal: ({ phone }) => phone },
    ],
    genObj() { return { id: Math.random(), address: {} }; },
    async fetcher() {
      const
        promise = fetch(API_URL);
      toast.promise(promise, {
        loading: 'jsph fetcher',
        success: 'ok',
        error: (err) => `This just happened: ${err.toString()}`
      }, { position: 'top-rigth' });
      const
        response = await promise;
      if (!response.ok) throw new Error('fetch ' + response.status);
      return await response.json();
    }
  };

export default config;