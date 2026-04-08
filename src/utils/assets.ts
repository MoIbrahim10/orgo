import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const publicDirectory = fileURLToPath(new URL("../../public/", import.meta.url));

function isRemoteAssetPath(assetPath: string): boolean {
	return /^https?:\/\//.test(assetPath);
}

export function getPublicAssetPath(
	assetPath?: string | null,
	fallbackPath?: string,
): string | undefined {
	if (assetPath) {
		if (isRemoteAssetPath(assetPath)) {
			return assetPath;
		}

		const normalizedPath = assetPath.replace(/^\/+/, "");
		if (existsSync(join(publicDirectory, normalizedPath))) {
			return `/${normalizedPath}`;
		}
	}

	return fallbackPath;
}
