import React from 'react';
import { FileText, Download, CheckCircle, BookOpen, Video, Mic } from 'lucide-react';
export function PreparationMaterials() {
  // Mock data for preparation materials
  const generalMaterials = [{
    id: 'guide1',
    title: 'Guest Preparation Guide',
    description: 'Everything you need to know before your podcast appearance',
    type: 'PDF',
    icon: <FileText className="h-6 w-6 text-sanjuan-dark" />,
    downloadUrl: '#'
  }, {
    id: 'checklist1',
    title: 'Technical Setup Checklist',
    description: 'Ensure your audio and video are podcast-ready',
    type: 'PDF',
    icon: <CheckCircle className="h-6 w-6 text-sanjuan-dark" />,
    downloadUrl: '#'
  }, {
    id: 'guide2',
    title: 'Topic Preparation Guide',
    description: 'How to prepare your thoughts on hiring practices',
    type: 'PDF',
    icon: <BookOpen className="h-6 w-6 text-sanjuan-dark" />,
    downloadUrl: '#'
  }];
  const resourceMaterials = [{
    id: 'video1',
    title: 'How to Sound Great on a Podcast',
    description: '5-minute video on audio best practices',
    type: 'Video',
    icon: <Video className="h-6 w-6 text-sanjuan-dark" />,
    downloadUrl: '#'
  }, {
    id: 'audio1',
    title: 'Sample Podcast Episode',
    description: 'Listen to a previous episode to get familiar with the format',
    type: 'Audio',
    icon: <Mic className="h-6 w-6 text-sanjuan-dark" />,
    downloadUrl: '#'
  }];
  // Mock upcoming session data
  const upcomingSession = {
    date: 'November 15, 2023',
    time: '10:00 AM - 11:30 AM',
    topic: 'Hiring Challenges in Tech Startups',
    materials: [{
      id: 'session1',
      title: 'Session Agenda & Questions',
      description: 'Detailed outline of our upcoming conversation',
      type: 'PDF',
      icon: <FileText className="h-6 w-6 text-sanjuan-dark" />,
      downloadUrl: '#'
    }, {
      id: 'session2',
      title: 'Pre-Session Reading',
      description: 'Articles and resources on current hiring trends',
      type: 'PDF',
      icon: <BookOpen className="h-6 w-6 text-sanjuan-dark" />,
      downloadUrl: '#'
    }]
  };
  // Render a material card
  const MaterialCard = ({
    material
  }) => <div className="flex items-start p-4 border border-sanjuan-lighter rounded-lg hover:border-sanjuan-light transition-colors">
      <div className="h-12 w-12 bg-sanjuan-lightest rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
        {material.icon}
      </div>
      <div className="flex-grow">
        <h4 className="font-medium text-sanjuan-dark">{material.title}</h4>
        <p className="text-sm text-sanjuan-base mb-2">{material.description}</p>
        <a href={material.downloadUrl} className="inline-flex items-center text-sm text-tango-base hover:text-tango-dark transition-colors">
          <Download className="h-4 w-4 mr-1" />
          Download {material.type}
        </a>
      </div>
    </div>;
  return <div className="space-y-8">
      {upcomingSession && <div>
          <h2 className="text-xl font-semibold text-sanjuan-dark mb-4 font-['Inter']">
            Upcoming Session Materials
          </h2>
          <div className="bg-sanjuan-lightest rounded-lg p-4 mb-4">
            <p className="text-sanjuan-dark font-medium">
              {upcomingSession.date} • {upcomingSession.time}
            </p>
            <p className="text-sanjuan-base">
              <span className="font-medium">Topic:</span>{' '}
              {upcomingSession.topic}
            </p>
          </div>
          <div className="space-y-4">
            {upcomingSession.materials.map(material => <MaterialCard key={material.id} material={material} />)}
          </div>
        </div>}
      <div>
        <h2 className="text-xl font-semibold text-sanjuan-dark mb-4 font-['Inter']">
          General Preparation Materials
        </h2>
        <div className="space-y-4">
          {generalMaterials.map(material => <MaterialCard key={material.id} material={material} />)}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-sanjuan-dark mb-4 font-['Inter']">
          Additional Resources
        </h2>
        <div className="space-y-4">
          {resourceMaterials.map(material => <MaterialCard key={material.id} material={material} />)}
        </div>
      </div>
    </div>;
}