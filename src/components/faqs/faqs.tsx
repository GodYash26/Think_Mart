import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "./fake.faqs";
import basket from "../../assets/basket.png";


const FAQ = () => {
  return (
    <section className="w-full bg-[#E3EDEC] scroll-smooth py-10" id="faq">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="flex items-center justify-center mr-0 lg:mr-16">
            <img 
              src={basket} 
              alt="Fresh Basket" 
              className="w-full max-w-md h-auto object-contain"
            />
          </div>

          {/* FAQs */}
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-wide mb-6">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem 
                  key={i} 
                  value={`item-${i}`} 
                  className="bg-white rounded-lg border border-gray-200 px-4 shadow-sm"
                >
                  <AccordionTrigger className="text-sm font-medium text-gray-900 hover:text-brand-green">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
