export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/pages/dashboard",
        "/pages/categories",
        "/pages/moves",
        "/pages/addMove",
        "/pages/editMove",
        "/pages/fileImport",
    ]
};