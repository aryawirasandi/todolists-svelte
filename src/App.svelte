<script>
    import { onMount } from "svelte";
    import { apiWrapper } from "./config/api";
    import Todo from "./components/Todo.svelte";
    export let todos = [];
    let users = [1,2,3,4,5]
    let selected = users[0];
    let condition = false;
    let toggleForm = false;
    let todo = "";
    onMount(async () => {
        var result = await apiWrapper('todos');
        todos = result.splice(0, 10);
    });
</script>

<main class="relative m-4">
    <form data-testid="form-submit" class="border-solid border-black border-2 flex flex-col w-1/4 p-10 absolute z-1 right-1/2 top-[1/2] mt-10 translate-x-1/2 bg-blue-200">
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
                <input type="text"  data-testid="title" placeholder="input your todo" name="title" class="p-3 border-solid border-blue-500 border-2 focus:outline-double w-full">
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
            <button class="border-white border-solid bg-gray-400 text-white p-3 rounded-lg w-full">Submit</button>
        </div>
    </form>
<button class="bg-blue-600 text-white p-4 rounded-sm hover:opacity-50 transition ease-in-out delay-150">Add Todo</button>
    <div class="overflow-y-scroll border-solid border-black">
        {#if todos.length === 0}
            <div>
                There is not todo here
            </div>
        {:else}
            {#each todos as todo}
                <Todo {...todo}/>
            {/each}
        {/if}
    </div>
</main>