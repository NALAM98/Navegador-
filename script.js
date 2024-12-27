function searchVideos() {
    const query = document.getElementById('search-query').value;
    const videoList = document.getElementById('video-list');
    videoList.innerHTML = ''; // Limpiar resultados anteriores

    if (query === '') {
        alert('Por favor, ingresa una búsqueda.');
        return;
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=YOUR_API_KEY`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const videos = data.items;
            videos.forEach(video => {
                const videoItem = document.createElement('div');
                videoItem.classList.add('video-item');
                videoItem.innerHTML = `
                    <h3>${video.snippet.title}</h3>

                    <!-- Miniatura del video -->
                    <img src="${video.snippet.thumbnails.high.url}" alt="Miniatura del video" style="width:100%; height:auto;">
                    <!-- Representación: Esta es la miniatura del video que aparece en los resultados de búsqueda -->

                    <iframe src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <p><a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">Ver en YouTube</a></p>
                `;
                videoList.appendChild(videoItem);
            });
        })
        .catch(error => {
            console.error('Error al buscar videos:', error);
            alert('Hubo un error al realizar la búsqueda.');
        });
}