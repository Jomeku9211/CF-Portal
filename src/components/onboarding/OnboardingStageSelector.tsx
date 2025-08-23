import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../ui/Button';

type Stage = 'organization_creation' | 'team_creation' | 'hiring_intent' | 'job_creation';

export function OnboardingStageSelector() {
  const [stage, setStage] = useState<Stage>('organization_creation');
  const navigate = useNavigate();

  const go = () => {
    if (stage === 'organization_creation') navigate('/clientOnboarding');
    if (stage === 'team_creation') navigate('/clientOnboarding');
    if (stage === 'hiring_intent') navigate('/clientOnboarding');
    if (stage === 'job_creation') navigate('/clientOnboarding');
    try {
      const raw = localStorage.getItem('currentUser');
      const parsed = raw ? JSON.parse(raw) : {};
      localStorage.setItem('currentUser', JSON.stringify({ ...parsed, onboarding_stage: stage }));
    } catch {}
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a]">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-white text-2xl font-bold mb-4">Select your current onboarding stage</h1>
        <p className="text-gray-400 mb-6">We'll route you to the right place.</p>

        <div className="space-y-3 bg-[#1a2234] p-6 rounded-lg border border-[#2a3344]">
          <label className="flex items-center gap-3 text-white">
            <input type="radio" name="stage" checked={stage==='organization_creation'} onChange={() => setStage('organization_creation')} />
            Organization creation
          </label>
          <label className="flex items-center gap-3 text-white">
            <input type="radio" name="stage" checked={stage==='team_creation'} onChange={() => setStage('team_creation')} />
            Team creation
          </label>
          <label className="flex items-center gap-3 text-white">
            <input type="radio" name="stage" checked={stage==='hiring_intent'} onChange={() => setStage('hiring_intent')} />
            Hiring intent
          </label>
          <label className="flex items-center gap-3 text-white">
            <input type="radio" name="stage" checked={stage==='job_creation'} onChange={() => setStage('job_creation')} />
            Job creation
          </label>
        </div>

        <div className="mt-6">
          <Button onClick={go}>Continue</Button>
        </div>
      </div>
    </div>
  );
}












