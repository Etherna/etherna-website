const fs = require("fs")
const glob = require("glob")
const mimetypes = require("mime-types")
const { BzzNode } = require("@erebos/swarm-node")

const config = {
  localRoot: __dirname + "/public",
  swarmGateway: "https://swarm-gateways.net"
}

/** @returns {string[][]} */
const readFiles = () => new Promise((resolve, reject) => {
  glob(config.localRoot + "/**/*", (error, result) => {
    if (error) reject (error)

    let files = []
    result.forEach(path => {
      if (fs.lstatSync(path).isFile()) {
        let file = path.replace(config.localRoot, "")
        if (file.startsWith("/")) file = file.substr(1, file.length - 1)
        files.push([file, path])
      }
    })

    resolve(files)
  })
})

const deployToSwarm = async () => {
  try {
    // Upload build folder to swarm
    console.log("Uploading build folder to swarm...")

    const files = await readFiles()

    // Creating form data
    let data = {
      // default path
      "": {
        data: fs.readFileSync(`${config.localRoot}/index.html`),
        contentType: "text/html",
      },
    }

    files.forEach(fileInfo => {
      const [fileName, filePath] = fileInfo
      const contentType = mimetypes.lookup(filePath)
      data[fileName] = {
        data: fs.readFileSync(filePath),
        contentType
      }

      if (/\/index\.html$/.test(fileName)) {
        const defaultFileName = fileName.replace(/\/index\.html$/, "/")
        data[defaultFileName] = {
          data: fs.readFileSync(filePath),
          contentType
        }
      }
    })

    // console.log(data);
    // return

    // Upload
    const bzz = new BzzNode({ url: config.swarmGateway })
    const manifest = await bzz.uploadDirectory(data)

    console.log(`App deployed to ${manifest}`)
  } catch (error) {
    console.error(error)
  }
}

deployToSwarm()
