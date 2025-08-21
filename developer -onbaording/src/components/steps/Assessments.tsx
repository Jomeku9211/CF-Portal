import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../components/Card';
import { Button } from '../../components/Button';
interface AssessmentsProps {
  formData: any;
  updateFormData: (data: any) => void;
}
export function Assessments({
  formData,
  updateFormData
}: AssessmentsProps) {
  return <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Assessments</h2>
        <p className="text-sm text-gray-500 mt-1">
          Complete these lightweight assessments to showcase your abilities
        </p>
      </div>
      <div className="space-y-6">
        <Card variant="outlined">
          <CardHeader title="One-way Video Introduction" subtitle="Record a 1-2 minute video introducing yourself" />
          <CardContent>
            <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-4 text-center max-w-md">
                Tell us about yourself, your experience, and what you're looking
                for in your next role
              </p>
              <Button variant="secondary">Record Video</Button>
            </div>
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardHeader title="Quick Skill Test" subtitle="10-15 minute assessment of your technical skills" />
          <CardContent>
            <div className="flex items-center justify-between p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-md border-2 border-gray-300 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Frontend Development Assessment
                  </h4>
                  <p className="text-sm text-gray-500">
                    Based on your profile: React, JavaScript, CSS
                  </p>
                </div>
              </div>
              <Button variant="secondary">Start Test</Button>
            </div>
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardHeader title="Personality & Culture Fit" subtitle="5-minute assessment to understand your work style" />
          <CardContent>
            <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-md border-2 border-gray-300 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Work Style Assessment
                  </h4>
                  <p className="text-sm text-gray-500">
                    Helps match you with compatible teams and companies
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="secondary">Take Assessment</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md mt-8">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> These assessments help you stand out to
          employers. You can complete them now or later, but profiles with
          completed assessments receive 4x more interview requests.
        </p>
      </div>
    </div>;
}