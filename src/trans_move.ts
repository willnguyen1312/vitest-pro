import fs from "fs";
import path from "path";
import merge from "lodash/merge";

function getJsonFiles(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      // eslint-disable-next-line no-param-reassign
      fileList = getJsonFiles(path.join(dir, file), fileList);
    } else if (path.extname(file) === ".json") {
      fileList.push(file);
    }
  });

  return fileList;
}

const destination =
  "/Users/namnguyen/src/github.com/Shopify/web/app/sections/ShippingLabels/ShippingLabelCheckout/translations";
const source =
  "/Users/namnguyen/src/github.com/Shopify/web/app/sections/ShippingLabels/ShippingLabelCheckout/components/AsyncPurchaseDispatcher/translations";

const jsonFilesFromSource = getJsonFiles(source);
const jsonFilesFromDestination = getJsonFiles(destination);

const pickFields = ["purchasedLabelsToast"];

for (const jsonFile of jsonFilesFromSource) {
  const sourceFile = path.join(source, jsonFile);
  const dataFromSource = JSON.parse(fs.readFileSync(sourceFile).toString());

  Object.keys(dataFromSource).forEach((key) => {
    if (!pickFields.includes(key)) {
      delete dataFromSource[key];
    }
  });

  const isExist = jsonFilesFromDestination.includes(jsonFile);

  if (isExist) {
    const destinationFile = path.join(destination, jsonFile);
    const dataFromDestination = JSON.parse(
      fs.readFileSync(destinationFile).toString()
    );
    const mergedData = merge(dataFromDestination, dataFromSource);
    fs.writeFileSync(
      destinationFile,
      `${JSON.stringify(mergedData, null, 2)}\n`
    );
  } else {
    const destinationFile = path.join(destination, jsonFile);
    fs.writeFileSync(
      destinationFile,
      `${JSON.stringify(dataFromSource, null, 2)}\n`
    );
  }

  Object.keys(dataFromSource).forEach((key) => {
    if (pickFields.includes(key)) {
      delete dataFromSource[key];
    }
  });

  fs.writeFileSync(sourceFile, `${JSON.stringify(dataFromSource, null, 2)}\n`);
}
