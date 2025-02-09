export function DashboardHeader({title}:{title:string}) {
    return (
        <div className="navbar bg-white text-black shadow-sm">
            <div className="flex  justify-start px-5 w-full items-center">
                <a className="btn bg-gray-100 text-blue-500 border-none shadow text-lg">{title}</a>
            </div>
          
        </div>
    );
}