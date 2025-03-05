<script lang="ts">
    import type { PageProps } from "./$types"
    import type { Artist } from "$lib/types/music"

    let { data } : PageProps = $props()
    let artist : Artist = data.artist

    const linkStyle = "inline-block px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 shadow-sm"
    
</script>

<div class="p-4">
    Artist ID: { artist.id }

    <div>
        <p>{artist.name}</p>
        <p>{artist.song_count} song(s)</p>
    </div>

    <div class="mt-8">
        <a class={linkStyle}
            href={`/artists/${artist.id}/edit`}>
            Edit Artist
        </a>
    </div>
</div>

<script lang="ts">
    import type { PageProps } from "./$types"
    import type { Artist } from "$lib/types/music"

    let { data } : PageProps = $props()
    let artist : Artist = data.artist

    const linkStyle = "inline-block px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 shadow-sm"
    
</script>

<div class="p-4">
    Artist ID: { artist.id }

    <div>
        <p>{artist.name}</p>
        <p>{artist.song_count} song(s)</p>
    </div>

    <div class="mt-8">
        <a class={linkStyle}
            href={`/artists/${artist.id}/edit`}>
            Edit Artist
        </a>
    </div>
</div>

