const get = resource =>
  new Promise((resolve, reject) => {
    fetch(resource)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

const post = (resource, object_body) =>
  new Promise((resolve, reject) => {
    fetch(resource, {
      method: "POST",
      body: JSON.stringify(object_body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

export { get as getAPI, post as postAPI };
