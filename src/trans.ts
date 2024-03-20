import fs from "fs";
import path from "path";
import _ from "lodash";

function getJsonFiles(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      fileList = getJsonFiles(path.join(dir, file), fileList);
    } else {
      if (path.extname(file) === ".json") {
        fileList.push(file);
      }
    }
  });

  return fileList;
}

const source = "/Users/namnguyen/shop/vitest-pro/src/transA";
const destination = "/Users/namnguyen/shop/vitest-pro/src/transB";

const jsonFilesFromSource = getJsonFiles(source);
const jsonFilesFromDestination = getJsonFiles(destination);

const pickFields = ["greeting", "instructions", "new"];

for (const jsonFile of jsonFilesFromSource) {
  const sourceFile = path.join(source, jsonFile);
  const dataFromSource = JSON.parse(fs.readFileSync(sourceFile).toString());

  Object.keys(dataFromSource).forEach((key) => {
    if (!pickFields.includes(key)) {
      delete dataFromSource[key];
    }
  });

  const isExist = jsonFilesFromDestination.includes(jsonFile);
  if (!isExist) {
    const destinationFile = path.join(destination, jsonFile);
    fs.writeFileSync(destinationFile, JSON.stringify(dataFromSource, null, 2));

    continue;
  }

  const destinationFile = path.join(destination, jsonFile);
  const dataFromDestination = JSON.parse(
    fs.readFileSync(destinationFile).toString(),
  );
  const mergedData = _.merge(dataFromDestination, dataFromSource);
  fs.writeFileSync(destinationFile, JSON.stringify(mergedData, null, 2));
}
