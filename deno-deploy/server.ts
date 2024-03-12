import {
  Application,
  //Middleware,
  Router,
  //Status,
} from "https://deno.land/x/oak@v12.6.1/mod.ts";
//import { createHttpError } from "https://deno.land/std@0.201.0/http/http_errors.ts";
//import secureCompare from "https://deno.land/x/secure_compare@1.0.0/mod.ts";

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication

// type Username = string;
// type Password = string;
// type Users = Record<Username, Password>;

// const unauthorizedError = createHttpError(Status.Unauthorized, "Unauthorized", {
//   headers: {
//     "WWW-Authenticate": "Basic",
//   },
// });

// const basicAuthMiddleware = (users: Users): Middleware => {
//   return async (context, next) => {
//     const authHeader = context.request.headers.get("Authorization");
//     if (authHeader === null) throw unauthorizedError;
//     const authHeaderMatch = authHeader.match(/^Basic (.+)/);
//     const credentials = authHeaderMatch?.[1];
//     if (credentials) {
//       const decodedCredentials = atob(credentials);
//       const separatorIndex = decodedCredentials.indexOf(":");
//       const name = decodedCredentials.slice(0, separatorIndex);
//       const password = decodedCredentials.slice(
//         separatorIndex + 1,
//         decodedCredentials.length,
//       );
//       if (secureCompare(users[name], password)) {
//         await next();
//       } else {
//         throw unauthorizedError;
//       }
//     } else {
//       throw unauthorizedError;
//     }
//   };
// };

const app = new Application();

// First we try to serve static files from the root folder. If that fails, we
// fall through to the router below.
app.use(async (ctx, next) => {
  try {
    await ctx.send({
      // npm run deno-deploy creates all output in `deno-deploy/dist` but
      // .github/workflows/deploy.yml sets the root to deno-deploy and that's
      // why `root` is ${Deno.cwd()}/dist (Deno.cwd() resolves to `deno-deploy`)
      root: `${Deno.cwd()}/dist`,
      index: "index.html",
    });
  } catch {
    next();
  }
});

const router = new Router();

// The /api/time endpoint returns the current time in ISO format.
router.get("/api/time", (ctx) => {
  ctx.response.body = { time: new Date().toISOString() };
});

// After creating the router, we can add it to the app.
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
