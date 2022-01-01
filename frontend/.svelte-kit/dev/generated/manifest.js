const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/login/index.svelte"),
	() => import("../../../src/routes/app/__layout.svelte"),
	() => import("../../../src/routes/app/index.svelte"),
	() => import("../../../src/routes/app/marketplace/index.svelte"),
	() => import("../../../src/routes/app/marketplace/explore/index.svelte"),
	() => import("../../../src/routes/app/marketplace/[itemId]/__layout.svelte"),
	() => import("../../../src/routes/app/marketplace/[itemId]/index.svelte"),
	() => import("../../../src/routes/app/marketplace/[itemId]/summary.svelte"),
	() => import("../../../src/routes/app/selector/index.svelte"),
	() => import("../../../src/routes/app/create/index.svelte"),
	() => import("../../../src/routes/app/create/project/__layout.svelte"),
	() => import("../../../src/routes/app/create/project/index.svelte"),
	() => import("../../../src/routes/app/create/project/information.svelte"),
	() => import("../../../src/routes/app/create/project/members.svelte"),
	() => import("../../../src/routes/app/create/project/finish.svelte"),
	() => import("../../../src/routes/app/create/project/plan.svelte"),
	() => import("../../../src/routes/app/create/plugin/__layout.svelte"),
	() => import("../../../src/routes/app/create/plugin/index.svelte"),
	() => import("../../../src/routes/app/create/plugin/information.svelte"),
	() => import("../../../src/routes/app/create/plugin/members.svelte"),
	() => import("../../../src/routes/app/create/plugin/finish.svelte"),
	() => import("../../../src/routes/app/create/plugin/plan.svelte"),
	() => import("../../../src/routes/app/editor/__layout.svelte"),
	() => import("../../../src/routes/app/editor/index.svelte"),
	() => import("../../../src/routes/app/[projectId]/__layout.svelte"),
	() => import("../../../src/routes/app/[projectId]/index.svelte"),
	() => import("../../../src/routes/app/[projectId]/dashboard.svelte"),
	() => import("../../../src/routes/app/[projectId]/settings/__layout.svelte"),
	() => import("../../../src/routes/app/[projectId]/settings/index.svelte"),
	() => import("../../../src/routes/app/[projectId]/settings/general.svelte"),
	() => import("../../../src/routes/app/[projectId]/settings/danger.svelte"),
	() => import("../../../src/routes/app/[projectId]/settings/tiles.svelte"),
	() => import("../../../src/routes/app/[projectId]/editor/index.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/login/index.svelte
	[/^\/login\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/app/index.svelte
	[/^\/app\/?$/, [c[0], c[4], c[5]], [c[1]]],

	// src/routes/app/marketplace/index.svelte
	[/^\/app\/marketplace\/?$/, [c[0], c[4], c[6]], [c[1]]],

	// src/routes/app/marketplace/explore/index.svelte
	[/^\/app\/marketplace\/explore\/?$/, [c[0], c[4], c[7]], [c[1]]],

	// src/routes/app/marketplace/[itemId]/index.svelte
	[/^\/app\/marketplace\/([^/]+?)\/?$/, [c[0], c[4], c[8], c[9]], [c[1]], (m) => ({ itemId: d(m[1])})],

	// src/routes/app/marketplace/[itemId]/summary.svelte
	[/^\/app\/marketplace\/([^/]+?)\/summary\/?$/, [c[0], c[4], c[8], c[10]], [c[1]], (m) => ({ itemId: d(m[1])})],

	// src/routes/app/selector/index.svelte
	[/^\/app\/selector\/?$/, [c[0], c[4], c[11]], [c[1]]],

	// src/routes/app/create/index.svelte
	[/^\/app\/create\/?$/, [c[0], c[4], c[12]], [c[1]]],

	// src/routes/app/create/project/index.svelte
	[/^\/app\/create\/project\/?$/, [c[0], c[4], c[13], c[14]], [c[1]]],

	// src/routes/app/create/project/information.svelte
	[/^\/app\/create\/project\/information\/?$/, [c[0], c[4], c[13], c[15]], [c[1]]],

	// src/routes/app/create/project/members.svelte
	[/^\/app\/create\/project\/members\/?$/, [c[0], c[4], c[13], c[16]], [c[1]]],

	// src/routes/app/create/project/finish.svelte
	[/^\/app\/create\/project\/finish\/?$/, [c[0], c[4], c[13], c[17]], [c[1]]],

	// src/routes/app/create/project/plan.svelte
	[/^\/app\/create\/project\/plan\/?$/, [c[0], c[4], c[13], c[18]], [c[1]]],

	// src/routes/app/create/plugin/index.svelte
	[/^\/app\/create\/plugin\/?$/, [c[0], c[4], c[19], c[20]], [c[1]]],

	// src/routes/app/create/plugin/information.svelte
	[/^\/app\/create\/plugin\/information\/?$/, [c[0], c[4], c[19], c[21]], [c[1]]],

	// src/routes/app/create/plugin/members.svelte
	[/^\/app\/create\/plugin\/members\/?$/, [c[0], c[4], c[19], c[22]], [c[1]]],

	// src/routes/app/create/plugin/finish.svelte
	[/^\/app\/create\/plugin\/finish\/?$/, [c[0], c[4], c[19], c[23]], [c[1]]],

	// src/routes/app/create/plugin/plan.svelte
	[/^\/app\/create\/plugin\/plan\/?$/, [c[0], c[4], c[19], c[24]], [c[1]]],

	// src/routes/app/editor/index.svelte
	[/^\/app\/editor\/?$/, [c[0], c[4], c[25], c[26]], [c[1]]],

	// src/routes/app/[projectId]/index.svelte
	[/^\/app\/([^/]+?)\/?$/, [c[0], c[4], c[27], c[28]], [c[1]], (m) => ({ projectId: d(m[1])})],

	// src/routes/app/[projectId]/dashboard.svelte
	[/^\/app\/([^/]+?)\/dashboard\/?$/, [c[0], c[4], c[27], c[29]], [c[1]], (m) => ({ projectId: d(m[1])})],

	// src/routes/app/[projectId]/settings/index.svelte
	[/^\/app\/([^/]+?)\/settings\/?$/, [c[0], c[4], c[27], c[30], c[31]], [c[1]], (m) => ({ projectId: d(m[1])})],

	// src/routes/app/[projectId]/settings/general.svelte
	[/^\/app\/([^/]+?)\/settings\/general\/?$/, [c[0], c[4], c[27], c[30], c[32]], [c[1]], (m) => ({ projectId: d(m[1])})],

	// src/routes/app/[projectId]/settings/danger.svelte
	[/^\/app\/([^/]+?)\/settings\/danger\/?$/, [c[0], c[4], c[27], c[30], c[33]], [c[1]], (m) => ({ projectId: d(m[1])})],

	// src/routes/app/[projectId]/settings/tiles.svelte
	[/^\/app\/([^/]+?)\/settings\/tiles\/?$/, [c[0], c[4], c[27], c[30], c[34]], [c[1]], (m) => ({ projectId: d(m[1])})],

	// src/routes/app/[projectId]/editor/index.svelte
	[/^\/app\/([^/]+?)\/editor\/?$/, [c[0], c[4], c[27], c[35]], [c[1]], (m) => ({ projectId: d(m[1])})]
];

export const fallback = [c[0](), c[1]()];