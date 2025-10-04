import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const PricingCard = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700 w-full max-w-sm mx-auto">
      <div className="flex flex-col space-y-4">
        <h3 className="text-2xl font-bold text-white">Premium Plan</h3>
        
        <div className="flex items-center justify-between bg-gray-800 rounded-full p-1">
          <button 
            onClick={() => setIsYearly(false)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!isYearly ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setIsYearly(true)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${isYearly ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Yearly (2 months free)
          </button>
        </div>
        
        <div className="relative h-24 mt-2">
          <div className={`transition-all duration-300 absolute w-full ${isYearly ? 'opacity-0 -translate-y-4' : 'opacity-100'}`}>
            <div className="flex items-end">
              <span className="text-5xl font-bold text-white">$99</span>
              <span className="text-xl text-gray-400 mb-1.5 ml-1">/month</span>
            </div>
            <p className="text-gray-400 text-sm">Billed monthly</p>
          </div>
          
          <div className={`transition-all duration-300 absolute w-full ${!isYearly ? 'opacity-0 translate-y-4' : 'opacity-100'}`}>
            <div className="flex items-end">
              <span className="text-5xl font-bold text-white">$49</span>
              <span className="text-xl text-gray-400 mb-1.5 ml-1">/month</span>
            </div>
            <p className="text-gray-400 text-sm">Billed annually ($588 total)</p>
            <div className="absolute -top-6 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              SAVE 50%
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          {[
            'Full access to all security tools',
            '24/7 Priority Support',
            'Advanced threat detection',
            'Unlimited scans',
            'Team collaboration',
            'Detailed reporting'
          ].map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
        
        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          Get Started
        </button>
        
        <p className="text-xs text-gray-500 text-center mt-2">
          No credit card required. 14-day free trial.
        </p>
      </div>
    </div>
  );
};

export default PricingCard;
