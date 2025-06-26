


const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), async (req, res) => {
  const results = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => {
      if (data.name && data.email) {
        results.push(data);
      }
    })
    .on("end", async () => {
      try {
        await User.insertMany(results);
        fs.unlinkSync(filePath); 
        res.send("CSV imported successfully");
      } catch (err) {
        res.status(500).send("Error saving data");
      }
    });
});