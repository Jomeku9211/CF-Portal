-- Temporarily disable RLS on organizations table for testing
ALTER TABLE organizations DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'organizations';

-- After testing, you can re-enable RLS with:
-- ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
