export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) return

    const { $waitForAuth, $user } = useNuxtApp()

    const publicPages = ['/home', '/about', '/auth', '/privacy', '/terms', '/refund-policy', '/data-deletion']

    // Wait for Firebase to check current session
    const user = await ($waitForAuth as any)()

    if (!user && !publicPages.includes(to.path)) {
        return navigateTo('/home')
    }

    if (user && to.path === '/auth') {
        return navigateTo('/')
    }
})
