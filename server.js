// const Koa = require("koa");
// const server = new Koa();
// server.use(async ctx => (ctx.body = "Hello Koa App")) // ctx is a koa object that contants all the context from our app
// server.listen(3000, () => console.log("Server running on localhost 3000"));

// 1st bring in all installed dependencies.
require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const koaBody = require('koa-body')

dotenv.config();
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy'); // Koa Shopify GraphQL proxy: helps us serve up the GraphQL objects or data from the shopify API through our server and into our frontend.
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');


const port = parseInt(process.env.PORT, 10) || 3000; // 2nd create variable port that checks if we have something in the process env called port or it's gonna be port 3000.
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

// bring keys from process.env
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

const server = new Koa(); // create server
const router = new KoaRouter();

var products = [];

router.get('/api/products', async (ctx) => {
  try {
    ctx.body = {
      status: 'success',
      data: products
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/api/products', koaBody(), async (ctx) => {
  try {
    const body = ctx.request.body;
    await products.push(body)
    ctx.body = "Item Added"
  } catch (error) {
    console.log(error)
  }
})

router.delete('/api/products', koaBody(), async (ctx) => {
  try {
    products = [];
    ctx.body = "All items deleted!"
  } catch (error) {
    console.log(error)
  }
})

// Router Middleware
server.use(router.allowedMethods());
server.use(router.routes());

app.prepare().then(() => {
  
  
  server.use(session({ sameSite: 'none', secure: true }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY]; // pass keys

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: [
        'read_products',
        'write_products',
        'read_script_tags',
        'write_script_tags'
      ], // when the user loads the shop they are gonna be requesting whatever we havehere. Scopes that we're gonna be using, not more, we don't want to ask for more permission that we need.
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set('shopOrigin', shop, { // set some cookies for the ctx. Shop is basically the shop URL and we get it from our ctx.session.
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });
        ctx.redirect('/');
      },
    }),
  );

  server.use(graphQLProxy({ version: ApiVersion.October19 })) // we need to constantly update it
  server.use(verifyRequest());

  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });

});