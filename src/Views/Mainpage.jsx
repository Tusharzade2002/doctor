import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import mainimg from "../assets/Doctors-bro.png";
import img from '../assets/stethoscope.a32b51fa9e6559016827.png'
import { Link } from "react-router-dom";
function Mainpage() {
  return (
    <div className="flex justify-center items-center mt-12">
      <div className="flex justify-around items-center bg-slate-100 w-[80%] h-[85vh]  rounded-lg">
        <div className="w-[50%] h-[100vh] flex justify-center items-center">
          <img
            className="w-[80%]  h-[80%] "
            src={mainimg}
          />
        </div>
        <div className="flex justify-center items-center">
          <div>
            <h1 className="text-3xl mb-10">Sign in to Doctor-APP</h1>
            <Menu as="div" className="w-full relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex w-full justify-s gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                  Select Role
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 size-5 text-gray-400"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                 <div className="py-1">
                  <MenuItem>
                    <Link to="/login" >
                     Admin
                    </Link>
                  </MenuItem>
                </div>
                <div className="py-1">
                 
                  <MenuItem>
                    <Link to="/doctor/login">
                      Doctor
                    </Link>
                  </MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem>
                    <Link >
                     Receptionlist
                    </Link>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
            <img className="h-52" src={img} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
