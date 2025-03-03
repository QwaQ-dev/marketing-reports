<script>
    import LoaderMain from '../lib/components/LoaderMain.svelte';
    import NavBar from "../lib/components/NavBar.svelte";
    export let data;
</script>

<LoaderMain/>

{#if data.noLayout}
    <slot />
{:else}
    <div>
        <main>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container">
                    <a class="navbar-brand" href="/board">Маркетинговые отчеты</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Партнеры</a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link" href="/tenants">Филиал</a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link" href="/form">Загрузить файлы</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <slot />
        </main>
    </div>
{/if}

<style>

</style>
