import { Troute, TuserPath } from "../types";



export function routesGenerator(items:TuserPath[]) {
    const routes = items.reduce((acc: Troute[], item) => {
        if (item.path && item.element) {
            acc.push({
                path: item.path,
                element: item.element,
            });
        }

        if (item.children) {
            item.children.forEach((child) => {
                acc.push({
                    path: child.path,
                    element: child.element,
                });
            });
        }

        return acc; 
    }, [] as Troute[]);
    return routes
}