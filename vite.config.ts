import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remixCloudflareDevProxy(),
    remix({
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "home/HomePage.tsx", { index: true });
          route("/about", "about/AboutPage.tsx");
          route("/products", "products/ProductsPage.tsx", { index: true });
          route("/products/:product", "products/ProductDetailPage.tsx");
          // route("about", "about/route.tsx");
          // route("concerts", "concerts/layout.tsx", () => {
          //   route("", "concerts/home.tsx", { index: true });
          //   route("trending", "concerts/trending.tsx");
          //   route(":city", "concerts/city.tsx");
          // });
        });
      },
    }),
    tsconfigPaths(),
  ],
});
