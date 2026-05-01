let zoom = 0.8;

const osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("score", {
    autoResize: true,

    drawTitle: true,

    backend: "svg",

    renderSingleHorizontalStaffline: false,

    pageFormat: "Endless",

    spacingFactorSoftmax: 5
});

async function loadScore() {

    await osmd.load("music/song.musicxml");

    osmd.zoom = zoom;

    osmd.render();
}

loadScore();

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

window.addEventListener("resize", () => {

    osmd.render();
});