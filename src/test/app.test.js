import { render, cleanup, fireEvent, screen, waitFor } from "@testing-library/svelte";
import App from "../App.svelte";

describe("App.svelte", () => {

    afterEach(() => {
        cleanup();
    });

    it('Component Is Mount', () => {
        const { container } = render(App);
        expect(container).toBeTruthy();
    });

    it("get todo lists", async () => {
        render(App);
        expect(screen.getByText("Loading....")).toBeTruthy();
        await waitFor(() => screen.getAllByTestId("todolists"));
        expect(screen.queryAllByTestId('todolists')[0]).toBeTruthy()
        expect(screen.queryAllByTestId('todolists')[1]).toBeTruthy()
        expect(screen.queryAllByTestId('todolists')[2]).toBeFalsy();
        expect(screen.queryAllByTestId('todolists')[0].querySelector("#status > p > span:nth-child(2)").textContent).toEqual("Not finish");
        expect(screen.queryAllByTestId('todolists')[1].querySelector("#status > p > span:nth-child(2)").textContent).toEqual("Finish");
    });

    it.todo("submit todo at form", async () => {
        const { getByTestId, getAllByTestId, queryAllByTestId } = render(App);

        const button = getByTestId("add-todo");

        await fireEvent.click(button)

        const form = getByTestId("form-submit");

        expect(form).toBeTruthy();

        const input = form.querySelector("input[type='text']");
        const userSelect = getByTestId("userSelect");
        const statusSelect = getByTestId("statusSelect");
        const userSelectOption = getAllByTestId("user-option");
        const submitData = getByTestId("submit-data");


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

        const modal = await waitFor(() => screen.getAllByTestId("modal-success"))

        expect(form).not.toBeTruthy();

        expect(modal).toBeTruthy();

        const element = queryAllByTestId("todolists");

        expect(element[0]).toBeTruthy();

        expect(modal).toBeInTheDocument();

    })

    it.todo("can update a todo", () => {

    });

    it.todo("can show a todo", () => { })

    it.todo("can delete a todo", () => { })

    it("select the option user", async () => {
        const { getByTestId, getAllByTestId } = render(App);
        const button = getByTestId("add-todo");
        await fireEvent.click(button)
        const userSelect = getByTestId("userSelect");
        const userSelectOption = getAllByTestId("user-option");


        expect(userSelect).toBeTruthy();
        expect(userSelectOption).toBeTruthy();

        fireEvent.change(getByTestId("userSelect"), {
            target: {
                value: 1
            }
        })

        expect(userSelectOption[0].selected).toBeTruthy();
        expect(userSelectOption[1].selected).toBeFalsy();

        fireEvent.change(getByTestId("userSelect"), {
            target: {
                value: 2
            }
        })

        expect(userSelectOption[1].selected).toBeTruthy();
        expect(userSelectOption[0].selected).toBeFalsy();

    });

    it("select option status", async () => {
        const { getByTestId, getAllByTestId } = render(App);
        const button = getByTestId("add-todo");
        await fireEvent.click(button)
        const statusSelect = getByTestId("statusSelect");
        const statusSelectOption = getAllByTestId("status-option");
        expect(statusSelect).toBeTruthy();
        expect(statusSelectOption).toBeTruthy();

        fireEvent.change(getByTestId("statusSelect"), {
            target: {
                value: true
            }
        })

        expect(statusSelectOption[0].selected).toBeTruthy();
        expect(statusSelectOption[1].selected).toBeFalsy();

        fireEvent.change(getByTestId("statusSelect"), {
            target: {
                value: false
            }
        })

        expect(statusSelectOption[1].selected).toBeTruthy();
        expect(statusSelectOption[0].selected).toBeFalsy();
    });

    it.todo("get todo lists with request api", () => { });
})