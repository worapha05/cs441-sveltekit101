import { redirect, type Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {

    const protectedRoutes = ['/profile', '/profile/edit', '/logout']

    const guessOnlyRoutes = ['/login']

    const path = event.url.pathname
    const token = event.cookies.get('token')
    const isLoggedIn = !!token


    if (protectedRoutes.some(route => path.startsWith(route)) && !isLoggedIn) {
        throw redirect(303, '/login')
    }

    if (guessOnlyRoutes.includes(path) && isLoggedIn) {
        throw redirect(303, '/')
    }

    return resolve(event)
}