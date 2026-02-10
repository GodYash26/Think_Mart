import HeroImg1 from "@/assets/hero1.png";
import HeroImg2 from "@/assets/hero2.png";
import HeroImg3 from "@/assets/hero3.png";

export const Hero = () => {
  return (
    <section className="w-full py-2" id="hero">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative h-130 rounded-2xl overflow-hidden">
          
          {/* Full-width background image */}
          <img
            src={HeroImg1}
            alt="Fresh Groceries"
            className="absolute inset-0 w-full h-full object-cover object-[50%_70%]"
          />

          <div className="
            relative
            lg:absolute lg:right-0 lg:top-0
            lg:h-full lg:w-[40%]
            z-10
            flex items-center
          ">
            <div className="flex flex-col gap-2 w-full">
              
              <div className="bg-white rounded-xl overflow-hidden shadow-md h-65">
                <img
                  src={HeroImg2}
                  alt="Fresh Products"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-md h-65">
                <img
                  src={HeroImg3}
                  alt="Quality Assurance"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};