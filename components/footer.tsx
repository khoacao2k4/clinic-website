import { Mail } from 'lucide-react';
import Link from 'next/link';

export default function ClinicFooter() {
    const navLinks = [
      { title: "Home", url: "/" },
      { title: "Services", url: "#services" },
      { title: "Clinic Info", url: "#info" },
    ];
    
    const clinicEmail = "drkhanhtrang.ophth@gmail.com";
    const clinicName = "Dr. Huỳnh Khánh Trang's Clinic";

    return (
        <footer className="py-16 bg-background border-t">
            <div className="mx-auto w-full max-w-7xl px-6">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl leading-none font-bold tracking-tight text-foreground">
                          Dr. Huỳnh Khánh Trang
                        </span>
                    </Link>
                    
                    <div className="flex items-center gap-6">
                      {navLinks.map((link) => (
                        <Link 
                          key={link.title} 
                          href={link.url} 
                          className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                        >
                          {link.title}
                        </Link>
                      ))}
                    </div>
                </div>
                
                <hr className="my-6 border-border" />
                
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row-reverse">
                    <a
                        href={`mailto:${clinicEmail}`}
                        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
                    >
                        <Mail className="size-4" />
                        {clinicEmail}
                    </a>
                    <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} {clinicName}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
