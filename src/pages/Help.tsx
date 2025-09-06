import React from 'react';
import { Book, MessageCircle, Mail, ExternalLink, HelpCircle, Lightbulb } from 'lucide-react';

export default function Help() {
  const faqs = [
    {
      question: "What languages are supported?",
      answer: "Braille Converter Pro supports English, Spanish, French, Tamil, Hindi, and Malayalam. Each language has its own specialized Braille character mappings."
    },
    {
      question: "What's the difference between Grade 1 and Grade 2 Braille?",
      answer: "Grade 1 Braille converts text letter by letter, while Grade 2 uses contractions and abbreviations to reduce the amount of Braille needed. Grade 2 is more efficient for fluent Braille readers."
    },
    {
      question: "Can I use voice input?",
      answer: "Yes! Enable voice recognition in Settings and use the Voice Input page to convert speech directly to Braille. Make sure your browser supports Web Speech API."
    },
    {
      question: "How do I export my Braille output?",
      answer: "Use the export buttons in the converter to save your Braille as TXT (plain text) or BRF (Braille Ready Format) files for use with Braille displays or embossers."
    },
    {
      question: "Is my data saved?",
      answer: "Your conversion history is stored locally in your browser. Enable auto-save in Settings to automatically save your conversions for future reference."
    }
  ];

  const quickTips = [
    "Use Ctrl/Cmd + Enter to quickly convert text",
    "Enable real-time preview for instant Braille conversion",
    "Import text files directly by dragging them into the File Manager",
    "Switch between light and dark themes in Settings for better accessibility",
    "View your conversion statistics in the Analytics dashboard"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Help & Support
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Everything you need to know about using Braille Converter Pro
        </p>
      </div>

      {/* Getting Started */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Book className="w-5 h-5" />
          Getting Started
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">Choose Your Language</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Select from our supported languages in the Text Converter
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">Select Braille Grade</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Choose Grade 1 for letter-by-letter or Grade 2 for contractions
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">Input Your Text</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Type, paste, upload files, or use voice input
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                4
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">Export & Use</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Export as TXT or BRF files for your Braille devices
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Quick Tips
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-slate-700 dark:text-slate-300">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Support */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Contact & Support
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-medium text-slate-900 dark:text-white mb-2">Email Support</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Get help from our support team
            </p>
            <a
              href="mailto:support@brailleconverter.com"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              support@brailleconverter.com
            </a>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Book className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-medium text-slate-900 dark:text-white mb-2">Documentation</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Detailed guides and tutorials
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View Docs <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-medium text-slate-900 dark:text-white mb-2">Community</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Join our user community
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Join Forum <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Version Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Braille Converter Pro v3.0 • Built with accessibility in mind
        </p>
      </div>
    </div>
  );
}