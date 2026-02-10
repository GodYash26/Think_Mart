import { useState } from "react";
import { ChevronDown, Menu, X, Mail } from "lucide-react";
import { Button } from "../ui/button";

const categories = ["Vegetable", "Fruits", "Beverages", "Meat & Fish", "Packed Food"];
const navLinks = ["Grocery Store", "Restaurants", "Gift Store", "Clothing Store", "Offers"];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);

    return (
        <nav className="w-full bg-white border-b border-gray-200 sticky top-16 z-40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-3 w-full">
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8 flex-1">
                        {/* All Categories Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-green transition-colors py-2">
                                All Categories
                                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
                            </button>
                            <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                {categories.map((category) => (
                                    <a
                                        key={category}
                                        href={`#${category.toLowerCase()}`}
                                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors first:rounded-t-md last:rounded-b-md"
                                    >
                                        {category}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Other Navigation Links */}
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="text-sm font-medium text-gray-700 hover:text-brand-green transition-colors"
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    {/* Help Section */}
                    <div className="hidden lg:flex items-center gap-2 ml-auto">
                        <div className="flex flex-row gap-2 items-center">
                            <span className="text-xs text-gray-600 font-semibold">Need Help?</span>
                            <Mail size={16} className="text-orange-500" />
                            <a href="mailto:thinkmart12@gmail.com" className="text-xs font-semibold text-gray-700 hover:text-brand-green transition-colors">
                                thinkmart12@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 ml-auto"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileOpen && (
                    <div className="lg:hidden pb-4 border-t border-gray-200">
                        {/* Mobile Categories Dropdown */}
                        <div className="mb-2">
                            <Button
                                onClick={() => setCategoriesOpen(!categoriesOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors"
                            >
                                All Categories
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
                                />
                            </Button>
                            {categoriesOpen && (
                                <div className="bg-gray-50">
                                    {categories.map((category) => (
                                        <a
                                            key={category}
                                            href={`#${category.toLowerCase()}`}
                                            className="block px-8 py-2.5 text-sm text-gray-700 hover:text-brand-green transition-colors"
                                            onClick={() => {
                                                setMobileOpen(false);
                                                setCategoriesOpen(false);
                                            }}
                                        >
                                            {category}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Other Links */}
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors"
                                onClick={() => setMobileOpen(false)}
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
