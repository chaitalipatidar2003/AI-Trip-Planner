import React from 'react';
import { Button } from '../ui/button';

function Header() {
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5 ">
      <img src="logo.png" alt="Logo" />
      <div>
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Header;
