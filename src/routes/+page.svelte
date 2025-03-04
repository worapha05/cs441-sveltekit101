<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->

<script>
    import Hello from "$lib/components/Hello.svelte";
    let imageURL = "/images/cat.jpg";
</script>

<h1 class="text-3xl">Welcome to SvelteKit</h1>
<Hello text="World" number={400}></Hello>
<Hello text="Svelte"></Hello>
<img src={imageURL} class="w-50"/>