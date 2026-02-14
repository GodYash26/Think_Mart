

import React from "react";
import SearchBar from "./search";
import logo from "../../assets/logo.png";
import { Button } from "../ui/button";
import { ShoppingCart, Heart, LogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { User } from "lucide-react";
import { useGetCart } from "@/lib/api/cart";
import { CartDropdown } from "../cart-dropdown";

const Header: React.FC = () => {
    const { isAuthenticated, user, logout, openAuthSheet } = useAuth();
    const navigate = useNavigate();
    const { data: cartResponse } = useGetCart(isAuthenticated);
    const cartCount = cartResponse?.cart?.items?.length ?? 0;

    // Get user initials from fullname
    const getInitials = (fullname: string) => {
        return fullname
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <header className="w-full bg-white shadow-xs sticky top-0 z-50">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex shrink-0 items-center text-2xl font-bold text-brand-green">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
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
                        <DropdownMenuContent align="end" className="w-full sm:max-w-sm p-0">
                            {!isAuthenticated ? (
                                <div className="p-4 space-y-2 text-center">
                                    <p className="text-sm text-gray-600 mb-3">Sign in to view your cart</p>
                                    <Button 
                                        className="w-full bg-[#76BA2C] hover:bg-[#65a524] text-white text-sm"
                                        onClick={() => openAuthSheet("signin")}
                                    >
                                        Sign In
                                    </Button>
                                </div>
                            ) : (
                                <CartDropdown />
                            )}
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
                                <h4 className="font-semibold text-sm">Kaam hudai cha</h4>
                                <p className="text-sm text-gray-500">Not Implemented yet</p>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className={`h-12 w-12 font-bold text-lg ${
                                isAuthenticated && user
                                    ? "bg-[#76BA2C] text-white hover:bg-[#65a524]"
                                    : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                            }`}>
                                {isAuthenticated && user ? (
                                    getInitials(user.fullname)
                                ) : (
                                    <User size={24} />
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64">
                            {/* Authenticated User - Show Profile Menu */}
                            {isAuthenticated && user ? (
                                <div className="p-4 space-y-3">
                                    <div className="border-b pb-3">
                                        <p className="font-semibold text-sm">{user.fullname}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <DropdownMenuItem 
                                            className="cursor-pointer"
                                            onClick={() => navigate("/profile")}
                                        >
                                            Profile
                                        </DropdownMenuItem>
                                        {user.role === "customer" && (
                                            <>
                                                <DropdownMenuItem 
                                                    className="cursor-pointer"
                                                    onClick={() => navigate("/customer/dashboard")}
                                                >
                                                    Dashboard
                                                </DropdownMenuItem>
                                        <DropdownMenuItem 
                                            className="cursor-pointer"
                                            onClick={() => navigate("/my-orders")}
                                        >
                                            Orders
                                        </DropdownMenuItem>
                                            </>
                                        )}
                                        {user.role === "admin" && (
                                            <DropdownMenuItem 
                                                className="cursor-pointer"
                                                onClick={() => navigate("/admin/dashboard")}
                                            >
                                                Dashboard
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem className="cursor-pointer">
                                            Settings
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                            className="cursor-pointer text-red-600"
                                            onClick={() => logout()}
                                        >
                                            <LogOut className="h-4 w-4 mr-2" />
                                            Logout
                                        </DropdownMenuItem>
                                    </div>
                                </div>
                            ) : (
                                /* Unauthenticated User - Show Login and Signup Buttons */
                                <div className="p-4 space-y-2">
                                    <Button 
                                        className="w-full border-[#76BA2C] text-[#76BA2C] hover:bg-[#76BA2C] hover:text-white"
                                        variant="outline"
                                        onClick={() => openAuthSheet("signin")}
                                    >
                                        Sign In
                                    </Button>
                                    <Button 
                                        className="w-full bg-[#76BA2C] hover:bg-[#65a524] text-white"
                                        onClick={() => openAuthSheet("signup")}
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}

export default Header;