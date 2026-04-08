import { spawnSync } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const tempDir = await mkdtemp(join(tmpdir(), "orgo-npm-audit-"));

try {
	const packageJsonSource = await Bun.file("package.json").text();
	await writeFile(join(tempDir, "package.json"), packageJsonSource);

	const install = spawnSync("npm", ["install", "--package-lock-only", "--ignore-scripts"], {
		cwd: tempDir,
		stdio: "inherit",
	});

	if (install.status !== 0) {
		process.exit(install.status ?? 1);
	}

	const audit = spawnSync("npm", ["audit"], {
		cwd: tempDir,
		stdio: "inherit",
	});

	process.exit(audit.status ?? 1);
} finally {
	await rm(tempDir, { recursive: true, force: true });
}
