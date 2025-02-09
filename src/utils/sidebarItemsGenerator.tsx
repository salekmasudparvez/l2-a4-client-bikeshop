import { NavLink } from "react-router-dom";
import { TSidebarItem, TuserPath } from "../types";



export function sidebarItemsGenerator(adminPaths:TuserPath[],role:string) {
    const items = adminPaths.reduce((acc:TSidebarItem[], item) => {
        if (item.path && item.name) {
            acc.push({
                key: item.name,
                label: <NavLink to={`/${role}/${item.path}`}> {item.name}</NavLink>
            });
        }
        if (item.children) {
          
                    acc.push({
                        key: item.path || item.name,
                        label: item.name,
                        children:item.children.map(singleItem => ({
                            key: singleItem.path,
                            label: <NavLink to={`/${role}/${singleItem.path}`}> {singleItem.name}</NavLink>,
                        }))
                    });
         
        }
    
        return acc; 
    }, []);
    return items;
}