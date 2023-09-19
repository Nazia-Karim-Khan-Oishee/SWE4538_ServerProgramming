const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const os = require("os");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/data", (req, res) => {
  fs.readFile("./file.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error reading data file." });
      return;
    }
    const FileData = JSON.parse(data);
    res.json(FileData);
  });
});

app.post("/data", (req, res) => {
  const newData = req.body;

  fs.writeFile("./file.json", JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error writing data to the file." });
      return;
    }

    res.json(newData);
  });
});

app.put("/data", (req, res) => {
  // Read the data from existing JSON file
  fs.readFile("./file.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error reading data file." });
      return;
    }

    const prev_data = JSON.parse(data);
    prev_data.push(req.body);

    // fs.appendFile(
    //   "./file.json",
    //   JSON.stringify(prev_data, null, 2),
    //   (err) => {
    //     if (err) {
    //       console.error(err);
    //       res
    //         .status(500)
    //         .json({ error: "Error appending data to the file." });
    //       return;
    //     }

    //     res.json(prev_data);
    //   }
    // );
    fs.writeFile("./file.json", JSON.stringify(prev_data, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error writing data to the file." });
        return;
      }

      res.json(prev_data);
    });
  });
});

app.delete("/data", (req, res) => {
  fs.unlink("./demoFile.json", (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error deleting the data file." });
      return;
    }

    console.log("File deleted successfully.");
    res.json("File deleted successfully.");
  });
});

app.get("/os-info", (req, res) => {
  fs.readFile("./os_module.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error reading OS data file." });
      return;
    }
    console.log("Before\n");

    const osData = JSON.parse(data);
    console.log(osData);

    const newOsInfo = {
      platform: os.platform(),
    };

    osData.push(newOsInfo);
    fs.writeFile("./os_module.json", JSON.stringify(osData, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error writing OS data to the file." });
        return;
      }
      console.log("After\n");
      console.log(osData);
      res.json({ osData });
    });
  });
});

// Catch-all middleware for 404 Not Found
app.use((req, res) => {
  // console.log("Eroor: Not Found");
  res.status(404).json({ error: "Not Found" });
});
