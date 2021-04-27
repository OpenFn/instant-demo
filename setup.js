const execa = require("execa");

function clone(repo) {
  return execa("git", ["clone", repo]).catch((e) => {
    if (e.exitCode != 128) {
      throw e;
    }
  });
}

function initDocker() {
  return execa(
    "yarn",
    [
      "docker:instant",
      "init",
      "openfnHimHapi",
      "--custom-package=../openfn",
    ],
    { cwd: "./instant" }
  );
}

(async function () {
  process.stdout.write("\nCloning openhie/instant");
  await clone("git@github.com:openhie/instant.git");
  process.stdout.write(" ✅");

  // process.stdout.write("\nCloning openfn/microservice");
  // await clone("git@github.com:openfn/microservice.git");

  process.stdout.write(" ✅");
  process.stdout.write("\n");

  await initDocker().stdout.pipe(process.stdout);
})();
