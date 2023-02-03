<script>
    export let completed;
    export let id;
    export let title;
    export let userId;
</script>

<div class="my-5 p-10 bg-white shadow-lg border-solid border-black w-100 relative">
    <div class="bg-red-500 h-10 w-10 absolute flex items-center justify-center left-0 top-0 rounded-br-xl">
        <p class="text-white">{id}</p>
    </div>
    <div>
        <p class="text-4xl text-gray">{title}</p>
        <p class="text-base text-small">Created by user {userId}</p>
    </div>
    <hr class="my-5">
    <div>
        <p>
            <span class="mr-5"> Status: </span>
            {#if completed}
                <strike class="text-white bg-green-500 p-3">Finish</strike>
            {:else}
                <span class="text-white bg-red-500 p-3">Not finish</span>
            {/if}
        </p>
    </div>
</div>