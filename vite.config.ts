import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		external: ["reflect-metadata"],
	},
	esbuild: {
		keepNames: true, // typeorm migrations require timestamp in their names and this way it can be defined with name property
	},
	build: {
		commonjsOptions: {
			transformMixedEsModules: true, // https://github.com/rollup/plugins/tree/master/packages/commonjs#transformmixedesmodules
		},
	},
});
