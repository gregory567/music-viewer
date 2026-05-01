const fs = require("fs");
const path = require("path");

/* Music folder */
const musicFolder = path.join(__dirname, "music");

/* songs.json output */
const outputFile = path.join(__dirname, "songs.json");

/* Generate songs array */
function generateSongs(files) {

    return files
        .filter(file => file.endsWith(".musicxml"))
        .map(file => {

            /* Generate readable title */
            const title = file
                .replace(".musicxml", "")
                .replace(/_/g, " ")
                .replace(/\b\w/g, char => char.toUpperCase());

            return {
                title: title,
                file: file
            };
        });
}

/* Write songs.json */
function writeSongsFile(songs) {

    fs.writeFile(
        outputFile,
        JSON.stringify(songs, null, 4),
        "utf8",
        err => {

            if (err) {
                console.error("Error writing songs.json:", err);
                return;
            }

            console.log("songs.json successfully generated!");
        }
    );
}

/* Read music folder */
fs.readdir(musicFolder, (err, files) => {

    if (err) {
        console.error("Error reading music folder:", err);
        return;
    }

    const songs = generateSongs(files);

    /* Check if songs.json exists */
    if (!fs.existsSync(outputFile)) {
        console.log("songs.json does not exist. Creating file...");
        writeSongsFile(songs);
        return;
    }

    /* Read existing file */
    fs.readFile(outputFile, "utf8", (err, data) => {

        if (err) {
            console.error("Error reading songs.json:", err);
            return;
        }

        /* File exists but empty */
        if (!data.trim()) {
            console.log("songs.json is empty. Filling file...");
            writeSongsFile(songs);
            return;
        }

        /* File exists with content */
        console.log("songs.json already exists. Updating content...");
        writeSongsFile(songs);
    });
});