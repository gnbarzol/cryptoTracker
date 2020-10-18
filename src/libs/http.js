class Http {
  static instance = new Http();

  get = async (url) => {
    try {
      let req = await fetch(url);
      let json = await req.json();
      return json;
    } catch (err) {
      console.log('http get method err', err);
      throw new Error(err);
    }
  };

  post = async (url, body) => {
    try {
      let req = await fetch(url, {
        method: 'POST',
        body,
      });
      let json = req.json();
      return json;
    } catch (err) {
      console.log('http post method err', err);
      throw new Error(err);
    }
  };

  delete = async (url, id) => {
    try {
      const req = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });
      const json = req.json();
      return json;
    } catch (err) {
      console.log('http delete method err', err);
      throw new Error(err);
    }
  };

  put = async (url, id, body) => {
    try {
      const req = await fetch(`${url}/${id}`, {
        method: 'PUT',
        body,
      });
      const json = req.json();
      return json;
    } catch (err) {
      console.log('http put method err', err);
      throw new Error(err);
    }
  };
}

export default Http;
