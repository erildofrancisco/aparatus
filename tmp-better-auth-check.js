const {
  createAuthClient,
} = require("./node_modules/better-auth/dist/client/index.cjs");
const c = createAuthClient({ baseURL: "http://localhost" });
console.log(JSON.stringify(Object.keys(c).sort()));
console.log("signOut", typeof c.signOut);
console.log("getSession", typeof c.getSession);
console.log("useSession", typeof c.useSession);
