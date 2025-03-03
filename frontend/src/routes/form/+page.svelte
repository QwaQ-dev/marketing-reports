<script>
    import { onMount } from 'svelte';
    import { getPartners } from '../../lib/apiService';
    import { get } from 'svelte/store';
    import commonStore from '../../stores/commonStore';

    let selectedDate = null;
    let files = [];
    let userPartners = [];
    let selectedPartner = "";

    let selectedFileName = "Выберите файл";

    function handleFileUpload(event) {
        const newFiles = Array.from(event.target.files); 
        files = [...files, ...newFiles];
        
        // Убираем возможные дубли
        const uniqueFiles = Array.from(new Set(files.map(file => file.name)))
            .map(name => files.find(file => file.name === name));
        
        files = uniqueFiles;

        selectedFileName = files.length > 0 
            ? files.map(file => file.name).join(", ") 
            : "Выберите файл";
    }

    function removeFile(fileName) {
        files = files.filter(file => file.name !== fileName); 
    }   

    // Получение партнеров
    async function fetchPartners() {
        try {
            const selectedTenant = get(commonStore).selectedTenant.tenantCode; 
            console.log(selectedTenant);
            const partners = await getPartners(selectedTenant);

            userPartners = partners.result.partners.map(partner => ({
                id: partner.id,
                name: partner.name
            })) || [];
            
        } catch (error) {
            console.error("Ошибка при запросе партнеров:", error);
        }
    }


    // Инициализация
    onMount(() => {
        fetchPartners();
    });

    // Отправка формы
    async function submitForm(event) {
        event.preventDefault();

        const formData = new FormData();

        try {
            const postTenant = get(commonStore).selectedTenant;
            const user = get(commonStore).user;

            formData.append("date", selectedDate);
            formData.append("username", user.name);
            formData.append("userId", user.id);
            formData.append("partnerId", selectedPartner);
            formData.append("tenantId", postTenant.tenantId);

            files.forEach((file) => formData.append("files", file));

            const response = await fetch("http://localhost:8080/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                console.error("Ошибка загрузки файлов:", response.statusText);
                return;
            }

            console.log("Файлы успешно загружены!");
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
        }
    }
</script>

<div class="container">
    <form on:submit|preventDefault={submitForm} >
        <div class="upload-files">
            <div class="file-upload">
                <label for="fileInput" class="custom-file-label">Добавить файлы</label>
                <input 
                    type="file" 
                    id="fileInput" 
                    class="custom-file-input" 
                    on:change={handleFileUpload} 
                    multiple 
                />
            </div>
            
            <ul class="file-list" style="color: #fff">
                {#each files as file (file.name)}
                    <li class="file-item">
                        {file.name}
                        <button type="button" class="remove-btn" on:click={() => removeFile(file.name)}>Удалить</button>
                    </li>
                {/each}
            </ul>
        </div>

        <!-- Выбор партнера -->
        <h2 class="select-partner">Выберите партнера:</h2>
        <select style="color: #fff;" bind:value={selectedPartner}>
            {#each userPartners as partner}
                <option  value={partner.id}>{partner.name}</option>
            {/each}
        </select>

        <!-- Выбор даты -->
        <h2 class="select-date">Выберите дату:</h2>
        <input type="date" bind:value={selectedDate} />

        <!-- Кнопки -->
        <div class="buttons">
            <button type="submit" class="submit-1">Загрузить файлы</button>
        </div>
    </form>
</div>

<style>

    * {
        font-family: "Montserrat", serif;
    }

    .file-list {
        list-style: none; 
        padding: 0;
        margin: 10px 0;
    }

    .upload-files {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    .file-item {
        display: flex;
        width: 100%;
        justify-content: space-between; 
        align-items: center;
        background-color: #555555; 
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 5px;
    }

    .remove-btn {
        background-color: #ff5555;
        border: none;
        border-radius: 5px;
        color: white;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 14px;
    }

    .remove-btn:hover {
        background-color: #ff7777; 
    }

    .file-upload {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .custom-file-label {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #555555;
        color: #f0f0f0;
        width: 100%;
        height: 50px;
        border-radius: 10px;
        cursor: pointer;
        text-align: center;
        font-size: 16px;
        transition: background-color 0.3s;
        padding: 20px;
    }

    .custom-file-label:hover {
        background-color: #777777;
    }

    .custom-file-input {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }

    select,
    input[type="date"] {
        width: 50%;
        padding: 10px;
        background-color: #555555;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        color: #fff;
    }

    
    button {
        margin: 10px 20px;
    }

    form {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .submit-1 {
        background-color: #555555;
        color: #f0f0f0;
        padding: 10px 20px;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
    }


    .submit-1:hover {
        cursor: not-allowed;
    }

    .container {
        display: flex;
        justify-content: center;
        width: 30vw;
        height: 100vh;
        
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
</style>
