"use client";

import { BookOpenCheck, Truck, ShieldCheck } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../ui/card";

const features = [
  {
    icon: <BookOpenCheck className="h-10 w-10 text-blue-600" />,
    title: "Curated Collection",
    description: "Handpicked books for discerning readers",
    details: [
      "Carefully chosen by genre experts",
      "Focused on quality, not just quantity",
      "Fresh arrivals added every single week",
    ],
  },
  {
    icon: <Truck className="h-10 w-10 text-blue-600" />,
    title: "Fast Delivery",
    description: "Get your books quickly and safely",
    details: [
      "We offer nationwide shipping services",
      "Each package is securely wrapped",
      "Track your order at every step",
    ],
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-blue-600" />,
    title: "Authentic Books",
    description: "Guaranteed genuine publications",
    details: [
      "Sourced directly from trusted publishers",
      "No fake or pirated copies ever sold",
      "Strict quality assurance before dispatch",
    ],
  },
];

const WhyChooseUs = () => {
  return (
    <section className="pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 mt-4 mx-auto">
            A boutique bookshop experience with carefully selected titles and
            personalized service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex flex-col bg-white hover:shadow-sm transition-all duration-300 rounded-xl border border-gray-100 hover:border-blue-100 h-full"
            >
              <div className="p-8 flex flex-col h-full">
                <CardHeader className="flex flex-col items-center px-0">
                  <div className="p-4 mb-6 bg-blue-50 rounded-xl">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-1">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 mb-6">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 mt-auto">
                  <ul className="space-y-3 text-gray-700">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-blue-500 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className=" leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
