import path from "path"
import fs from "fs/promises"

const iconRoot = path.resolve(__dirname, "../src/icons")
const index = path.resolve(iconRoot, "index.ts")

const exportStatement = (fileName: string) =>
  `export { default as ${fileName.replace(".svg", "")} } from "./${fileName}"\n`

const generate = async () => {
  await fs.truncate(index, 0)
  const fileNames = await fs.readdir(iconRoot)
  return Promise.all(
    fileNames.map((fileName) => {
      if (/.svg$/.test(fileName)) {
        return fs.appendFile(index, exportStatement(fileName))
      }
      return Promise.resolve()
    })
  )
}

generate().then(() => console.log("Successfully generate svg icon export statements!🚀"))
