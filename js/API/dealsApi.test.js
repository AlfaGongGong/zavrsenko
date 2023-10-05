const request = require("supertest");
const app = require("./dealsApi") ;

describe("dealsApi", () => {
  it("should fetch and insert data", async () => {
    await request(app).get("/fetchAndInsertData");
  });
});

  


  





- routes/
  - .js
  - .js
  - .js
 
  - .js
