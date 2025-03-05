<script lang="ts">
    import { goto } from '$app/navigation'
    import { applyAction, enhance } from '$app/forms'
    import type { PageProps } from './$types'

    let { form } : PageProps = $props()
    
    let email = form?.email || ''
    let password = ''
    let isSubmitting = false
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">เข้าสู่ระบบ</h1>
        
        {#if form?.message && !form?.success}
            <div class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {form.message}
            </div>
        {/if}

        <form method="POST" action="?/login" 
            use:enhance={({ formElement, formData, action, cancel }) => {
                isSubmitting = true

                return async ({ result }) => {
                    console.log("login result:", result)
                    if (result.type === 'success') {
                        if (result.data?.redirectTo) {
                            goto(String(result.data.redirectTo))
                        } else {
                            goto('/profile')
                        }
                    } else {
                        await applyAction(result)
                    }
                    isSubmitting = false
                }
            }}
        >
            <div class="mb-4">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-700">อีเมล</label>
                <input 
                    type="email" 
                    id="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="email"
                    bind:value={email}
                    placeholder="user@example.com"
                    autocomplete="email"
                    required
                />
            </div>

            <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-700">รหัสผ่าน</label>
                <input 
                    type="password"
                    id="password"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="password"
                    bind:value={password}
                    placeholder="รหัสผ่านของคุณ"
                    autocomplete="current-password"
                    required
                />
            </div>

            <button 
                type="submit" 
                class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
        </form>

    </div>
</div>