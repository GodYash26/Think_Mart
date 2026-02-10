import React from "react";
import { MapPin, Clock, Truck, Package, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const StoreLocation: React.FC = () => {
    const schedules = [
        { day: "Monday", hours: "8:00 AM - 12:00 PM", isOpen: true },
        { day: "Tuesday", hours: "9:00 AM - 1:00 PM", isOpen: false },
        { day: "Wednesday", hours: "9:00 AM - 12:00 PM", isOpen: true },
        { day: "Thursday", hours: "10:00 AM - 2:00 PM", isOpen: false },
        { day: "Friday", hours: "8:00 AM - 12:00 PM", isOpen: true },
        { day: "Saturday", hours: "9:00 AM - 3:00 PM", isOpen: false },
    ];

    return (
        <section className="w-full bg-white py-12" id="location">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Side - Store Details */}
                    <div className="space-y-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Store Location</h1>

                        {/* Address */}
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-brand-green mt-1 shrink-0" />
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                                <p className="text-gray-600">
                                    1234 Sunset Boulevard, West Hollywood
                                </p>
                            </div>
                        </div>

                        {/* Opening Hours */}
                        <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-brand-green mt-1 shrink-0" />
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">
                                    Store Opening Time
                                </h3>
                                <p className="text-gray-600 mb-2">10:00 AM - 6:00 PM</p>
                            </div>
                        </div>

                        {/* Delivery Available */}
                        <div className="flex items-start gap-3">
                            <Truck className="h-5 w-5 text-brand-green mt-1 shrink-0" />
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-3">
                                    Delivery Available
                                </h3>

                                {/* Schedule List */}
                                <div className="space-y-1">
                                    {schedules.map((schedule, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between py-2"
                                        >
                                            <span
                                                className={`font-medium ${schedule.isOpen
                                                        ? "text-brand-green"
                                                        : "text-gray-700"
                                                    }`}
                                            >
                                                {schedule.day}
                                            </span>
                                            <span
                                                className={`text-sm ${schedule.isOpen
                                                        ? "text-brand-green"
                                                        : "text-gray-600"
                                                    }`}
                                            >
                                                {schedule.hours}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Items Sold */}
                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <Package className="h-5 w-5 text-brand-green" />
                            <span className="text-gray-700 font-medium">500+ items sold</span>
                        </div>

                        {/* Get Directions Button */}
                        <Button className="w-full bg-brand-green hover:bg-brand-green-dark text-white py-6 text-lg font-semibold rounded-lg">
                            Get Directions
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>

                    {/* Right Side - Map */}
                    <div className="relative rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14207.980847441504!2d83.47320319999999!3d27.6681203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2snp!4v1770733019100!5m2!1sen!2snp"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StoreLocation;