import { NavLink } from "react-router-dom";

export function Navitem({ path, name }: { path: string, name: string }) {
    return (

        < >
            <NavLink
                className={({ isActive, isPending }) =>
                    isPending ? "rounded-none font-semibold lg:border-b-2 border  lg:border-l-0 lg:border-b-[##F5F5F5] lg:border-r-0 lg:border-t-0 lg:bg-white bg-gray-200 lg:w-fit p-2 w-full  text-[#fd9d53]" : isActive ? "font-semibold lg:border-b-2 lg:border-b-[##F5F5F5] border  lg:border-l-0 lg:border-r-0 lg:border-t-0 lg:bg-white text-[#FF6F00] bg-gray-200 lg:w-fit p-2 w-full  transition-colors duration-500" : "hover:text-[#515151] font-semibold lg:w-fit p-2 w-full lg:hover text-gray-400  transition-colors duration-500"
                }
                to={path}>
                {name}
            </NavLink>
        </>

    );
}