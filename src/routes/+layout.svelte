<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<nav class="flex justify-between pt-2 px-2">
	<div class="flex space-x-3">
		<a href="/">Home</a>
		<a href="/artists">Artists</a>
	</div>
	<div class="flex space-x-3">
		<a href="/profile">Profile</a>
		<a href="/login">Login</a>
	</div>
</nav>

<section class="min-h-[50vh]">
{@render children()}
</section>

<footer>
	<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
</footer>