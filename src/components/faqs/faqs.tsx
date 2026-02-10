import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "./fake.faqs";


const FAQ = () => {
  return (
    <section className="w-full bg-gray-50 py-12" id="faq">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Everything you need to know about ThinkMart
          </p>
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
    </section>
  );
};

export default FAQ;
