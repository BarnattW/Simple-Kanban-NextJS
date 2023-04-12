/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		ATLAS_URI:
			"mongodb+srv://barndudeW:KCeXfmiWMrtRv7yi@cluster0.brsjygl.mongodb.net/kanban",
		NEXTAUTH_SECRET: "F7A1C9565256A487",
	},
};

module.exports = nextConfig
