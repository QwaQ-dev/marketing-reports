<script>
    import { onMount } from 'svelte';
    import {goto} from "$app/navigation";
    import * as apiService from  "../../lib/apiService";
    import commonStore from "../../stores/commonStore.js";
    import {get} from "svelte/store";
    import tenantsStore from "../../stores/tenantsStore.js";

    let selectedTenant = get(commonStore).selectedTenant;


    const onSelectTenant = () => {
        commonStore.setTenant(selectedTenant);
        goto('/board');
    }


    $: isDisabledConfirm = () => {
        const isDisabled = selectedTenant ? false : true;
        return isDisabled;
    }

    onMount(async () => {
        const user = get(commonStore).user; 
        try {
            const tenantList = await Promise.all(
                user.tenants.map(async (tenantCode) => {
                    const response = await apiService.getTenantsByCode({ tenantCode }); // Запрос к API
                    if (response.ok) {
                        return {
                            tenantId: response.result.id,
                            tenantCode: tenantCode 
                        };
                    } else {
                        console.error(`Failed to fetch tenant for code: ${tenantCode}`, response.statusText);
                        return null;
                    }
                })
            );

            const filteredTenants = tenantList.filter((tenant) => tenant !== null);

            // Сохраняем валидные данные в tenantsStore
            tenantsStore.setTenants(filteredTenants);
        } catch (error) {
            console.error("Error fetching tenants:", error);
        }
    });




</script>

<div class="TenantSelectorWrap">
    <div class="TenantSelector" style="padding: 20px">
        {#if $tenantsStore.list.length}
            <select 
                class="form-select" 
                aria-label="Default select example" 
                bind:value={selectedTenant}>
                <option value={null} disabled>Выберите филиал...</option>
                {#each $tenantsStore.list as tenant}
                    <option value={tenant}>{tenant.tenantCode}</option> <!-- Передаем весь объект tenant -->
                {/each}
            </select>
            <div style="height: 20px"></div>
            <div style="display: flex; flex-direction: row-reverse">
                <button type="button" class="btn btn-primary" disabled={isDisabledConfirm()} on:click={onSelectTenant}>Ok</button>
            </div>
        {/if}
    </div>
</div>

<style>
    .TenantSelectorWrap {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #00000075;
    }

    .TenantSelector {
        position: absolute;
        left: 50%;
        top: 25%;
        transform: translate(-50%, 0);
        background-color: #fff;
        height: 50%;
        width: 50%;
        display: flex;
        flex-direction: column;
    }
</style>

