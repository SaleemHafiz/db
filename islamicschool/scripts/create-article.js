const fs = require("fs");
const path = require("path");

// Take article name from command line argument
const articleName = process.argv[2];
if (!articleName) {
  console.error("❌ Usage: node create-article.js <article-name>");
  process.exit(1);
}

const root = "articles";
const levels = ["beginner", "medium", "advanced"];
const langs = ["en", "ur"];

// Loop through levels and languages
levels.forEach(level => {
  const levelDir = path.join(root, articleName, level);
  fs.mkdirSync(levelDir, { recursive: true });

  langs.forEach(lang => {
    const filePath = path.join(levelDir, `${lang}.json`);

    const skeleton = {
      id: `${articleName}.${level}`,
      topic: articleName,
      slug: articleName,
      level: level,
      estimatedTime: "",
      tags: [],
      content: {
        title: "",
        blocks: []
      },
      references: {
        quran: [],
        hadith: []
      }
    };

    fs.writeFileSync(filePath, JSON.stringify(skeleton, null, 2));
    console.log(`✅ Created ${filePath}`);
  });
});
