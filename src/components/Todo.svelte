<script>
    import { createEventDispatcher } from "svelte"
    export let completed;
    export let id;
    export let title;
    export let userId;

    const dispatch = createEventDispatcher();

    function handler(type, payload) {
        dispatch(type, payload)
    }
</script>

<div class="my-10 p-10 bg-white shadow-lg border-solid border-black w-100 relative" data-testid="todo-{id}">
    <div class="bg-red-500 h-10 w-10 absolute flex items-center justify-center left-0 top-0 rounded-br-xl">
        <p class="text-white">{id}</p>
    </div>
    <button on:click="{handler('delete', id)}"
        class="btn bg-red-500 h-10 absolute flex items-center justify-center w-36 cursor-pointer right-0 top-0 rounded-bl-xl"
        data-testid="todo-delete-{id}">
        delete
    </button>
    <div>
        <p class="text-4xl text-gray">{title}</p>
        <p class="text-base text-small">Created by user {userId}</p>
    </div>
    <hr class="my-5">
    <div id="status">
        <p>
            <span class="mr-5"> Status: </span>
            {#if completed}
            <span class="text-white bg-green-500 p-3">Finish</span>
            {:else}
            <span class="text-white bg-red-500 p-3">Not finish</span>
            {/if}
        </p>
    </div>
    <div class="flex gap-5 mt-5">
        <p>Detail</p>
        <button data-testid="todo-show-{id}" on:click="{handler('show', id)}" class="bg-blue-500 btn">
            Detail Todo
        </button>
    </div>
</div>