import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface GuestRouteProps {
	children: React.ReactNode;
	redirectTo?: string;
}

export const GuestRoute: React.FC<GuestRouteProps> = ({ children, redirectTo = '/' }) => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f172a] to-[#2d1e3a]">
				<div className="text-white text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
					<p>Loading...</p>
				</div>
			</div>
		);
	}

	if (isAuthenticated) {
		return <Navigate to={redirectTo} replace />;
	}

	return <>{children}</>;
};
