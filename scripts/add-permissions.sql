-- Add permissions for organizations table
GRANT INSERT ON TABLE public.organizations TO authenticated;
GRANT SELECT ON TABLE public.organizations TO authenticated;
GRANT UPDATE ON TABLE public.organizations TO authenticated;
GRANT DELETE ON TABLE public.organizations TO authenticated;
