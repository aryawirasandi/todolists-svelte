<script>
    import { onMount } from "svelte";
    import { apiWrapper } from "./config/api";
    import Todo from "./components/Todo.svelte";
    let todos = [];
    let users = [1,2,3,4,5]
    let selected = users[0];
    let condition = false;
    onMount(async () => {
        var result = await apiWrapper('todos');
        todos = result.splice(0, 10);
    });
</script>

<form class="border-solid border-black border-2">
    <div>
        <select bind:value={selected}>
            {#each users as user }
                <option value={user}>{user}</option>
            {/each} 
        <select/>
    </div>
    <div>
        <label for="title">
            Title
            <input type="text" id="title" name="title">
        </label>
    </div>
    <div>
        <select>
            <option></option>
        </select>
    </div>
</form>
<div class="overflow-y-scroll border-solid border-black">
    {#each todos as todo}
        <Todo {...todo}/>
    {/each}
</div>