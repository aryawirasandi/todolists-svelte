import { rest } from "msw";

export const handlers = [
    rest.get(`${import.meta.env.VITE_BASE_URL}/todos`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    "userId": 1,
                    "id": 1,
                    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    "completed": false
                },
                {
                    "userId": 1,
                    "id": 2,
                    "title": "qui est esse",
                    "completed": true
                },
            ])
        )
    }),
    rest.post(`${import.meta.env.VITE_BASE_URL}/todos`, async (req, res, ctx) => {
        const response = await req.json();
        console.log({
            response
        })
        return res(
            ctx.status(200),
            ctx.json(response)
        )
    }),
    rest.put(`${import.meta.env.VITE_BASE_URL}/todos`, (req, res, ctx) => {
        const { id, title, completed, userId } = req.variables;
        return res(
            ctx.status(200),
            ctx.json({
                id,
                title,
                completed,
                userId
            })
        )
    })
]