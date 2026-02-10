import { Phone, Mail, MapPin, Copyright } from "lucide-react";
import logo from "../../assets/logo.png";


const Footer = () => {
  const quickLinks = ["About Us", "Contact Us", "FAQ"];
  const customerService = ["Blog", "Privacy Policy", "Terms & Conditions"];

  return (
    <footer className="w-full bg-white border-t border-gray-200" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
                <img src={logo} alt="ThinkMart Logo" className="h-12 w-12 sm:h-14 sm:w-14" />
            </div>
            <p className="text-sm text-gray-600">
              Your trusted source for fresh vegetables, fruits and grocery items. Delivering freshness since 2020.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">More About Us</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-gray-600 hover:text-brand-green transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Information */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Related Information</h4>
            <ul className="space-y-2.5">
              {customerService.map((service) => (
                <li key={service} className="text-sm text-gray-600 hover:text-brand-green transition-colors cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Contact Us</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-green shrink-0" />
                <span className="text-sm text-gray-600">+977 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-green shrink-0" />
                <a href="mailto:support@thinkmart.com" className="text-sm text-gray-600 hover:text-brand-green transition-colors">
                  support@thinkmart.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-green shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">Kathmandu, Nepal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Footer Bottom */}
        <div className="py-6 text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
            <Copyright size={16} className="text-brand-green" />
             2026 ThinkMart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
