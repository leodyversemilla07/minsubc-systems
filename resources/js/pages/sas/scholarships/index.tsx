import React from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Award, FileText, Users, TrendingUp, Calendar, Download } from 'lucide-react';
import SASLayout from '@/layouts/sas-layout';

const ScholarshipsIndex = () => {
  return (
    <SASLayout>
      <Head>
        <title>Scholarships - Student Affairs System</title>
        <meta name="description" content="Manage and track student scholarships at MinSU Bongabong Campus" />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 px-4 py-24 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-gray-800">
        {/* Background Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-5">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="hero-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="1" fill="currentColor" className="text-blue-700" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-pattern)" />
            </svg>
        </div>

        {/* Decorative Blobs */}
        <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-900/20" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-800/10" />

        <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 shadow-sm dark:border-blue-800 dark:bg-gray-800">
                    <span className="flex h-2 w-2">
                        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-blue-500 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                    </span>
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-400">
                        Scholarship Management
                    </span>
                </div>

                {/* Main Heading */}
                <h1 className="mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-7xl dark:from-white dark:via-gray-100 dark:to-gray-300">
                    Scholarship<br />Management System
                </h1>

                {/* Subheading */}
                <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl lg:text-2xl dark:text-gray-300">
                    Comprehensive management of{' '}
                    <span className="font-semibold text-blue-700 dark:text-blue-400">scholarship programs</span> including
                    applications, tracking, and reporting for MinSU Bongabong Campus students
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        size="lg"
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-blue-700 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-700/20"
                    >
                        <Award className="h-5 w-5" />
                        <span>Apply for Scholarship</span>
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        className="group inline-flex items-center gap-2 rounded-lg border-2 border-blue-700 bg-white px-8 py-4 text-base font-semibold text-blue-900 shadow-lg transition-all hover:border-blue-800 hover:bg-blue-50 hover:shadow-xl dark:border-blue-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                    >
                        <FileText className="h-5 w-5 transition-transform group-hover:rotate-12" />
                        <span>View Applications</span>
                    </Button>
                </div>
            </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="rounded-xl border border-blue-100 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                  150+
              </div>
              <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Active Scholarships
              </div>
          </div>

          <div className="rounded-xl border border-blue-100 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                  ₱2.5M
              </div>
              <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Awarded
              </div>
          </div>

          <div className="rounded-xl border border-blue-100 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                  85%
              </div>
              <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Renewal Rate
              </div>
          </div>

          <div className="rounded-xl border border-blue-100 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                  24/7
              </div>
              <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Application Access
              </div>
          </div>
      </div>

      {/* Scholarship Types Grid */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Available Scholarships
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Explore various scholarship opportunities available to MinSU Bongabong Campus students
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* TES Scholarship */}
            <Card className="rounded-xl border border-gray-200 p-6 transition-all hover:border-blue-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-blue-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                <Award className="h-6 w-6 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-blue-900 dark:text-white">
                TES Scholarship
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Tertiary Education Subsidy for qualified students from low-income families.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Up to ₱15,000/year</span>
                <Button size="sm" variant="outline">Apply Now</Button>
              </div>
            </Card>

            {/* TDP Scholarship */}
            <Card className="rounded-xl border border-gray-200 p-6 transition-all hover:border-blue-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-blue-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                <TrendingUp className="h-6 w-6 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-blue-900 dark:text-white">
                TDP Scholarship
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Tulong Dunong Program for students with excellent academic performance.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Up to ₱10,000/year</span>
                <Button size="sm" variant="outline">Apply Now</Button>
              </div>
            </Card>

            {/* Merit Scholarship */}
            <Card className="rounded-xl border border-gray-200 p-6 transition-all hover:border-blue-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-blue-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                <Users className="h-6 w-6 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-blue-900 dark:text-white">
                Merit Scholarship
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Academic excellence awards for outstanding students across all programs.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Up to ₱20,000/year</span>
                <Button size="sm" variant="outline">Apply Now</Button>
              </div>
            </Card>

            {/* University Scholarship */}
            <Card className="rounded-xl border border-gray-200 p-6 transition-all hover:border-blue-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-blue-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                <FileText className="h-6 w-6 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-blue-900 dark:text-white">
                University Scholarship
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Institutional scholarships funded by MinSU Bongabong Campus endowment.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Up to ₱25,000/year</span>
                <Button size="sm" variant="outline">Apply Now</Button>
              </div>
            </Card>

            {/* Sports Scholarship */}
            <Card className="rounded-xl border border-gray-200 p-6 transition-all hover:border-blue-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-blue-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                <Calendar className="h-6 w-6 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-blue-900 dark:text-white">
                Sports Scholarship
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Athletic excellence awards for student-athletes representing the university.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Up to ₱12,000/year</span>
                <Button size="sm" variant="outline">Apply Now</Button>
              </div>
            </Card>

            {/* Cultural Scholarship */}
            <Card className="rounded-xl border border-gray-200 p-6 transition-all hover:border-blue-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-blue-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                <Download className="h-6 w-6 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-blue-900 dark:text-white">
                Cultural Scholarship
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Support for students actively participating in cultural activities and arts.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Up to ₱8,000/year</span>
                <Button size="sm" variant="outline">Apply Now</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="bg-blue-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              How to Apply
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Simple steps to apply for scholarships at MinSU Bongabong Campus
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">1</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Check Eligibility</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Review the requirements and eligibility criteria for your chosen scholarship program.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">2</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Submit Application</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Complete the online application form and upload all required documents.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">3</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Track Status</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your application status and receive notifications throughout the process.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SASLayout>
  );
};

export default ScholarshipsIndex;