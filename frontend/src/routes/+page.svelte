<script>
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import { navigating } from '$app/stores';

    // let userName = 'viktor.loginov';
    let userName;

    onMount(() => {
        if (!userName) {
            goto('/login');
        } else {
            goto('/tenants');
        }
    });
</script>
