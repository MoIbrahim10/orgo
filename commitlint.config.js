export default {
	extends: ["@commitlint/config-conventional"],
	plugins: [
		{
			rules: {
				"header-pattern": (parsed = {}) => {
					const { header = "" } = parsed;
					// Revised regex:
					//  - Group 1: Optional emoji (one or more emoji characters) followed by space.
					//  - Group 2: One or more word characters for type.
					//  - Group 3: Optional scope.
					//  - An optional exclamation mark.
					//  - Group 4: One or more characters for subject.
					const regex = /^([\p{Emoji}\p{Emoji_Presentation}]+\s)?(\w+)(?:\((.*)\))?!?: (.+)$/u;
					const valid = regex.test(header);
					return [
						valid,
						"Commit message must start with an emoji, then a conventional commit type, and a description",
					];
				},
			},
		},
	],
	rules: {
		"header-pattern": [2, "always"],
	},
	parserPreset: {
		parserOpts: {
			headerPattern: /^([\p{Emoji}\p{Emoji_Presentation}]+\s)?(\w+)(?:\((.*)\))?!?: (.+)$/u,
			headerCorrespondence: ["emoji", "type", "scope", "subject"],
		},
	},
};
