const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// 画像アップロード設定
const upload = multer({ dest: "uploads/" });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// フォーム送信受け取り
app.post("/submit", upload.single("image"), (req, res) => {
    const name = req.body.name;
    const image = req.file;

    // JSONに保存
    const dataPath = "data.json";
    let submissions = [];
    if (fs.existsSync(dataPath)) {
        submissions = JSON.parse(fs.readFileSync(dataPath));
    }
    submissions.push({ name, image: image.filename, original: image.originalname });
    fs.writeFileSync(dataPath, JSON.stringify(submissions, null, 2));

    res.redirect("/thanks.html");
});

// パスワード確認
app.post("/check-password", (req, res) => {
    const pw = req.body.password;
    if(pw === "73915826") {
        res.redirect("https://line.me/ti/p/あなたの招待リンク");
    } else {
        res.send("パスワード違います！");
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
