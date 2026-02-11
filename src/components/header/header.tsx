

import React from "react";
import SearchBar from "./search";
import logo from "../../assets/logo.png";
import { Button } from "../ui/button";
import { ShoppingCart, Heart, User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";

const Header: React.FC = () => {

    const [cartCount] = React.useState(6);



    return (
        <header className="w-full bg-white shadow-xs sticky top-0 z-50">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="hidden lg:flex shrink-0 items-center text-2xl font-bold text-brand-green">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="h-12 w-12 sm:h-14 sm:w-14" />
                    </Link>
                </div>
                <div className="flex-1 flex justify-center px-0 sm:px-4">
                    <SearchBar />
                </div>
                <div className="flex shrink-0 items-center justify-end gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="relative h-12 w-12 bg-gray-200 text-gray-500 hover:bg-gray-300">
                                <ShoppingCart strokeWidth={3} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#76BA2C] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <div className="p-4 space-y-2">
                                <h4 className="font-semibold text-sm">Shopping Cart</h4>
                                <p className="text-sm text-gray-500">Your cart is empty</p>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="h-12 w-12 bg-gray-200 text-gray-500 hover:bg-gray-300">
                                <Heart size={28} strokeWidth={2.5} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <div className="p-4 space-y-2">
                                <h4 className="font-semibold text-sm">Favorites</h4>
                                <p className="text-sm text-gray-500">No favorites yet</p>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="h-12 w-12 bg-gray-200 text-gray-500 hover:bg-gray-300">
                                <User size={28} strokeWidth={2.5} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64">
                            <div className="p-4 space-y-3">
                                <h4 className="font-semibold text-sm">Account</h4>
                                <div className="space-y-2">
                                    <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Orders</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem>
                                </div>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}

export default Header;