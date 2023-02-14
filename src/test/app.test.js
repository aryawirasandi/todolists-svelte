import { render, cleanup, fireEvent, screen, waitFor, waitForElementToBeRemoved, act } from "@testing-library/svelte";
import App from "../App.svelte";

describe("App.svelte", () => {
    let el;
    beforeEach(async () => {
        el = await render(App);
    })
    afterEach(() => {
        cleanup();
    });

    it('Component Is Mount', () => {
        expect(el.container).toBeTruthy();
    });

    it("get todo lists", async () => {
        expect(screen.getByText("Loading....")).toBeTruthy();
        expect(await screen.findByTestId('todo-1')).toBeTruthy()
        expect(await screen.findByTestId('todo-2')).toBeTruthy()
        expect(screen.queryByTestId('todo-3')).toBeFalsy();
        expect(await (await screen.findByTestId('todo-1')).querySelector("#status > p > span:nth-child(2)").textContent).toEqual("Not finish");
        expect(await (await screen.findByTestId('todo-2')).querySelector("#status > p > span:nth-child(2)").textContent).toEqual("Finish");
    });


    it("can delete a todo", async () => {
        const targetId = 1;
        const todoDeleteTrigger = await screen.findByTestId(`todo-delete-${targetId}`);
        const selectedTodo = await screen.findByTestId(`todo-${targetId}`);
        expect(selectedTodo).toBeTruthy();
        await fireEvent.click(todoDeleteTrigger);
        expect(screen.queryByTestId(`todo-${targetId}`)).not.toBeTruthy();
    })

    it.todo("can update a todo", async () => {
        const targetId = 1;
        const todoUpdateTrigger = el.getByTestId(`update-todo-${targetId}`);
        const expectedText = "sunt aut facere repellat provident occaecati excepturi optio reprehenderit";
        const postText = "A Testing Todo Here";

        await fireEvent.click(todoUpdateTrigger);

        const form = el.getByTestId("form-submit");

        expect(form).toBeTruthy();

        const updateInput = form.querySelector("input[type='text']");
        const userSelect = el.getByTestId("userSelect");
        const statusSelect = el.getByTestId("statusSelect");
        const userSelectOption = el.getAllByTestId("user-option");
        const updateData = el.getByTestId("update-data");

        expect(updateInput.value).toBe(expectedText);
        expect(userSelect.value).toBe(1);
        expect(statusSelect.value).toBe(false);
        expect(userSelectOption.value).toBe(1);

        fireEvent.change(updateInput, {
            target: {
                value: postText
            }
        });

        fireEvent.change(userSelect, {
            target: {
                value: 2
            }
        });

        fireEvent.change(statusSelect, {
            target: {
                value: true,
            }
        });

        fireEvent.change(userSelectOption, {
            target: {
                value: 2
            }
        });

        await fireEvent.click(updateData);


        expect(updateInput.value.length).toBe(0);
        expect(userSelect.value).toBe(1);
        expect(statusSelect.value).toBe(false);
        expect(userSelectOption.value).toBe(1);

        const selectedTodo = el.getByTestId(`todo-${targetId}`);

        expect(selectedTodo.getByText("A Testing Todo Here")).toBeTruthy();
        expect(selectedTodo.getByText(`Created by user ${targetId}`)).toBeTruthy();
        expect(selectedTodo.getByText("Finish")).toBeTruthy();

    });

    it("submit todo at form", async () => {

        const buttonAdd = screen.getByTestId("add-todo");

        await fireEvent.click(buttonAdd)

        const form = await screen.getByTestId("form-submit");

        expect(form).toBeTruthy();

        const input = await screen.findByTestId("title");
        const userSelect = await screen.findByTestId("userSelect");
        const statusSelect = await screen.findByTestId("statusSelect");
        const userSelectOption = screen.getAllByTestId("user-option");
        const submitData = await screen.findByTestId("submit-data");


        fireEvent.change(userSelect, {
            target: {
                value: 2
            }
        });

        expect(userSelectOption[1].selected).toBeTruthy();

        await act(() => fireEvent.input(input, {
            target: {
                value: "A Testing Todo Here"
            }
        }));

        await fireEvent.change(statusSelect, {
            target: {
                value: true
            }
        });



        expect(input.value).toEqual("A Testing Todo Here");
        expect(statusSelect.value).toBe('true');

        fireEvent.click(submitData);

        console.log({
            input: input
        })
        expect(await (await screen.findByTestId("result")).textContent).toBe("A Testing Todo Here");
    })

    it.todo("can show a todo", async () => {
        const targetId = 1;
        const todoUpdateTrigger = el.getByTestId(`todo-show-${targetId}`);
        const expectedText = "sunt aut facere repellat provident occaecati excepturi optio reprehenderit";

        await fireEvent.click(todoUpdateTrigger);

        const modalDisplay = screen.getByTestId("modal-display-todo");

        expect(modalDisplay).toBeTruthy();

        expect(modalDisplay.querySelector("p:nth-child(1)").textContent).toBe(`Created by user ${1}`)
        expect(modalDisplay.querySelector("p:nth-child(2)").textContent).toBe(expectedText);
    })

    it("select the option user", async () => {
        const button = el.getByTestId("add-todo");
        await fireEvent.click(button)
        const userSelect = el.getByTestId("userSelect");
        const userSelectOption = el.getAllByTestId("user-option");


        expect(userSelect).toBeTruthy();
        expect(userSelectOption).toBeTruthy();

        fireEvent.change(el.getByTestId("userSelect"), {
            target: {
                value: 1
            }
        })

        expect(userSelectOption[0].selected).toBeTruthy();
        expect(userSelectOption[1].selected).toBeFalsy();

        fireEvent.change(el.getByTestId("userSelect"), {
            target: {
                value: 2
            }
        })

        expect(userSelectOption[1].selected).toBeTruthy();
        expect(userSelectOption[0].selected).toBeFalsy();

    });

    it("select option status", async () => {
        const button = el.getByTestId("add-todo");
        await fireEvent.click(button)
        const statusSelect = el.getByTestId("statusSelect");
        const statusSelectOption = el.getAllByTestId("status-option");
        expect(statusSelect).toBeTruthy();
        expect(statusSelectOption).toBeTruthy();

        fireEvent.change(el.getByTestId("statusSelect"), {
            target: {
                value: true
            }
        })

        expect(statusSelectOption[0].selected).toBeTruthy();
        expect(statusSelectOption[1].selected).toBeFalsy();

        fireEvent.change(el.getByTestId("statusSelect"), {
            target: {
                value: false
            }
        })

        expect(statusSelectOption[1].selected).toBeTruthy();
        expect(statusSelectOption[0].selected).toBeFalsy();
    });
})