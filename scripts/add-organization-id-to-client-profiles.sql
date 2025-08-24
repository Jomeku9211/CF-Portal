-- Add organization_id column to client_profiles table to enable proper relationships
-- This will allow clients to be linked to organizations (one-to-many relationship)

-- Add the organization_id column
ALTER TABLE client_profiles 
ADD COLUMN organization_id UUID REFERENCES organizations(id);

-- Add an index for better performance
CREATE INDEX idx_client_profiles_organization_id ON client_profiles(organization_id);

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'client_profiles' 
AND column_name = 'organization_id';

-- Show the updated table structure
\d client_profiles;
