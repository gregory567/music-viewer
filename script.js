let zoom = 0.8;

let songs = [];

let filteredSongs = [];

let currentSong = null;

/* OpenSheetMusicDisplay */
const osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("score", {

    autoResize: true,

    drawTitle: true,

    backend: "svg",

    renderSingleHorizontalStaffline: false,

    pageFormat: "Endless",

    spacingFactorSoftmax: 5
});

/* Load songs.json */
async function initializeSongs() {

    try {

        const response = await fetch("songs.json");

        songs = await response.json();

        filteredSongs = songs;

        populateSongSelector(filteredSongs);

        if (songs.length > 0) {

            currentSong = songs[0].file;

            loadScore(currentSong);
        }

    } catch (error) {

        console.error("Error loading songs:", error);
    }
}

/* Fill dropdown */
function populateSongSelector(songList) {

    const selector = document.getElementById("songSelector");

    selector.innerHTML = "";

    songList.forEach(song => {

        const option = document.createElement("option");

        option.value = song.file;

        option.textContent = song.title;

        selector.appendChild(option);
    });
}

/* Search function */
function filterSongs() {

    const searchText = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchText)
    );

    populateSongSelector(filteredSongs);

    /* Auto-load first search result */
    if (filteredSongs.length > 0) {

        currentSong = filteredSongs[0].file;

        loadScore(currentSong);
    }
}

/* Change song */
function changeSong() {

    const selector = document.getElementById("songSelector");

    currentSong = selector.value;

    loadScore(currentSong);
}

/* Load MusicXML */
async function loadScore(songFile) {

    try {

        await osmd.load("music/" + songFile);

        osmd.zoom = zoom;

        osmd.render();

    } catch (error) {

        console.error("Error loading score:", error);

        alert("Could not load song.");
    }
}

/* Zoom */
function zoomIn() {
    zoom += 0.1;
    osmd.zoom = zoom;
    osmd.render();
}

function zoomOut() {
    zoom = Math.max(0.4, zoom - 0.1);
    osmd.zoom = zoom;
    osmd.render();
}

/* Responsive rerender */
window.addEventListener("resize", () => {
    osmd.render();
});

/* Start app */
initializeSongs();