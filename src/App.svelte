<script>
    import { onMount } from "svelte";
    import { apiWrapper, store } from "./config/api";
    import Todo from "./components/Todo.svelte";
    export let todos = [];
    let users = [1,2,3,4,5]
    let selected = users[0];
    let condition = false;
    let toggleForm = false;
    let todo = "";
    let toggleModal = false;
    
    async function getTodos(){
        try {
            let response = await apiWrapper("todos");
            todos = response;
        } catch (error) {
            throw new Error("Someting wrong : " + error);
        }
    }

    let todosRequest = getTodos();

    async function createTodos(){
        try {
            let response = await store("todos", {
                body : {
                    title : todo,
                    body: todo,
                    completed: condition,
                    user: selected
                }
            });
            console.log(response);
        } catch (error) {
            throw new Error("Something wrong : " + error);
        }
    }


    function triggerModal(){
        toggleForm = !toggleForm;
    }

    function storeTodo(){
        // toggleForm = !toggleForm;
        // toggleModal = !toggleModal;
        createTodos();
    }
    
</script>

<main class="relative p-4">
    {#if toggleForm}
        <form 
            data-testid="form-submit"
            class="z-1 border-solid border-black border-2 flex flex-col w-1/4 p-10 absolute right-1/2 top-[1/2] mt-10 translate-x-1/2 bg-blue-200"
            on:submit|preventDefault={storeTodo}
            >
            <label for="user">
                User Selected
                <select data-testid="userSelect" bind:value={selected} class="w-full">
                    <option disabled>Select your user</option>
                    {#each users as user }
                        <option data-testid="user-option" value={user}>{user}</option>
                    {/each} 
                <select/>
            </label>
            <div class="my-2">
                <label for="title">
                    Title
                    <input type="text"  data-testid="title" placeholder="input your todo" name="title" class="p-3 border-solid border-blue-500 border-2 focus:outline-double w-full" bind:value={todo}>
                </label>
            </div>
            <div class="my-2">
                <label for="status">
                    Status
                    <select data-testid="statusSelect" name="status" bind:value={condition} class="p-3 border-solid border-blue-500 border-2 focus:outline-double w-full">
                        <option disabled selected>Select status of todo </option>
                        <option data-testid="status-option" value={true}>Finish</option>
                        <option data-testid="status-option" value={false}>Not Finish Finish</option>
                    </select>
                </label>
            </div>
            <div class="my-2">
                <button class="border-white border-solid bg-gray-400 text-white p-3 rounded-lg w-full" data-testid="submit-data">Submit</button>
            </div>
        </form>
    {/if}
    {#if toggleModal}
        <div class="border-solid border-black border-2 flex flex-col w-1/4 p-10 absolute z-1 right-1/2 top-[1/2] mt-10 translate-x-1/2 bg-blue-200" data-testid="modal-success">
            <div class="text-center">
                <p>Success Add Todo</p>
            </div>
        </div>
    {/if}
    <button 
        on:click={triggerModal}
        class="bg-blue-600 text-white p-4 rounded-sm hover:opacity-50 transition ease-in-out delay-150"
        data-testid="add-todo">
        Add Todo
    </button>
    <div class="overflow-y-scroll border-solid border-black">
        {#await todosRequest }
            <p>Loading.... </p>
        {:then}
            {#if todos.length == 0}
                <div>
                    There is not todo here
                </div>
            {:else}
            {#each todos as todo}
                <Todo {...todo}/>
            {/each}
            {/if}
        {:catch error}
            <p>Something was wrong : {error}</p>
        {/await}
    </div>
</main>
{#if toggleForm}
    <button class="bg-black top-0 opacity-25 absolute w-full h-full" on:click={triggerModal}>
    </button>  
{/if}