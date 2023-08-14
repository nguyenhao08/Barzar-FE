# Workflow Backend

Backend used **JSON Server**: https://github.com/typicode/json-server#getting-started

## Create new endpoint

 1. Create new file \*.js in direction: database/\*.js
 2. Include \*.js to database/index.js
 3. Re-run server by command line: npm run server
 4. Test new endpoint

###  Example: Create endpoint posts

 1. Create new file database/posts.js

```javascript
module.exports = () => ([
	{
		"id": 1,
		"authorId": "author-1",
		"description": "Description post 1"
	},
	{
		"id": 2,
		"authorId": "author-2",
		"description": "Description post 2"
	},
	{
		"id": 3,
		"authorId": "author-1",
		"description": "Description post 3"
	},
	{
		"id": 4,
		"authorId": "author-2",
		"description": "Description post 4"
	}
]);
```

 2. Include database/posts.json into database/index.js

```javascript
...
const  posts  =  require('./posts.js')();

module.exports  = () => ({
	...
	posts,
});
```

 3. Re-run server: npm run server
 4. Test new endpoint posts:
	- GET: http://localhost:3000/posts -> Get list
	- GET: http://localhost:3000/posts/:id -> Get detail
	- POST: http://localhost:3000/posts
	- PUT: http://localhost:3000/posts/:id
	- DELETE: http://localhost:3000/posts/:id'

**Result of GET list posts:**
```Json
[
  {
    "id": 1,
    "authorId": "author-1",
    "description": "This is the post 1"
  },
  {
    "id": 2,
    "authorId": "author-2",
    "description": "This is the post 2"
  },
  {
    "id": 3,
    "authorId": "author-1",
    "description": "This is the post 3"
  },
  {
    "id": 4,
    "authorId": "author-1",
    "description": "This is the post 4"
  }
]
```

## Custom output of endpoint use middlewares

 1. Define new path in **routes.js**
 2. Create new file middleware in direction: **middleware/\*.middleware.js**
 3. Define method GET, POST, PUT, DELETE of the endpoint
 4. Handle and set expectation of output

### Example: Get author for each post

 1. Create database/authors.js

```javascript
module.exports = () => ([
	{
		"id": "author-1",
		"fullName": "Mr. Author 1"
	},
	{
		"id": "author-2",
		"fullName": "Mr. Author 2"
	}
]);
```

 2. Include database/authors.json into database/index.js

```javascript
...
const  authors  =  require('./authors.js')();

module.exports  = () => ({
	...
	authors,
});
```

 3. Create **middleware/post.middleware.js**

```javascript
module.exports  =  function (server, router) {
  const  db  = router.db; // Assign the lowdb instance

	server.get('/api/admin/posts', (req, res) => {
    const data =  find(db, 'posts');
    res.jsonp({
      status:  200,
      data,
      meta: {
        ...
      }
    });

    function  find(db, collection) {
      const  table  = db.get(collection);
      const  listPosts  = table.value();
      if (listPosts.length  >  0) {
        listPosts.map((post) => {
          const  author  = db.get('authors').find({ id: post.authorId }).value();
          post.author  = author;
          return post;
        });
        return listPosts;
      } else {
        return  undefined
      };
    };
  );
};
```
 4. Test API endpoint of posts

**Result of GET list posts:**
```json
{
  "status": 200,
  "data": [
    {
      "id": 1,
      "authorId": "author-1",
      "description": "This is the post 1",
      "author": {
        "id": "author-1",
        "fullName": "Mr. Author 1"
      }
    },
    {
      "id": 2,
      "authorId": "author-2",
      "description": "This is the post 2",
      "author": {
        "id": "author-2",
        "fullName": "Mr. Author 2"
      }
    },
    {
      "id": 3,
      "authorId": "author-1",
      "description": "This is the post 3",
      "author": {
        "id": "author-1",
        "fullName": "Mr. Author 1"
      }
    },
    {
      "id": 4,
      "authorId": "author-1",
      "description": "This is the post 4",
      "author": {
        "id": "author-1",
        "fullName": "Mr. Author 1"
      }
    }
  ],
  "meta": {
    ...
  }
}
```