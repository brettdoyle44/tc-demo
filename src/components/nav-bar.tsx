"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, CircleUser } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export function NavBar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
  };

  const NavLinks = () => (
    <>
      <Link
        href="/refer"
        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
          pathname === "/refer"
            ? "border-b-2 border-primary text-gray-900"
            : "text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700"
        }`}
      >
        Refer Patient
      </Link>
      <Link
        href="/referrals"
        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
          pathname === "/referrals"
            ? "border-b-2 border-primary text-gray-900"
            : "text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700"
        }`}
      >
        Referral Statuses
      </Link>
      <Link
        href="/performance"
        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
          pathname === "/performance"
            ? "border-b-2 border-primary text-gray-900"
            : "text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700"
        }`}
      >
        Performance
      </Link>
    </>
  );

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and company name */}
          <div className="flex items-center">
            <Link href="/refer" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span className="text-xl font-semibold text-gray-900">
                Throughcare
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:gap-x-8">
            <NavLinks />
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-4">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* User Menu */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full bg-slate-600 hover:bg-slate-700"
                >
                  <CircleUser className="h-6 w-6 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Your Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
