import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Award, ShieldCheck, FileText, BarChart } from 'lucide-react';
import SASLayout from '@/layouts/SASLayout';

const SASHome = () => {
  return (
    <SASLayout>
      <Head>
        <title>Student Affairs System - MinSU Bongabong Campus</title>
        <meta name="description" content="Student Affairs System (SAS) - Managing student services, scholarships, insurance, and organizational records" />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-green-50 px-4 py-24 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-gray-800">
        {/* Background Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-5">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="hero-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="1" fill="currentColor" className="text-green-700" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-pattern)" />
            </svg>
        </div>

        {/* Decorative Blobs */}
        <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-green-200/30 blur-3xl dark:bg-green-900/20" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-green-300/20 blur-3xl dark:bg-green-800/10" />

        <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 shadow-sm dark:border-green-800 dark:bg-gray-800">
                    <span className="flex h-2 w-2">
                        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-500 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
                    </span>
                    <span className="text-sm font-medium text-green-900 dark:text-green-400">
                        Empowering Student Success
                    </span>
                </div>

                {/* Main Heading */}
                <h1 className="mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-7xl dark:from-white dark:via-gray-100 dark:to-gray-300">
                    Student Affairs<br />System Portal
                </h1>

                {/* Subheading */}
                <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl lg:text-2xl dark:text-gray-300">
                    Streamlining student services, managing{' '}
                    <span className="font-semibold text-green-700 dark:text-green-400">scholarships</span>, and fostering{' '}
                    <span className="font-semibold text-green-700 dark:text-green-400">organizational excellence</span> at MinSU Bongabong Campus
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        size="lg"
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-green-700 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-green-800 hover:shadow-xl hover:shadow-green-700/20"
                    >
                        <span className="relative z-10">View Scholarships</span>
                        <svg
                            className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        className="group inline-flex items-center gap-2 rounded-lg border-2 border-green-700 bg-white px-8 py-4 text-base font-semibold text-green-900 shadow-lg transition-all hover:border-green-800 hover:bg-green-50 hover:shadow-xl dark:border-green-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                    >
                        <Users className="h-5 w-5 transition-transform group-hover:rotate-12" />
                        <span>Browse Organizations</span>
                    </Button>
                </div>
            </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="rounded-xl border border-green-100 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
              <div className="text-3xl font-bold text-green-700 dark:text-green-400">
                  100%
              </div>
              <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Digital Records
              </div>
          </div>

          <div className="rounded-xl border border-green-100 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
              <div className="text-3xl font-bold text-green-700 dark:text-green-400">
                  24/7
              </div>
              <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Access
              </div>
          </div>

          <div className="rounded-xl border border-green-100 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
              <div className="text-3xl font-bold text-green-700 dark:text-green-400">
                  23+
              </div>
              <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Organizations
              </div>
          </div>

          <div className="rounded-xl border border-green-100 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
              <div className="text-3xl font-bold text-green-700 dark:text-green-400">
                  Real-time
              </div>
              <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Updates
              </div>
          </div>
      </div>

      {/* Features Grid */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Scholarship Management */}
            <div className="rounded-xl border border-gray-200 p-6 transition-all hover:border-green-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-green-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                <Award className="h-6 w-6 text-green-700 dark:text-green-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-green-900 dark:text-white">
                Scholarship Management
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Track and manage various scholarship programs including TES, TDP, and more.
              </p>
              <Link href="#" className="font-medium text-green-700 hover:text-green-800 dark:text-green-400">
                View Scholarships →
              </Link>
            </div>

            {/* Insurance Management */}
            <div className="rounded-xl border border-gray-200 p-6 transition-all hover:border-green-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-green-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                <ShieldCheck className="h-6 w-6 text-green-700 dark:text-green-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-green-900 dark:text-white">
                Insurance Management
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Digital management of student insurance forms and records.
              </p>
              <Link href="#" className="font-medium text-green-700 hover:text-green-800 dark:text-green-400">
                Manage Insurance →
              </Link>
            </div>

            {/* Organizational Records */}
            <div className="rounded-xl border border-gray-200 p-6 transition-all hover:border-green-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-green-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                <Users className="h-6 w-6 text-green-700 dark:text-green-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-green-900 dark:text-white">
                Organizational Records
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Manage records for all student organizations and their activities.
              </p>
              <Link href="#" className="font-medium text-green-700 hover:text-green-800 dark:text-green-400">
                View Organizations →
              </Link>
            </div>

            {/* Calendar of Activities */}
            <div className="rounded-xl border border-gray-200 p-6 transition-all hover:border-green-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-green-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                <Calendar className="h-6 w-6 text-green-700 dark:text-green-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-green-900 dark:text-white">
                Calendar of Activities
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Schedule and track student affairs events and activities.
              </p>
              <Link href="#" className="font-medium text-green-700 hover:text-green-800 dark:text-green-400">
                View Calendar →
              </Link>
            </div>

            {/* Document Digitalization */}
            <div className="rounded-xl border border-gray-200 p-6 transition-all hover:border-green-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-green-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                <FileText className="h-6 w-6 text-green-700 dark:text-green-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-green-900 dark:text-white">
                Document Digitalization
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Centralized digital storage for all student affairs records.
              </p>
              <Link href="#" className="font-medium text-green-700 hover:text-green-800 dark:text-green-400">
                Access Documents →
              </Link>
            </div>

            {/* Reports & Analytics */}
            <div className="rounded-xl border border-gray-200 p-6 transition-all hover:border-green-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-green-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                <BarChart className="h-6 w-6 text-green-700 dark:text-green-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-green-900 dark:text-white">
                Reports & Analytics
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Generate insights from scholarship, organization, and activity data.
              </p>
              <Link href="#" className="font-medium text-green-700 hover:text-green-800 dark:text-green-400">
                View Reports →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="mt-4 space-y-2">
                <li><Button variant="link">Home</Button></li>
                <li><Button variant="link">Scholarships</Button></li>
                <li><Button variant="link">Organizations</Button></li>
                <li><Button variant="link">Calendar</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Resources</h4>
              <ul className="mt-4 space-y-2">
                <li><Button variant="link">Forms & Documents</Button></li>
                <li><Button variant="link">Insurance</Button></li>
                <li><Button variant="link">Reports</Button></li>
                <li><Button variant="link">Help Center</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Contact SAS</h4>
              <ul className="mt-4 space-y-2">
                <li>Mindoro State University</li>
                <li>Bongabong Campus</li>
                <li>+63 912 345 6789</li>
                <li>sas@minsu.edu.ph</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">About SAS</h4>
              <p className="mt-4 text-muted-foreground">
                The Student Affairs System (SAS) is dedicated to enhancing student services through digital transformation and efficient management.
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © 2025 Student Affairs System - Mindoro State University, Bongabong Campus. All rights reserved.
          </div>
        </div>
      </footer>
    </SASLayout>
  );
};

export default SASHome;
