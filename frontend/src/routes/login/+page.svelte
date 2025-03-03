<script>
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import commonStore from "../../stores/commonStore";
    import * as apiService from  "../../lib/apiService";
    import {get} from "svelte/store";

    // let userName = 'viktor.loginov';
    let userName = 'admin';

    const onLogIn = async () => {
        console.log('onLogIn');
        try {
            commonStore.setIsLoading(true);
            const responseAuth = await apiService.auth({userName});

            if (responseAuth.ok) {

                commonStore.setUser(responseAuth.result.user);
                if (get(commonStore).user.tenants.length > 1) {
                    goto('/tenants');
                } else {
                    goto('/board');
                }
            }
        } catch (e) {
            console.log('err', e.toString())
            alert("Ошибка при выполнении запроса");
        } finally {
            commonStore.setIsLoading(false);
        }
    }

    onMount(() => {

    });
</script>

<div style="height: 100vh; width: 100vw; display: flex; justify-content: center; align-items: center">
    <form on:submit|preventDefault={onLogIn}>
        <label style="display: flex; flex-direction: column; margin: 10px">
            Username:
            <input type="text" bind:value={userName} required />
        </label>
        <button type="submit" style="margin: 10px;">Login</button>
    </form>

</div>

<style>
</style>
