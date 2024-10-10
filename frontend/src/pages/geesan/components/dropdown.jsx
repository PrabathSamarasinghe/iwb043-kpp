function DropPic(){
    return(
        <div className="flex flex-1 justify-end px-2">
            <div className="flex items-stretch">
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar">
                <div className="w-14 rounded-full shadow-lg hover:shadow-accent hover:scale-105 transition duration-300 ease-in-out">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
                    <ul
                    tabIndex={0}
                    className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                    <li><a>Proflie</a></li>
                    <li><a>Log out</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DropPic;