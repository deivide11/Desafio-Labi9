import iconAdm from '../../assets/fundo2.png';

const Header = () => {
    const name = sessionStorage.getItem('username') || 'Usuário';

    return (
        <div>
            <div className="c-header flex bg-white p-4 px-[50px] rounded-lg shadow-md">
                <div className="flex justify-around items-center w-full">
                    <h1 className="text-header text-xl font-bold">Admin Painel</h1>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">{name}</p>
                        <div>
                            <img src={iconAdm} className="w-[35px] h-[35px] rounded-full" alt="Icon Adm" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;