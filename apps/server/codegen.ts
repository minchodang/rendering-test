import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: [
		"./src/graphql/**/*.graphql",
		"!./src/graphql/__generated__/schema.graphql",
	],
	generates: {
		"./src/graphql/__generated__/resolvers.ts": {
			plugins: ["typescript", "typescript-resolvers"],
			config: {
				// contextType: "../defineContext#Context",
				// // 아래 두 옵션은 지금 사용하진 않겠지만 매우 중요해요!
				// mappers: {},
				// mapperTypeSuffix: "Type",
			},
		},
		"./src/graphql/__generated__/schema.graphql": {
			plugins: ["schema-ast"],
		},
	},
};

export default config;
