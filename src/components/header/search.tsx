
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface SearchBarProps {
  buttonContent?: React.ReactNode | string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  buttonContent,
  placeholder = "Search for product",
  onSearch
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      console.log('Searching for:', query);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative flex items-center w-full group">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full py-5 px-6 bg-white border border-gray-200 rounded-full text-gray-700 placeholder:text-[#5B5E87] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none"
        />
        <Button
          type="submit"
          className="absolute right-2 bg-brand-green text-white transition-colors flex items-center justify-center mr-4 hover:bg-green-500 h-8 w-8 group-focus-within:bg-green-500"
          aria-label="Search"
        >
          {buttonContent ? (
            typeof buttonContent === 'string' ? (
              <span className="text-sm font-medium px-2">{buttonContent}</span>
            ) : (
              buttonContent
            )
          ) : (
            <Search strokeWidth={2.5} />
          )}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
