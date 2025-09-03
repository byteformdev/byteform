const { execSync } = require("child_process");
const path = require("path");

const packages = [
    "packages/@byteform/core",
    "packages/@byteform/notifications",
    "packages/@byteform/dates"
];

function runCommand(command, cwd = process.cwd()) {
    console.log(`\n🔧 Running: ${command}`);
    console.log(`📁 Directory: ${cwd}`);

    try {
        execSync(command, {
            stdio: "inherit",
            cwd,
            env: { ...process.env }
        });
        console.log(`✅ Success: ${command}`);
    } catch (error) {
        console.error(`❌ Failed: ${command}`);
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

function publishPackage(packagePath) {
    const absolutePath = path.resolve(packagePath);
    const packageName = packagePath.split("/").pop();

    console.log(`\n🚀 Publishing ${packageName}...`);
    console.log(`📦 Package path: ${absolutePath}`);

    // Build the package
    runCommand("bun run build", absolutePath);

    // Publish the package
    runCommand("npm publish", absolutePath);

    console.log(`✅ Successfully published ${packageName}`);
}

function main() {
    console.log("🔥 Starting build and publish process...");
    console.log(`📍 Root directory: ${process.cwd()}`);

    // Publish each package
    for (const packagePath of packages) {
        publishPackage(packagePath);
    }

    console.log("\n🎉 All packages published successfully!");
}

// Run the script
main();
