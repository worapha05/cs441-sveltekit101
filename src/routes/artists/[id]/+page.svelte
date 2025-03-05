<script lang="ts">
    import type { PageProps } from "./$types"
    import type { Artist } from "$lib/types/music"

    let { data } : PageProps = $props()
    let artist : Artist = data.artist
    
</script>

<div>
    Artist ID: { artist.id }

    <div>
        <p>{artist.name}</p>
        <p>{artist.song_count} song(s)</p>
    </div>
    
</div>