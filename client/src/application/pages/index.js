import UserConfig from "./users/users.config";
import TasksConfig from "./tasks/tasks.config";

const pagesRoutes = [UserConfig, TasksConfig];

export const pages = [...pagesRoutes];
export const publicPages = pagesRoutes.filter(page => !page.auth);
export const privatePages = pagesRoutes.filter(page => !!page.auth);
