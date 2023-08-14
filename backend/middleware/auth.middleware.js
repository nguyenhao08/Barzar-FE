module.exports = function (server, router) {
  const db = router.db; // Assign the lowdb instance

  server.post('/api/login', (req, res) => {
    const data = find(db, 'users', req.body);

    res.status(data.status).jsonp(data);

    function find(db, collection, body) {
      const table = db.get(collection);
      const user = table.find({ email: body.email, password: body.password }).value();

      if (user) {
        const role = db.get('roles').find({ id: user.roleId }).value();
        user.refreshToken = generateRefreshToken();
        return {
          status: 200,
          data: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            refreshToken: user.refresh_token,
            role,
            accessToken: generateAccessToken()
          }
        };
      } else {
        return {
          status: 401,
          errorCode: 'user_not_found',
          data: null,
          message: 'Wrong email or password'
        };
      };
    }
  });

  server.post('/api/register', async (req, res) => {
    const data = await register(db, 'users', req.body);

    res.status(data.status).jsonp(data);

    async function register(db, collection, body) {
      const table = db.get(collection);
      // console.log('db: ', db);
      const users = table.value();

      const { email, password, fullName, role } = body;
      const username = email.split('@');
      const newUser = {
        id: String(users.length + 1),
        username: username[0],
        email,
        password,
        fullName,
        status: 'active',
        refreshToken: `refresh_token_${username[0]}`,
        accessToken: `access_token_${username[0]}`,
        roleId: role ? role : 'user-role'
      };
      users.push(newUser);
      await db.write();

      if (newUser) {
        const role = db.get('roles').find({ id: newUser.roleId }).value();
        newUser.refreshToken = generateRefreshToken();
        return {
          status: 200,
          data: {
            id: newUser.id,
            fullName: newUser.fullName,
            email: newUser.email,
            refreshToken: newUser.refreshToken,
            role,
            accessToken: generateAccessToken()
          }
        };
      } else {
        return {
          status: 404,
          errorCode: 'bad_request',
          data: null,
          message: 'Provide parameter not enough'
        };
      };
    }
  });

  server.post('/api/refresh-token', (req, res) => {
    const data = find(db, 'users', req.body);
    if (data) {
      res.status(200).jsonp({
        code: 200,
        data: data,
        msg: data !== undefined ? 'ok' : 'error',
      });
    } else {
      res.status(401).jsonp({
        code: 401,
        data: data,
        msg: 'error',
      });
    }

    function find(db, collection, body) {
      const table = db.get(collection);
      const user = table.find({ refreshToken: body.refreshToken }).value();
      if (user) {
        user.refreshToken = generateRefreshToken();
        return {
          refreshToken: user.refreshToken,
          accessToken: generateAccessToken(),
        };
      } else {
        return undefined;
      };
    }
  });

  function generateAccessToken() {
    // create token that expires in 15 minutes
    const tokenPayload = {
      exp: Math.round(new Date(Date.now() + 2 * 60 * 1000).getTime() / 1000),
    };
    return `fake-access-token.${Buffer.from(JSON.stringify(tokenPayload)).toString('base64')}`;
  };

  function generateRefreshToken() {
    const tokenPayload = {
      exp: Math.round(new Date(Date.now() + 3 * 60 * 1000).getTime() / 1000),
    };
    return `fake-refresh-token.${Buffer.from(JSON.stringify(tokenPayload)).toString('base64')}`;
  };
};
