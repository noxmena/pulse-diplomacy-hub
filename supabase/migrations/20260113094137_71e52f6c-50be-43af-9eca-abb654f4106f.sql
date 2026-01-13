-- Drop the overly permissive INSERT policies
DROP POLICY IF EXISTS "Anyone can submit application" ON public.applicants;
DROP POLICY IF EXISTS "Anyone can submit join application" ON public.join_applications;

-- Create new restricted INSERT policies that only allow service role (edge functions)
-- This ensures all public submissions go through the edge function with rate limiting

-- For applicants table - only allow inserts from authenticated service role or HR/admin
CREATE POLICY "Service role and HR can insert applicants"
ON public.applicants
FOR INSERT
WITH CHECK (
  -- Allow HR/admin users to insert directly
  is_hr_or_admin(auth.uid())
);

-- For join_applications - only service role can insert (via edge function)
-- Note: We use a trigger to create applicants from join_applications, 
-- so we need to allow the service role which the edge function uses
CREATE POLICY "Edge function can insert join applications"
ON public.join_applications
FOR INSERT
WITH CHECK (
  -- This policy will block direct client inserts (anon key)
  -- Edge functions use service_role which bypasses RLS
  false
);