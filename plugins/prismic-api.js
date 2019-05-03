import Prismic from "prismic-javascript"

export default async ({ app, req, env }, inject) => {
  // Set the function directly on the context.app object
  app.api = await Prismic.getApi("https://ramkumarshankar.cdn.prismic.io/api/v2", {
    accessToken: env.API_ACCESS_KEY
    }, {req})
}