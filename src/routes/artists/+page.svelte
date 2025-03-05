<script lang="ts">
    import type { PageProps } from "../$types"
    import type { Artist } from "$lib/types/music"

    let { data } = $props() as PageProps & { data: { artists: Artist[] } }
    const artists: Artist[] = data.artists
    
</script>

<h1 class="mb-3">Artists</h1>

<a href="/artists/create" class="underline">
    Create New Artist
</a> 

{#each artists as artist}
    <div class="px-4 py-1">
        <a href={`/artists/${artist.id}`}>
            { artist.name }
        </a>
    </div>
{/each}
