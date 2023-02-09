import { render, cleanup, fireEvent, screen, waitFor } from "@testing-library/svelte";
import App from "../App.svelte";

describe("App.svelte", () => {
    let el;
    beforeEach(() => {
        el = render(App);
    })
    afterEach(() => {
        cleanup();
    });

    it('Component Is Mount', () => {
        expect(el.container).toBeTruthy();
    });

    it("get todo lists", async () => {
        expect(screen.getByText("Loading....")).toBeTruthy();
        await waitFor(() => screen.getAllByTestId("todolists"));
        expect(screen.queryAllByTestId('todolists')[0]).toBeTruthy()
        expect(screen.queryAllByTestId('todolists')[1]).toBeTruthy()
        expect(screen.queryAllByTestId('todolists')[2]).toBeFalsy();
        expect(screen.queryAllByTestId('todolists')[0].querySelector("#status > p > span:nth-child(2)").textContent).toEqual("Not finish");
        expect(screen.queryAllByTestId('todolists')[1].querySelector("#status > p > span:nth-child(2)").textContent).toEqual("Finish");
    });

    it.todo("submit todo at form", async () => {

        const buttonAdd = el.getByTestId("add-todo");

        await fireEvent.click(buttonAdd)

        const form = el.getByTestId("form-submit");

        expect(form).toBeTruthy();

        const input = form.querySelector("input[type='text']");
        const userSelect = el.getByTestId("userSelect");
        const statusSelect = el.getByTestId("statusSelect");
        const userSelectOption = el.getAllByTestId("user-option");
        const submitData = el.getByTestId("submit-data");


        fireEvent.change(userSelect, {
            target: {
                value: 2
            }
        });

        expect(userSelectOption[1].selected).toBeTruthy();

        fireEvent.change(input, {
            target: {
                value: "A Testing Todo Here"
            }
        });

        fireEvent.change(statusSelect, {
            target: {
                value: true
            }
        });

        await fireEvent.click(submitData);

        await waitFor(() => screen.getAllByTestId("modal-success"))

        expect(form).not.toBeTruthy();

        expect(screen.getByTestId("modal-success")).toBeTruthy();

        const element = el.queryAllByTestId("todolists");

        expect(element[0]).toBeTruthy();

        expect(modal).toBeInTheDocument();

    })

    it.todo("can update a todo", () => {

    });

    it.todo("can show a todo", () => { })

    it.todo("can delete a todo", () => { })

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

    it.todo("get todo lists with request api", () => { });
})