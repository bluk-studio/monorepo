import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"/favicon.png\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t<div id=\"svelte\">" + body + "</div>\n\t</body>\n</html>";

let options = null;

const default_settings = { paths: {"base":"","assets":"/."} };

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings = default_settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: "/./_app/start-0210123d.js",
			css: ["/./_app/assets/start-0826e215.css","/./_app/assets/vendor-7fec0a11.css"],
			js: ["/./_app/start-0210123d.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/singletons-bb9012b7.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => "/./_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: error => {
			console.error(error.stack);
			error.stack = options.get_stack(error);
		},
		hooks: get_hooks(user_hooks),
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		read: settings.read,
		root,
		service_worker: null,
		router: true,
		ssr: true,
		target: "#svelte",
		template,
		trailing_slash: "never"
	};
}

const d = decodeURIComponent;
const empty = () => ({});

const manifest = {
	assets: [{"file":"favicon.png","size":1571,"type":"image/png"},{"file":"logotypes/bluk-studio-black.svg","size":66505,"type":"image/svg+xml"},{"file":"logotypes/odzi-dog-small-black.svg","size":1881,"type":"image/svg+xml"}],
	layout: "src/routes/__layout.svelte",
	error: ".svelte-kit/build/components/error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/login\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/login/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/app\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/app/__layout.svelte", "src/routes/app/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/app\/selector\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/app/__layout.svelte", "src/routes/app/selector/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/app\/create\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/app/__layout.svelte", "src/routes/app/create/__layout.svelte", "src/routes/app/create/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/app\/create\/information\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/app/__layout.svelte", "src/routes/app/create/__layout.svelte", "src/routes/app/create/information.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/app\/create\/members\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/app/__layout.svelte", "src/routes/app/create/__layout.svelte", "src/routes/app/create/members.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/app\/create\/finish\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/app/__layout.svelte", "src/routes/app/create/__layout.svelte", "src/routes/app/create/finish.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/app\/create\/plan\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/app/__layout.svelte", "src/routes/app/create/__layout.svelte", "src/routes/app/create/plan.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/app\/([^/]+?)\/?$/,
						params: (m) => ({ projectId: d(m[1])}),
						a: ["src/routes/__layout.svelte", "src/routes/app/__layout.svelte", "src/routes/app/[projectId]/__layout.svelte", "src/routes/app/[projectId]/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/app\/([^/]+?)\/dashboard\/?$/,
						params: (m) => ({ projectId: d(m[1])}),
						a: ["src/routes/__layout.svelte", "src/routes/app/__layout.svelte", "src/routes/app/[projectId]/__layout.svelte", "src/routes/app/[projectId]/dashboard.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/app\/([^/]+?)\/settings\/?$/,
						params: (m) => ({ projectId: d(m[1])}),
						a: ["src/routes/__layout.svelte", "src/routes/app/__layout.svelte", "src/routes/app/[projectId]/__layout.svelte", "src/routes/app/[projectId]/settings/__layout.svelte", "src/routes/app/[projectId]/settings/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/app\/([^/]+?)\/settings\/general\/?$/,
						params: (m) => ({ projectId: d(m[1])}),
						a: ["src/routes/__layout.svelte", "src/routes/app/__layout.svelte", "src/routes/app/[projectId]/__layout.svelte", "src/routes/app/[projectId]/settings/__layout.svelte", "src/routes/app/[projectId]/settings/general.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/app\/([^/]+?)\/settings\/danger\/?$/,
						params: (m) => ({ projectId: d(m[1])}),
						a: ["src/routes/__layout.svelte", "src/routes/app/__layout.svelte", "src/routes/app/[projectId]/__layout.svelte", "src/routes/app/[projectId]/settings/__layout.svelte", "src/routes/app/[projectId]/settings/danger.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/app\/([^/]+?)\/settings\/tiles\/?$/,
						params: (m) => ({ projectId: d(m[1])}),
						a: ["src/routes/__layout.svelte", "src/routes/app/__layout.svelte", "src/routes/app/[projectId]/__layout.svelte", "src/routes/app/[projectId]/settings/__layout.svelte", "src/routes/app/[projectId]/settings/tiles.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/app\/([^/]+?)\/editor\/?$/,
						params: (m) => ({ projectId: d(m[1])}),
						a: ["src/routes/__layout.svelte", "src/routes/app/__layout.svelte", "src/routes/app/[projectId]/__layout.svelte", "src/routes/app/[projectId]/editor/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/app\/([^/]+?)\/editor\/explorer\/?$/,
						params: (m) => ({ projectId: d(m[1])}),
						a: ["src/routes/__layout.svelte", "src/routes/app/__layout.svelte", "src/routes/app/[projectId]/__layout.svelte", "src/routes/app/[projectId]/editor/explorer.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, resolve }) => resolve(request)),
	serverFetch: hooks.serverFetch || fetch
});

const module_lookup = {
	"src/routes/__layout.svelte": () => import("../../src/routes/__layout.svelte"),".svelte-kit/build/components/error.svelte": () => import("./components/error.svelte"),"src/routes/index.svelte": () => import("../../src/routes/index.svelte"),"src/routes/login/index.svelte": () => import("../../src/routes/login/index.svelte"),"src/routes/app/__layout.svelte": () => import("../../src/routes/app/__layout.svelte"),"src/routes/app/index.svelte": () => import("../../src/routes/app/index.svelte"),"src/routes/app/selector/index.svelte": () => import("../../src/routes/app/selector/index.svelte"),"src/routes/app/create/__layout.svelte": () => import("../../src/routes/app/create/__layout.svelte"),"src/routes/app/create/index.svelte": () => import("../../src/routes/app/create/index.svelte"),"src/routes/app/create/information.svelte": () => import("../../src/routes/app/create/information.svelte"),"src/routes/app/create/members.svelte": () => import("../../src/routes/app/create/members.svelte"),"src/routes/app/create/finish.svelte": () => import("../../src/routes/app/create/finish.svelte"),"src/routes/app/create/plan.svelte": () => import("../../src/routes/app/create/plan.svelte"),"src/routes/app/[projectId]/__layout.svelte": () => import("../../src/routes/app/[projectId]/__layout.svelte"),"src/routes/app/[projectId]/index.svelte": () => import("../../src/routes/app/[projectId]/index.svelte"),"src/routes/app/[projectId]/dashboard.svelte": () => import("../../src/routes/app/[projectId]/dashboard.svelte"),"src/routes/app/[projectId]/settings/__layout.svelte": () => import("../../src/routes/app/[projectId]/settings/__layout.svelte"),"src/routes/app/[projectId]/settings/index.svelte": () => import("../../src/routes/app/[projectId]/settings/index.svelte"),"src/routes/app/[projectId]/settings/general.svelte": () => import("../../src/routes/app/[projectId]/settings/general.svelte"),"src/routes/app/[projectId]/settings/danger.svelte": () => import("../../src/routes/app/[projectId]/settings/danger.svelte"),"src/routes/app/[projectId]/settings/tiles.svelte": () => import("../../src/routes/app/[projectId]/settings/tiles.svelte"),"src/routes/app/[projectId]/editor/index.svelte": () => import("../../src/routes/app/[projectId]/editor/index.svelte"),"src/routes/app/[projectId]/editor/explorer.svelte": () => import("../../src/routes/app/[projectId]/editor/explorer.svelte")
};

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"/./_app/pages/__layout.svelte-784941f1.js","css":["/./_app/assets/pages/__layout.svelte-d86d1d7a.css","/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/__layout.svelte-784941f1.js","/./_app/chunks/vendor-adcc401c.js"],"styles":null},".svelte-kit/build/components/error.svelte":{"entry":"/./_app/error.svelte-c8f673b2.js","css":["/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/error.svelte-c8f673b2.js","/./_app/chunks/vendor-adcc401c.js"],"styles":null},"src/routes/index.svelte":{"entry":"/./_app/pages/index.svelte-1999c8a6.js","css":["/./_app/assets/RadialSpinner.svelte_svelte&type=style&lang-a3277522.css","/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/index.svelte-1999c8a6.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/navigation-20968cc5.js","/./_app/chunks/singletons-bb9012b7.js","/./_app/chunks/SimpleIcon-9bf6c4b5.js","/./_app/chunks/AvailablePages.store-4be7f7f6.js"],"styles":null},"src/routes/login/index.svelte":{"entry":"/./_app/pages/login/index.svelte-fba1cb5b.js","css":["/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/login/index.svelte-fba1cb5b.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/stores-e9c66975.js","/./_app/chunks/navigation-20968cc5.js","/./_app/chunks/singletons-bb9012b7.js","/./_app/chunks/AvailablePages.store-4be7f7f6.js","/./_app/chunks/CurrentProfile.store-6e386cb1.js"],"styles":null},"src/routes/app/__layout.svelte":{"entry":"/./_app/pages/app/__layout.svelte-76f4a136.js","css":["/./_app/assets/RadialSpinner.svelte_svelte&type=style&lang-a3277522.css","/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/__layout.svelte-76f4a136.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/navigation-20968cc5.js","/./_app/chunks/singletons-bb9012b7.js","/./_app/chunks/stores-e9c66975.js","/./_app/chunks/AvailablePages.store-4be7f7f6.js","/./_app/chunks/CurrentProfile.store-6e386cb1.js","/./_app/chunks/SimpleIcon-9bf6c4b5.js","/./_app/chunks/RadialSpinner-87915e8f.js"],"styles":null},"src/routes/app/index.svelte":{"entry":"/./_app/pages/app/index.svelte-02403512.js","css":["/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/index.svelte-02403512.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/navigation-20968cc5.js","/./_app/chunks/singletons-bb9012b7.js"],"styles":null},"src/routes/app/selector/index.svelte":{"entry":"/./_app/pages/app/selector/index.svelte-27be8fc6.js","css":["/./_app/assets/RadialSpinner.svelte_svelte&type=style&lang-a3277522.css","/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/selector/index.svelte-27be8fc6.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/SimpleIcon-9bf6c4b5.js","/./_app/chunks/navigation-20968cc5.js","/./_app/chunks/singletons-bb9012b7.js","/./_app/chunks/AvailablePages.store-4be7f7f6.js","/./_app/chunks/RadialSpinner-87915e8f.js"],"styles":null},"src/routes/app/create/__layout.svelte":{"entry":"/./_app/pages/app/create/__layout.svelte-1f3fd889.js","css":["/./_app/assets/RadialSpinner.svelte_svelte&type=style&lang-a3277522.css","/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/create/__layout.svelte-1f3fd889.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/stores-e9c66975.js","/./_app/chunks/navigation-20968cc5.js","/./_app/chunks/singletons-bb9012b7.js","/./_app/chunks/AvailablePages.store-4be7f7f6.js","/./_app/chunks/RadialSpinner-87915e8f.js"],"styles":null},"src/routes/app/create/index.svelte":{"entry":"/./_app/pages/app/create/index.svelte-0dcfbfa4.js","css":["/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/create/index.svelte-0dcfbfa4.js","/./_app/chunks/vendor-adcc401c.js"],"styles":null},"src/routes/app/create/information.svelte":{"entry":"/./_app/pages/app/create/information.svelte-22107c07.js","css":["/./_app/assets/RadialSpinner.svelte_svelte&type=style&lang-a3277522.css","/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/create/information.svelte-22107c07.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/navigation-20968cc5.js","/./_app/chunks/singletons-bb9012b7.js","/./_app/chunks/AvailablePages.store-4be7f7f6.js","/./_app/chunks/CreateProject.store-664e8fcf.js","/./_app/chunks/NamedProjectProperties.config-8de7d006.js","/./_app/chunks/SimpleIcon-9bf6c4b5.js"],"styles":null},"src/routes/app/create/members.svelte":{"entry":"/./_app/pages/app/create/members.svelte-ae8832ff.js","css":["/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/create/members.svelte-ae8832ff.js","/./_app/chunks/vendor-adcc401c.js"],"styles":null},"src/routes/app/create/finish.svelte":{"entry":"/./_app/pages/app/create/finish.svelte-77644825.js","css":["/./_app/assets/RadialSpinner.svelte_svelte&type=style&lang-a3277522.css","/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/create/finish.svelte-77644825.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/AvailablePages.store-4be7f7f6.js","/./_app/chunks/CreateProject.store-664e8fcf.js","/./_app/chunks/NamedProjectProperties.config-8de7d006.js","/./_app/chunks/ProjectPlans.config-cf92942c.js","/./_app/chunks/navigation-20968cc5.js","/./_app/chunks/singletons-bb9012b7.js","/./_app/chunks/SimpleIcon-9bf6c4b5.js","/./_app/chunks/RadialSpinner-87915e8f.js"],"styles":null},"src/routes/app/create/plan.svelte":{"entry":"/./_app/pages/app/create/plan.svelte-10f3e07b.js","css":["/./_app/assets/RadialSpinner.svelte_svelte&type=style&lang-a3277522.css","/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/create/plan.svelte-10f3e07b.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/SimpleIcon-9bf6c4b5.js","/./_app/chunks/navigation-20968cc5.js","/./_app/chunks/singletons-bb9012b7.js","/./_app/chunks/AvailablePages.store-4be7f7f6.js","/./_app/chunks/CreateProject.store-664e8fcf.js","/./_app/chunks/ProjectPlans.config-cf92942c.js"],"styles":null},"src/routes/app/[projectId]/__layout.svelte":{"entry":"/./_app/pages/app/[projectId]/__layout.svelte-211123e3.js","css":["/./_app/assets/RadialSpinner.svelte_svelte&type=style&lang-a3277522.css","/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/[projectId]/__layout.svelte-211123e3.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/stores-e9c66975.js","/./_app/chunks/AvailablePages.store-4be7f7f6.js","/./_app/chunks/CurrentProfile.store-6e386cb1.js","/./_app/chunks/RadialSpinner-87915e8f.js"],"styles":null},"src/routes/app/[projectId]/index.svelte":{"entry":"/./_app/pages/app/[projectId]/index.svelte-b32976ae.js","css":["/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/[projectId]/index.svelte-b32976ae.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/navigation-20968cc5.js","/./_app/chunks/singletons-bb9012b7.js","/./_app/chunks/stores-e9c66975.js"],"styles":null},"src/routes/app/[projectId]/dashboard.svelte":{"entry":"/./_app/pages/app/[projectId]/dashboard.svelte-42f10cee.js","css":["/./_app/assets/RadialSpinner.svelte_svelte&type=style&lang-a3277522.css","/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/[projectId]/dashboard.svelte-42f10cee.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/AvailablePages.store-4be7f7f6.js","/./_app/chunks/SimpleIcon-9bf6c4b5.js","/./_app/chunks/stores-e9c66975.js","/./_app/chunks/navigation-20968cc5.js","/./_app/chunks/singletons-bb9012b7.js","/./_app/chunks/ControlsTile-627badc9.js","/./_app/chunks/RadialSpinner-87915e8f.js"],"styles":null},"src/routes/app/[projectId]/settings/__layout.svelte":{"entry":"/./_app/pages/app/[projectId]/settings/__layout.svelte-1a84ca06.js","css":["/./_app/assets/RadialSpinner.svelte_svelte&type=style&lang-a3277522.css","/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/[projectId]/settings/__layout.svelte-1a84ca06.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/stores-e9c66975.js","/./_app/chunks/navigation-20968cc5.js","/./_app/chunks/singletons-bb9012b7.js","/./_app/chunks/SimpleIcon-9bf6c4b5.js","/./_app/chunks/AvailablePages.store-4be7f7f6.js"],"styles":null},"src/routes/app/[projectId]/settings/index.svelte":{"entry":"/./_app/pages/app/[projectId]/settings/index.svelte-f6cdcceb.js","css":["/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/[projectId]/settings/index.svelte-f6cdcceb.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/stores-e9c66975.js","/./_app/chunks/navigation-20968cc5.js","/./_app/chunks/singletons-bb9012b7.js"],"styles":null},"src/routes/app/[projectId]/settings/general.svelte":{"entry":"/./_app/pages/app/[projectId]/settings/general.svelte-b2d0bf0c.js","css":["/./_app/assets/RadialSpinner.svelte_svelte&type=style&lang-a3277522.css","/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/[projectId]/settings/general.svelte-b2d0bf0c.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/AvailablePages.store-4be7f7f6.js","/./_app/chunks/UniversalSettingCard-2a03f517.js","/./_app/chunks/SimpleIcon-9bf6c4b5.js","/./_app/chunks/RadialSpinner-87915e8f.js"],"styles":null},"src/routes/app/[projectId]/settings/danger.svelte":{"entry":"/./_app/pages/app/[projectId]/settings/danger.svelte-81d77122.js","css":["/./_app/assets/RadialSpinner.svelte_svelte&type=style&lang-a3277522.css","/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/[projectId]/settings/danger.svelte-81d77122.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/SimpleIcon-9bf6c4b5.js","/./_app/chunks/navigation-20968cc5.js","/./_app/chunks/singletons-bb9012b7.js","/./_app/chunks/AvailablePages.store-4be7f7f6.js","/./_app/chunks/RadialSpinner-87915e8f.js"],"styles":null},"src/routes/app/[projectId]/settings/tiles.svelte":{"entry":"/./_app/pages/app/[projectId]/settings/tiles.svelte-10e1e2d3.js","css":["/./_app/assets/RadialSpinner.svelte_svelte&type=style&lang-a3277522.css","/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/[projectId]/settings/tiles.svelte-10e1e2d3.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/SimpleIcon-9bf6c4b5.js","/./_app/chunks/AvailablePages.store-4be7f7f6.js","/./_app/chunks/ControlsTile-627badc9.js","/./_app/chunks/navigation-20968cc5.js","/./_app/chunks/singletons-bb9012b7.js","/./_app/chunks/stores-e9c66975.js","/./_app/chunks/RadialSpinner-87915e8f.js","/./_app/chunks/UniversalSettingCard-2a03f517.js"],"styles":null},"src/routes/app/[projectId]/editor/index.svelte":{"entry":"/./_app/pages/app/[projectId]/editor/index.svelte-9f6cfd9e.js","css":["/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/[projectId]/editor/index.svelte-9f6cfd9e.js","/./_app/chunks/vendor-adcc401c.js","/./_app/chunks/navigation-20968cc5.js","/./_app/chunks/singletons-bb9012b7.js","/./_app/chunks/stores-e9c66975.js"],"styles":null},"src/routes/app/[projectId]/editor/explorer.svelte":{"entry":"/./_app/pages/app/[projectId]/editor/explorer.svelte-b6724b8d.js","css":["/./_app/assets/vendor-7fec0a11.css"],"js":["/./_app/pages/app/[projectId]/editor/explorer.svelte-b6724b8d.js","/./_app/chunks/vendor-adcc401c.js"],"styles":null}};

async function load_component(file) {
	return {
		module: await module_lookup[file](),
		...metadata_lookup[file]
	};
}

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}