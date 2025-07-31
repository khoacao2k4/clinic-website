"use client";

import { Menu } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger
} from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";

// Data and interfaces remain the same
const clinicLogo = {
  title: "Dr. Huỳnh Khánh Trang",
  url: "/",
};
const clinicMenu = [
  { title: "Services", url: "#services" },
  { title: "Clinic Info", url: "#info" },
];

interface MenuItem {
  title: string;
  url: string;
}
interface NavbarProps {
  logo?: { title: string; url: string };
  menu?: MenuItem[];
  auth?: { login: { title: string; url: string } };
}

const githubUrl = "https://github.com/khoacao2k4/clinic-website";

const ClinicNavbar = ({
  logo = clinicLogo,
  menu = clinicMenu
}: NavbarProps) => {
  return (
    <header className="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center">
        {/* Desktop Nav */}
        <div className="mr-4 hidden md:flex">
          <a href={logo.url} className="mx-6 flex items-center space-x-2">
            <span className="font-bold text-foreground text-xl">{logo.title}</span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {menu.map((item) => (
              <a
                key={item.title}
                href={item.url}
                className="text-muted-foreground transition-colors hover:text-foreground/80"
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Nav Trigger */}
        <div className="block md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2" >
                <Menu className="size-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-6">
              <SheetHeader className="text-left mb-4">
                <SheetTitle>
                  <a href={logo.url} className="flex items-center space-x-2">
                    <span className="text-xl font-bold">{logo.title}</span>
                  </a>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Main navigation menu
                </SheetDescription>
              </SheetHeader>
              
              <nav className="flex flex-col gap-2">
                {menu.map((item) => (
                  <a key={item.title} href={item.url} className="text-2xl font-semibold text-foreground/90 hover:text-foreground py-2">
                    {item.title}
                  </a>
                ))}
              </nav>

              {/* Auth Controls at the bottom */}
              <div className="mt-auto">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-md text-muted-foreground">Theme</span>
                    <ModeToggle />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-md text-muted-foreground">Github</span>
                    <Button asChild variant="outline" size="icon">
                      <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                        <FaGithub className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Right side actions for desktop */}
        <div className="flex flex-1 items-center justify-end">
          <nav className="hidden md:flex items-center gap-2">
            <ModeToggle />
            <Button variant="outline" size="icon">
              <a href="https://github.com/khoacao2k4/clinic-website" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default ClinicNavbar;