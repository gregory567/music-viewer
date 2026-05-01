const fs = require("fs");
const path = require("path");

/* Music folder */

const musicFolder = path.join(__dirname, "music");

/* Output JSON file */

const outputFile = path.join(__dirname, "songs.json");

/* Read all files */

fs.readdir(musicFolder, (err, files) => {

    if (err) {

        console.error("Error reading music folder:", err);

        return;
    }

    /* Filter MusicXML files */

    const songs = files
        .filter(file => file.endsWith(".musicxml"))
        .map(file => {

            /* Create readable title */

            const title = file
                .replace(".musicxml", "")
                .replace(/_/g, " ")
                .replace(/\b\w/g, char => char.toUpperCase());

            return {

                title: title,
                file: file
            };
        });

    /* Write songs.json */

    fs.writeFile(
        outputFile,
        JSON.stringify(songs, null, 4),
        err => {

            if (err) {

                console.error("Error writing songs.json:", err);

                return;
            }

            console.log("songs.json generated successfully!");
        }
    );
});