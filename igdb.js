
/*headers: {
      'Client-ID': 'mifl6yw1q4jbqihyorrg582h20jxxj',
      'Authorization': 'Bearer zo2y1x8g4x7j5v250kg31op39ei4ht'
}*/

fetch('http://localhost:3000/api/v1/games', {
      method: 'POST',
      headers: {
            'Accept': 'application/json',
            'Client-ID': 'mifl6yw1q4jbqihyorrg582h20jxxj',
            'Authorization': 'Bearer zo2y1x8g4x7j5v250kg31op39ei4ht'
      },
      body: "fields checksum,created_at,games,name,slug,updated_at,url;"
})
      .then(response => {

            return response.json();
            console.log(response.json());
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.type);
            console.log(response.url);
            console.log(response.ok);
            console.log(response.redirected);
            console.log(response.status);
      })
      .catch(err => {
            console.error(err);
            console.log(err.message);

      });
console.log(response);
console.log(response.json());
console.log(response.status);
