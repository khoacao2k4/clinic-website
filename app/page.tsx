import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-32 sm:py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="grid items-center gap-24 lg:grid-cols-2">
                {/* Left Column: Image */}
                <div className="order-last lg:order-first">
                  <Image 
                    src="https://placehold.co/800x600/18181b/ffffff?text=Clinic+Image" 
                    alt="A modern optometry clinic interior" 
                    className="rounded-2xl aspect-[4/3] object-cover shadow-lg"
                  />
                </div>

                {/* Right Column: Text Content */}
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                        Modern Eye Care, Simplified
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Explore the professional services offered at our clinic in a clear and interactive way.
                    </p>
                    <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
                        <Button size="lg" asChild>
                        <a href="tel:0913963003">Book an Appointment</a>
                        </Button>
                        <Button size="lg" variant="secondary" asChild>
                        <a href="#services">Learn More <ArrowRight className="ml-2 h-4 w-4" /></a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Core Services</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Focused on providing the highest standard of personalized eye care.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            
            <div className="flex flex-col gap-y-3 rounded-2xl bg-background p-8 shadow-sm border">
              <h3 className="text-xl font-semibold leading-7 text-foreground">Comprehensive Eye Exams</h3>
              <p className="flex-1 text-muted-foreground">Thorough evaluation of your vision and eye health to detect any potential issues.</p>
            </div>

            <div className="flex flex-col gap-y-3 rounded-2xl bg-background p-8 shadow-sm border">
              <h3 className="text-xl font-semibold leading-7 text-foreground">Eyeglass Prescriptions</h3>
              <p className="flex-1 text-muted-foreground">Accurate prescriptions for glasses to ensure you see the world clearly.</p>
            </div>

            <div className="flex flex-col gap-y-3 rounded-2xl bg-background p-8 shadow-sm border">
              <h3 className="text-xl font-semibold leading-7 text-foreground">Myopia Control</h3>
              <p className="flex-1 text-muted-foreground">Specialized consultation and management for controlling nearsightedness in children.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Clinic Information Section */}
      <section id="info" className="py-24 sm:py-32">
         <div className="container mx-auto px-6 text-center">
           <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Visit The Clinic</h2>
           <div className="mt-8 space-y-4 text-xl text-muted-foreground">
             <div>
               <p className="font-semibold text-foreground">Address</p>
               <p>13 Đào Duy Từ, Phường 5, Quận 10</p>
             </div>
             <div>
               <p className="font-semibold text-foreground">Clinic Hours</p>
               <p>Tuesday - Saturday: 5:00 PM - 7:30 PM</p>
               <p>Sunday & Holidays: Closed</p>
             </div>
           </div>
         </div>
      </section>
    </div>
  );
}
