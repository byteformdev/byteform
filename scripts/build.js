const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

class WorkspaceBuildManager {
    constructor() {
        this.workspaces = [];
        this.buildResults = new Map();
        this.startTime = performance.now();
    }

    // Get all workspace packages
    getWorkspaces() {
        try {
            const output = execSync("npm query .workspace", {
                encoding: "utf8"
            });
            const workspaces = JSON.parse(output);

            return workspaces.map((ws) => ({
                name: ws.name,
                location: ws.location,
                packageJson: JSON.parse(
                    fs.readFileSync(
                        path.join(ws.location, "package.json"),
                        "utf8"
                    )
                )
            }));
        } catch (error) {
            console.log(
                "📦 No workspaces found or npm query failed, scanning packages directory..."
            );
            return this.scanPackagesDirectory();
        }
    }

    // Fallback: scan packages directory manually
    scanPackagesDirectory() {
        const packagesDir = path.join(process.cwd(), "packages");

        if (!fs.existsSync(packagesDir)) {
            return [];
        }

        const packages = [];
        const entries = fs.readdirSync(packagesDir, { withFileTypes: true });

        for (const entry of entries) {
            if (entry.isDirectory()) {
                const packagePath = path.join(packagesDir, entry.name);
                const packageJsonPath = path.join(packagePath, "package.json");

                if (fs.existsSync(packageJsonPath)) {
                    try {
                        const packageJson = JSON.parse(
                            fs.readFileSync(packageJsonPath, "utf8")
                        );
                        packages.push({
                            name: packageJson.name || entry.name,
                            location: packagePath,
                            packageJson
                        });
                    } catch (error) {
                        console.warn(
                            `⚠️  Could not read package.json for ${entry.name}`
                        );
                    }
                }
            }
        }

        return packages;
    }

    // Build dependency graph to determine build order
    buildDependencyGraph(workspaces) {
        const graph = new Map();
        const workspaceNames = new Set(workspaces.map((ws) => ws.name));

        // Initialize graph
        workspaces.forEach((ws) => {
            graph.set(ws.name, {
                workspace: ws,
                dependencies: new Set(),
                dependents: new Set()
            });
        });

        // Build dependency relationships
        workspaces.forEach((ws) => {
            const node = graph.get(ws.name);
            const deps = {
                ...ws.packageJson.dependencies,
                ...ws.packageJson.devDependencies,
                ...ws.packageJson.peerDependencies
            };

            Object.keys(deps).forEach((depName) => {
                if (workspaceNames.has(depName)) {
                    node.dependencies.add(depName);
                    graph.get(depName).dependents.add(ws.name);
                }
            });
        });

        return graph;
    }

    // Topological sort to get build order
    getBuildOrder(graph) {
        const visited = new Set();
        const temp = new Set();
        const order = [];

        const visit = (name) => {
            if (temp.has(name)) {
                throw new Error(
                    `Circular dependency detected involving ${name}`
                );
            }
            if (visited.has(name)) return;

            temp.add(name);
            const node = graph.get(name);

            node.dependencies.forEach((dep) => visit(dep));

            temp.delete(name);
            visited.add(name);
            order.push(name);
        };

        Array.from(graph.keys()).forEach((name) => {
            if (!visited.has(name)) {
                visit(name);
            }
        });

        return order;
    }

    // Check if a workspace has a build script
    hasBuildScript(workspace) {
        return (
            workspace.packageJson.scripts && workspace.packageJson.scripts.build
        );
    }

    // Build a single workspace
    async buildWorkspace(workspace) {
        return new Promise((resolve, reject) => {
            const startTime = performance.now();
            console.log(`🔨 Building ${workspace.name}...`);

            const buildProcess = spawn("npm", ["run", "build"], {
                cwd: workspace.location,
                stdio: "pipe",
                shell: true
            });

            let stdout = "";
            let stderr = "";

            buildProcess.stdout.on("data", (data) => {
                stdout += data.toString();
            });

            buildProcess.stderr.on("data", (data) => {
                stderr += data.toString();
            });

            buildProcess.on("close", (code) => {
                const duration = performance.now() - startTime;
                const result = {
                    name: workspace.name,
                    success: code === 0,
                    duration,
                    stdout,
                    stderr
                };

                if (code === 0) {
                    console.log(
                        `✅ ${workspace.name} built successfully (${Math.round(
                            duration
                        )}ms)`
                    );
                    resolve(result);
                } else {
                    console.error(
                        `❌ ${workspace.name} build failed (${Math.round(
                            duration
                        )}ms)`
                    );
                    if (stderr) console.error(`Error: ${stderr}`);
                    reject(result);
                }
            });

            buildProcess.on("error", (error) => {
                const duration = performance.now() - startTime;
                const result = {
                    name: workspace.name,
                    success: false,
                    duration,
                    error: error.message
                };
                console.error(
                    `❌ ${workspace.name} build error: ${error.message}`
                );
                reject(result);
            });
        });
    }

    // Build workspaces in parallel where possible
    async buildWorkspacesParallel(workspaces, graph, maxConcurrency = 4) {
        const buildOrder = this.getBuildOrder(graph);
        const completed = new Set();
        const inProgress = new Map();
        const results = [];

        console.log(`📋 Build order: ${buildOrder.join(" → ")}`);

        while (completed.size < buildOrder.length) {
            // Find workspaces that can be built (dependencies completed)
            const ready = buildOrder.filter((name) => {
                if (completed.has(name) || inProgress.has(name)) return false;

                const dependencies = graph.get(name).dependencies;
                return Array.from(dependencies).every((dep) =>
                    completed.has(dep)
                );
            });

            // Start builds up to concurrency limit
            const toStart = ready.slice(0, maxConcurrency - inProgress.size);

            for (const name of toStart) {
                const workspace = graph.get(name).workspace;

                if (!this.hasBuildScript(workspace)) {
                    console.log(`⏭️  Skipping ${name} (no build script)`);
                    completed.add(name);
                    continue;
                }

                const buildPromise = this.buildWorkspace(workspace);
                inProgress.set(name, buildPromise);

                buildPromise
                    .then((result) => {
                        results.push(result);
                        completed.add(name);
                        inProgress.delete(name);
                    })
                    .catch((result) => {
                        results.push(result);
                        completed.add(name);
                        inProgress.delete(name);
                    });
            }

            // Wait for at least one build to complete
            if (inProgress.size > 0) {
                await Promise.race(inProgress.values());
            }

            // Small delay to prevent busy waiting
            await new Promise((resolve) => setTimeout(resolve, 100));
        }

        return results;
    }

    // Build all workspaces sequentially
    async buildWorkspacesSequential(workspaces, graph) {
        const buildOrder = this.getBuildOrder(graph);
        const results = [];

        console.log(`📋 Build order: ${buildOrder.join(" → ")}`);

        for (const name of buildOrder) {
            const workspace = graph.get(name).workspace;

            if (!this.hasBuildScript(workspace)) {
                console.log(`⏭️  Skipping ${name} (no build script)`);
                continue;
            }

            try {
                const result = await this.buildWorkspace(workspace);
                results.push(result);
            } catch (result) {
                results.push(result);
                if (process.argv.includes("--fail-fast")) {
                    console.error(
                        "💥 Build failed, stopping due to --fail-fast flag"
                    );
                    break;
                }
            }
        }

        return results;
    }

    // Print build summary
    printSummary(results) {
        const totalTime = performance.now() - this.startTime;
        const successful = results.filter((r) => r.success);
        const failed = results.filter((r) => !r.success);

        console.log("\n" + "=".repeat(50));
        console.log("📊 BUILD SUMMARY");
        console.log("=".repeat(50));
        console.log(`Total time: ${Math.round(totalTime)}ms`);
        console.log(`Successful: ${successful.length}`);
        console.log(`Failed: ${failed.length}`);
        console.log(`Total: ${results.length}`);

        if (successful.length > 0) {
            console.log("\n✅ Successful builds:");
            successful.forEach((r) => {
                console.log(`  ${r.name} (${Math.round(r.duration)}ms)`);
            });
        }

        if (failed.length > 0) {
            console.log("\n❌ Failed builds:");
            failed.forEach((r) => {
                console.log(`  ${r.name} (${Math.round(r.duration)}ms)`);
            });
        }

        console.log("=".repeat(50));
    }

    // Main build function
    async build() {
        try {
            console.log("🚀 Starting workspace build...\n");

            // Get all workspaces
            this.workspaces = this.getWorkspaces();

            if (this.workspaces.length === 0) {
                console.log("📦 No workspaces found to build");
                return;
            }

            console.log(`📦 Found ${this.workspaces.length} workspace(s):`);
            this.workspaces.forEach((ws) => {
                const hasBuild = this.hasBuildScript(ws) ? "✅" : "⏭️";
                console.log(`  ${hasBuild} ${ws.name}`);
            });
            console.log();

            // Build dependency graph
            const graph = this.buildDependencyGraph(this.workspaces);

            // Choose build strategy
            const parallel = !process.argv.includes("--sequential");
            const maxConcurrency =
                parseInt(
                    process.argv
                        .find((arg) => arg.startsWith("--concurrency="))
                        ?.split("=")[1]
                ) || 4;

            let results;
            if (parallel) {
                console.log(
                    `🔄 Building in parallel (max concurrency: ${maxConcurrency})\n`
                );
                results = await this.buildWorkspacesParallel(
                    this.workspaces,
                    graph,
                    maxConcurrency
                );
            } else {
                console.log("🔄 Building sequentially\n");
                results = await this.buildWorkspacesSequential(
                    this.workspaces,
                    graph
                );
            }

            // Print summary
            this.printSummary(results);

            // Exit with appropriate code
            const hasFailures = results.some((r) => !r.success);
            process.exit(hasFailures ? 1 : 0);
        } catch (error) {
            console.error("💥 Build process failed:", error.message);
            process.exit(1);
        }
    }
}

// CLI handling
function showHelp() {
    console.log(`
🔨 Workspace Build Manager

Usage: node scripts/build.js [options]

Options:
  --sequential         Build workspaces sequentially instead of in parallel
  --concurrency=N      Maximum number of concurrent builds (default: 4)
  --fail-fast         Stop building on first failure
  --help              Show this help message

Examples:
  node scripts/build.js                    # Build all workspaces in parallel
  node scripts/build.js --sequential       # Build workspaces one by one
  node scripts/build.js --concurrency=2    # Limit to 2 concurrent builds
  node scripts/build.js --fail-fast        # Stop on first failure
`);
}

// Main execution
if (require.main === module) {
    if (process.argv.includes("--help")) {
        showHelp();
        process.exit(0);
    }

    const buildManager = new WorkspaceBuildManager();
    buildManager.build();
}

module.exports = WorkspaceBuildManager;
