import React from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Navbar = ({ autenticado, onLogout }) => {
    const [nav, setNav] = React.useState(true);

    const handleNav = () => {
        setNav(!nav);
    }

    return (
        <div className="bg-slate-100 shadow-md">
            <div className="flex justify-between items-center h-20 max-w-6xl mx-auto px-6">
                <h1 className="text-3xl font-extrabold text-blue-500 tracking-tight">Igreja Wesleyana</h1>
                <ul className="hidden md:flex gap-12">
                    <li>
                        <Link
                            to="/"
                            className="flex flex-col items-center font-semibold text-slate-800 hover:text-blue-500 transition-colors duration-200"
                        >
                            <span className="text-base">Página</span>
                            <span className="font-normal text-xs">Inicial</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/lista"
                            className="flex flex-col items-center font-semibold text-slate-800 hover:text-blue-500 transition-colors duration-200"
                        >
                            <span className="text-base">Alimentos</span>
                            <span className="font-normal text-xs">Necessários</span>
                        </Link>
                    </li>
                    {autenticado && (
                        <>
                            <li>
                                <Link
                                    to="/adicionar"
                                    className="flex flex-col items-center font-semibold text-slate-800 hover:text-blue-500 transition-colors duration-200"
                                >
                                    <span className="text-base">Adicionar</span>
                                    <span className="font-normal text-xs">Alimento</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/doar"
                                    className="flex flex-col items-center font-semibold text-slate-800 hover:text-blue-500 transition-colors duration-200"
                                >
                                    <span className="text-base">Fazer</span>
                                    <span className="font-normal text-xs">Doação</span>
                                </Link>
                            </li>
                        </>
                    )}
                    {autenticado && (
                        <li>
                            <button
                                onClick={onLogout}
                                className="flex flex-col items-center font-semibold text-slate-800 hover:text-red-500 transition-colors duration-200"
                            >
                                <span className="text-base">Sair</span>
                                <span className="font-normal text-xs">Logout</span>
                            </button>
                        </li>
                    )}
                </ul>
                <div onClick={handleNav} className="block md:hidden cursor-pointer">
                    {!nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
                </div>
            </div>
            {/* Mobile menu */}
            <div className={!nav ? "fixed left-0 top-0 w-[60%] h-full border-r border-slate-300 bg-slate-100 text-slate-800 ease-in-out duration-500 z-50" : "fixed left-[-100%]"}
            >
                <h1 className="text-3xl font-extrabold text-blue-500 m-4">Igreja Wesleyana</h1>
                <ul className="uppercase p-4 space-y-2">
                    <li className="p-4 border-b border-slate-300">
                        <Link to="/" onClick={handleNav} className="block">Página Inicial</Link>
                    </li>
                    <li className="p-4 border-b border-slate-300">
                        <Link to="/lista" onClick={handleNav} className="block">Alimentos Necessários</Link>
                    </li>
                    {autenticado && (
                        <>
                            <li className="p-4 border-b border-slate-300">
                                <Link to="/adicionar" onClick={handleNav} className="block">Adicionar Alimento</Link>
                            </li>
                            <li className="p-4 border-b border-slate-300">
                                <Link to="/doar" onClick={handleNav} className="block">Fazer Doação</Link>
                            </li>
                            <li className="p-4 border-b border-slate-300">
                                <button onClick={() => { onLogout(); handleNav(); }} className="block w-full text-left text-red-600">Sair</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Navbar