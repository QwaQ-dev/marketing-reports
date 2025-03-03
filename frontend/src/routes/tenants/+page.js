// import commonStore from "../../stores/commonStore"

// /** @type {import('./$types').PageLoad} */
// export async function load(args) {
//     console.log('load begin')
//     commonStore.setIsLoading(true);
//     await timeout();
//     try {
//         const response = await fetch("http://localhost:8080/api/v1/tenants", {
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//         });
//         const resp = await response.json();
//         console.log('tenants resp', resp);
//         return {
//             tenants: resp.tenants
//         };
//     } catch (e) {

//     } finally {
//         console.log('load finally')
//         commonStore.setIsLoading(false);
//     }
// }