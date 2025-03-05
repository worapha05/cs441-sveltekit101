<script lang="ts">
    import { goto } from '$app/navigation'
    import type { PageData } from './$types'
    import type { User } from '$lib/types/auth'

    export let data: PageData

    let user: User = data.user
    
    const primaryBackground = "bg-blue-500 hover:bg-blue-600"
    const dangerBackground = "bg-red-500 hover:bg-red-600"
    const buttonClass = `inline-block px-4 py-2 ${primaryBackground} text-white font-medium rounded-lg  transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 shadow-sm`

    function handleLogout() {
        goto('/logout');
    }
</script>

<div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">My Profile</h1>

    <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="p-6 md:p-8 flex flex-col md:flex-row gap-8">
            <div class="w-full md:w-1/3 flex flex-col items-center">
                <h2 class="text-xl font-semibold mt-4">{user.name}</h2>
                <p class="text-gray-500">{user.email}</p>
            </div>
            
            <div class="w-full md:w-2/3 mt-6 md:mt-0">
                <div class="grid grid-cols-1 gap-4">
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="text-sm font-medium text-gray-500">ชื่อ</h3>
                        <p class="mt-1 text-lg">{user.name}</p>
                    </div>

                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="text-sm font-medium text-gray-500">อีเมล</h3>
                        <p class="mt-1 text-lg">{user.email}</p>
                    </div>

                    {#if user.created_at}
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <h3 class="text-sm font-medium text-gray-500">วันที่สมัครสมาชิก</h3>
                            <p class="mt-1 text-lg">{new Date(user.created_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    {/if}
                </div>
                
                <div class="mt-8 flex flex-wrap gap-4">
                    <a href="/profile/edit" class={buttonClass}>
                        แก้ไขโปรไฟล์
                    </a>
                    
                    <a href="/" class={buttonClass.replace(primaryBackground, 'bg-gray-500 hover:bg-gray-600')}>
                        กลับหน้าหลัก
                    </a>
                    
                    <button 
                        on:click={handleLogout}
                        class={buttonClass.replace(primaryBackground, dangerBackground)}
                    >
                        ออกจากระบบ
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>