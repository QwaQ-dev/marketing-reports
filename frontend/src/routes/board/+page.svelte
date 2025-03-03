<script>
    import { onMount } from 'svelte';
    import * as apiService from  "../../lib/apiService";
    import commonStore from "../../stores/commonStore.js";
    import {get} from "svelte/store";
    import reportsStore from "../../stores/reportsStore.js";

    const getReports = async () => {
        console.log('getReports');
        try {
            commonStore.setIsLoading(true);
            console.log(get(commonStore).selectedTenant)
            const response = await apiService.getReports({tenant_id: get(commonStore).selectedTenant.tenantId});
            console.log('getReports response', response);
            if (response.ok) {
                reportsStore.setReports(response.result.reports)
            }
        } catch (e) {
            console.log('err', e.toString())
            alert("Ошибка при выполнении запроса");
        } finally {
            commonStore.setIsLoading(false);
        }
    }

    onMount(async () => {
        await getReports();
    });
</script>


<div style="overflow: auto">
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Месяц</th>
                <th scope="col">Год</th>
                <th scope="col">Наименование</th>
            </tr>
        </thead>
        <tbody>
            {#each $reportsStore.list as report}
                <tr>
<!--                    <th scope="row">1</th>-->
                    <td>{report.id}</td>
                    <td>{report.month}</td>
                    <td>{report.year}</td>
                    <td>{report.name}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>

</style>
