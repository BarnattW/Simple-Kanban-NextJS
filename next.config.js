/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		ATLAS_URI:
			"mongodb+srv://barndudeW:KCeXfmiWMrtRv7yi@cluster0.brsjygl.mongodb.net/kanban",
	},
};

module.exports = nextConfig
