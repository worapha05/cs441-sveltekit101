<script lang="ts">
    import { goto } from '$app/navigation'
    import { applyAction, enhance } from '$app/forms'
    import type { PageProps } from './$types'

    let { form } : PageProps = $props()

    let name = form?.name || ''
    let isSubmitting = false

</script>

<h1 class="text-3xl mb-4">
    Create New Artist 
</h1>

<form method="POST" action="?/create" 
    use:enhance={({ formElement, formData, action, cancel }) => {
        return async ({ result }) => {
            isSubmitting = true
            console.log("result:", result)
            if (result.type === 'success' && result.data && result.data.redirectTo) {
                goto(String(result.data.redirectTo))
            } else {
                await applyAction(result)
            }
            isSubmitting = false
        }
    }}
>
    <div class="p-4">
        <label for="name" class="block mb-1 font-medium">Artist Name</label>
        {#if form && !form.success && form.message}
            <p class="text-red-500 text-sm mb-2">{form.message}</p>
        {/if}
        <input 
            type="text" 
            id="name"
            class="border rounded-lg p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-green-300"
            name="name"
            bind:value={name}
           
            placeholder="Artist name"
            autocomplete="off"
        >
    </div>

    <div class="p-4">
        <button 
            type="submit" 
            class="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors
                disabled:bg-green-300 disabled:cursor-not-allowed"
            disabled={isSubmitting}
        >
            {isSubmitting ? 'Creating...' : 'Create Artist'}
        </button>
    </div>
    
</form>