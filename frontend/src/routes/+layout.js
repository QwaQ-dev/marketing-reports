export async function load({ route }) {
    return {
        noLayout: route.id === '/login' || route.id === '/tenants'
    };
}