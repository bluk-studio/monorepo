const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/login/index.svelte"),
	() => import("../../../src/routes/app/__layout.svelte"),
	() => import("../../../src/routes/app/index.svelte"),
	() => import("../../../src/routes/app/selector/index.svelte"),
	() => import("../../../src/routes/app/create/__layout.svelte"),
	() => import("../../../src/routes/app/create/index.svelte"),
	() => import("../../../src/routes/app/create/information.svelte"),
	() => import("../../../src/routes/app/create/members.svelte"),
	() => import("../../../src/routes/app/create/finish.svelte"),
	() => import("../../../src/routes/app/create/plan.svelte"),
	() => import("../../../src/routes/app/[projectId]/__layout.svelte"),
	() => import("../../../src/routes/app/[projectId]/index.svelte"),
	() => import("../../../src/routes/app/[projectId]/dashboard.svelte"),
	() => import("../../../src/routes/app/[projectId]/settings/__layout.svelte"),
	() => import("../../../src/routes/app/[projectId]/settings/index.svelte"),
	() => import("../../../src/routes/app/[projectId]/settings/general.svelte"),
	() => import("../../../src/routes/app/[projectId]/settings/tiles.svelte"),
	() => import("../../../src/routes/app/[projectId]/editor/index.svelte"),
	() => import("../../../src/routes/app/[projectId]/editor/explorer.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/login/index.svelte
	[/^\/login\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/app/index.svelte
	[/^\/app\/?$/, [c[0], c[4], c[5]], [c[1]]],

	// src/routes/app/selector/index.svelte
	[/^\/app\/selector\/?$/, [c[0], c[4], c[6]], [c[1]]],

	// src/routes/app/create/index.svelte
	[/^\/app\/create\/?$/, [c[0], c[4], c[7], c[8]], [c[1]]],

	// src/routes/app/create/information.svelte
	[/^\/app\/create\/information\/?$/, [c[0], c[4], c[7], c[9]], [c[1]]],

	// src/routes/app/create/members.svelte
	[/^\/app\/create\/members\/?$/, [c[0], c[4], c[7], c[10]], [c[1]]],

	// src/routes/app/create/finish.svelte
	[/^\/app\/create\/finish\/?$/, [c[0], c[4], c[7], c[11]], [c[1]]],

	// src/routes/app/create/plan.svelte
	[/^\/app\/create\/plan\/?$/, [c[0], c[4], c[7], c[12]], [c[1]]],

	// src/routes/app/[projectId]/index.svelte
	[/^\/app\/([^/]+?)\/?$/, [c[0], c[4], c[13], c[14]], [c[1]], (m) => ({ projectId: d(m[1])})],

	// src/routes/app/[projectId]/dashboard.svelte
	[/^\/app\/([^/]+?)\/dashboard\/?$/, [c[0], c[4], c[13], c[15]], [c[1]], (m) => ({ projectId: d(m[1])})],

	// src/routes/app/[projectId]/settings/index.svelte
	[/^\/app\/([^/]+?)\/settings\/?$/, [c[0], c[4], c[13], c[16], c[17]], [c[1]], (m) => ({ projectId: d(m[1])})],

	// src/routes/app/[projectId]/settings/general.svelte
	[/^\/app\/([^/]+?)\/settings\/general\/?$/, [c[0], c[4], c[13], c[16], c[18]], [c[1]], (m) => ({ projectId: d(m[1])})],

	// src/routes/app/[projectId]/settings/tiles.svelte
	[/^\/app\/([^/]+?)\/settings\/tiles\/?$/, [c[0], c[4], c[13], c[16], c[19]], [c[1]], (m) => ({ projectId: d(m[1])})],

	// src/routes/app/[projectId]/editor/index.svelte
	[/^\/app\/([^/]+?)\/editor\/?$/, [c[0], c[4], c[13], c[20]], [c[1]], (m) => ({ projectId: d(m[1])})],

	// src/routes/app/[projectId]/editor/explorer.svelte
	[/^\/app\/([^/]+?)\/editor\/explorer\/?$/, [c[0], c[4], c[13], c[21]], [c[1]], (m) => ({ projectId: d(m[1])})]
];

export const fallback = [c[0](), c[1]()];