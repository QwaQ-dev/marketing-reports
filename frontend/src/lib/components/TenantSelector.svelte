<script>
    import {onMount} from 'svelte';
    // import {get_current_component} from 'svelte/internal';
    onMount(() => {});

</script>

<div class="TenantSelector">
    <div class="Activity">

    </div>
</div>

<style>
    .TenantSelector {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #00000075;
    }

    .Activity {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        background-color: #fff;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
