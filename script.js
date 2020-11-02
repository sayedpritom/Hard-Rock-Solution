const displayFullLyrics = (artist, album, title) => {
    document.getElementById('full-lyrics').innerHTML = "";
    fetch(`https://api.lyrics.ovh/v1/${artist}/${album}`)
    .then(res => res.json())
    .then(data => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="single-lyrics text-center">
                <button class="btn go-back">&lsaquo;</button>
                <h2 class="text-success mb-4">${title}</h2>
                <pre id="pre" class="lyric text-white">
                ${data.lyrics} 
                </pre>
            </div>
        `;
        document.getElementById('full-lyrics').appendChild(div);
    })
}
document.getElementById('search-button').addEventListener('click', () => {
    const inputValue = document.getElementById('input-form').value;
    const lyricsTitles = document.getElementById('lyrics-titles');
    lyricsTitles.innerHTML = "";
    document.getElementById('full-lyrics').innerHTML = "";

    fetch(`https://api.lyrics.ovh/suggest/${inputValue}`)
    .then(res => res.json())
    .then(data => {
        const songs = data.data.slice(0,10);
        for (let i = 0; i < songs.length; i++) {
            const song = songs[i];
            const title = song.title;
            const album = song.album.title;
            const artist = song.artist.name;

            let result = document.createElement('div');
            result.innerHTML = `
            <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${title}</h3>
                    <p class="author lead">Album by <span>${album}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onClick="displayFullLyrics('${artist}','${album}','${title}')" class="btn btn-success">Get Lyrics</button>
                </div>
            </div>
            
            `;
            lyricsTitles.appendChild(result)
        }
    })
})