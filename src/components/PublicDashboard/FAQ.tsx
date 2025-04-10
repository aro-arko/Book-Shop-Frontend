import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "You can place an order by browsing our products, adding items to your cart, and proceeding through the checkout process. You'll need to provide shipping and payment information to complete your order.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. All payments are processed securely.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 3-5 business days within the continental US. International shipping times vary by destination but usually take 7-14 business days. Expedited shipping options are available at checkout.",
    },
    {
      question: "Can I return or exchange an item?",
      answer:
        "Yes, we offer a 30-day return policy for most items. Items must be unused and in their original packaging. Please contact our customer service team to initiate a return or exchange.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order has shipped, you'll receive a confirmation email with tracking information. You can also log into your account to view your order status and tracking details.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 lg:px-0">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className=" text-gray-600">
          Find answers to common questions about our products and services.
        </p>
      </div>

      <div className="mx-auto max-w-7xl">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg px-6 py-2 hover:border-gray-300 transition-colors"
            >
              <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Contact our support team and we'll be happy to help you.
          </p>
          <Link to="/contact">
            <Button className="inline-flex items-center justify-center rounded-mdbg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
