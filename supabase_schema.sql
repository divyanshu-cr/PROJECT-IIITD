-- ==============================================================================
-- BharatTest - Real-World Indian App Reliability Testing Platform
-- Supabase PostgreSQL Database Schema & Initial Seeding
-- Project ID: smfqgvtoqvmzerkfptws
-- Direct Dashboard URL: https://supabase.com/dashboard/project/smfqgvtoqvmzerkfptws/sql/new
-- ==============================================================================

-- 1. DROP EXISTING POLICIES & TABLES (Clean Migration)
DROP POLICY IF EXISTS "Public Read Projects" ON public.projects;
DROP POLICY IF EXISTS "Public Insert/Update Projects" ON public.projects;
DROP POLICY IF EXISTS "Public Read Test Runs" ON public.test_runs;
DROP POLICY IF EXISTS "Public Insert/Update Test Runs" ON public.test_runs;
DROP POLICY IF EXISTS "Public Read Failures" ON public.failures;
DROP POLICY IF EXISTS "Public Insert/Update Failures" ON public.failures;

-- 2. CREATE TABLE: projects
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  platform TEXT NOT NULL,
  environment TEXT NOT NULL,
  version TEXT,
  package_id_or_url TEXT,
  owner TEXT,
  last_run_at TEXT,
  unresolved_issues_count INTEGER DEFAULT 0,
  critical_issues_count INTEGER DEFAULT 0,
  reliability_score INTEGER DEFAULT 70,
  affected_users_estimate BIGINT DEFAULT 0,
  description TEXT,
  connection_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. CREATE TABLE: test_runs
CREATE TABLE IF NOT EXISTS public.test_runs (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
  project_name TEXT NOT NULL,
  scenario_name TEXT NOT NULL,
  status TEXT NOT NULL,
  started_at TEXT,
  duration_seconds INTEGER,
  total_checks INTEGER,
  passed_checks INTEGER,
  failed_checks INTEGER,
  conditions_applied JSONB,
  failures_detected JSONB,
  affected_users_risk BIGINT,
  log_summary JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CREATE TABLE: failures
CREATE TABLE IF NOT EXISTS public.failures (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  severity TEXT NOT NULL,
  category TEXT NOT NULL,
  affected_users_estimate BIGINT,
  affected_user_percent NUMERIC,
  root_cause TEXT,
  conditions_hit JSONB,
  reproduction_steps JSONB,
  har_summary JSONB,
  code_fix JSONB,
  status TEXT DEFAULT 'open',
  first_detected_at TEXT,
  last_verified_at TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.failures ENABLE ROW LEVEL SECURITY;

-- 6. CONFIGURE RLS POLICIES FOR PUBLIC ANON / FRONTEND ACCESS
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Insert/Update Projects" ON public.projects FOR ALL USING (true);

CREATE POLICY "Public Read Test Runs" ON public.test_runs FOR SELECT USING (true);
CREATE POLICY "Public Insert/Update Test Runs" ON public.test_runs FOR ALL USING (true);

CREATE POLICY "Public Read Failures" ON public.failures FOR SELECT USING (true);
CREATE POLICY "Public Insert/Update Failures" ON public.failures FOR ALL USING (true);

-- 7. SEED INITIAL REAL-WORLD INDIAN PROJECTS
INSERT INTO public.projects (
  id, name, platform, environment, version, package_id_or_url, owner,
  last_run_at, unresolved_issues_count, critical_issues_count,
  reliability_score, affected_users_estimate, description, connection_type
) VALUES
(
  'proj-1',
  'KiranaQuick Consumer App',
  'android',
  'production',
  'v3.14.2 (Build 4120)',
  'in.kiranaquick.consumer',
  'Arjun Verma (Mobile Lead)',
  '12 mins ago',
  4,
  2,
  68,
  3520000,
  '10-minute grocery delivery app active across 45 Indian cities including Tier 2 hubs like Lucknow, Indore, and Coimbatore.',
  'apk_upload'
),
(
  'proj-2',
  'BharatPay Merchant Soundbox & POS',
  'web',
  'production',
  'v2.8.0-hotfix.1',
  'https://pos.bharatpay.in',
  'Pooja Iyer (Fintech QA)',
  '2 hours ago',
  3,
  1,
  74,
  1850000,
  'Merchant payment verification portal and QR management dashboard used by 1.2M shopkeepers in roadside retail.',
  'web_url'
),
(
  'proj-3',
  'NxtWave Bharat Learning Portal',
  'web',
  'staging',
  'v4.1.0-rc2',
  'https://staging.nxtwave.in/learn',
  'Siddharth Rao (Platform Eng)',
  'Yesterday, 18:30',
  2,
  0,
  89,
  420000,
  'Vernacular coding and skilling LMS catering to college students in Tier 3 & Tier 4 towns across Andhra, Telangana, and UP.',
  'web_url'
),
(
  'proj-4',
  'DesiRide Driver Partner App',
  'android',
  'staging',
  'v1.9.5',
  'com.desiride.driver.partner',
  'Kavita Nair (Product Reliability)',
  '3 days ago',
  5,
  2,
  61,
  2100000,
  'Auto-rickshaw and bike taxi partner app requiring background GPS polling and instant ride intent notification delivery.',
  'apk_upload'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  reliability_score = EXCLUDED.reliability_score,
  affected_users_estimate = EXCLUDED.affected_users_estimate;

-- 8. SEED INITIAL REAL-WORLD INDIAN FAILURES
INSERT INTO public.failures (
  id, project_id, title, severity, category, affected_users_estimate, affected_user_percent,
  root_cause, conditions_hit, reproduction_steps, har_summary, code_fix, status, first_detected_at
) VALUES
(
  'fail-1',
  'proj-1',
  'UPI Intent App Switch Kills Main Activity on 2GB RAM Devices',
  'critical',
  'Low-Memory & OOM',
  2420000,
  42.6,
  'When delegating UPI payment intent to Google Pay / PhonePe, Xiaomi MIUI Aggressive RAM Cleaner kills the background KiranaQuick process because total available device RAM drops below 180MB. On user return, saved checkout state in SQLite is wiped due to missing onSaveInstanceState bundle restore.',
  '{"network": "Jio 4G Peak Congestion (Tier 2/3)", "device": "Xiaomi Redmi 9A (2GB RAM)", "locale": "Hindi (हिंदी)", "locationTier": "Tier 2/3"}'::jsonb,
  '["Launch app on device with <= 2GB RAM running MIUI or ColorOS with 3 background apps open.", "Add items to cart and proceed to Checkout page.", "Select UPI via Installed App and trigger intent switch to PhonePe / GPay.", "OEM task manager forcefully issues SIGKILL to background app activity after 4.2 seconds.", "Complete or cancel payment in PhonePe and press back button to return.", "KiranaQuick launches from scratch; cart is empty, transaction shows as Pending Abandoned."]'::jsonb,
  '{"endpoint": "/api/v2/orders/upi-intent-verify", "durationMs": 14800, "status": 0, "errorType": "CLIENT_PROCESS_TERMINATED"}'::jsonb,
  '{"filename": "android/app/src/main/java/in/kiranaquick/CheckoutActivity.kt", "language": "kotlin", "explanation": "Saves active order identity into persistent Room storage before opening UPI intent, and gracefully reconciles payment status upon activity rebirth rather than crashing to homepage."}'::jsonb,
  'open',
  'Oct 28, 2026, 14:22'
),
(
  'fail-2',
  'proj-1',
  'Tamil & Telugu Vernacular Text Clips Proceed to Pay CTA on 360px Width',
  'critical',
  'Vernacular Overflow',
  1100000,
  19.4,
  'Fixed-width container w-[140px] on bottom sticky checkout bar causes Tamil translation to wrap into 4 lines, overflowing container bounds and pushing the primary touch target offscreen on standard 360px width displays with 1.25x accessibility font sizing.',
  '{"network": "Metro Fiber / 5G High Speed (Baseline)", "device": "Xiaomi Redmi 9A (2GB RAM)", "locale": "Tamil (தமிழ்)", "locationTier": "Tier 2/3"}'::jsonb,
  '["Set system language to Tamil and Font Size to Large (1.25x).", "Open app on 360px viewport device (e.g. Redmi 9A).", "Navigate to Cart and scroll to bottom payment bar.", "Primary button text wraps vertically, clipping the payment button completely outside viewport boundary.", "User is unable to tap Pay and abandons checkout."]'::jsonb,
  '{"endpoint": "/views/cart-summary", "durationMs": 42, "status": 200, "errorType": "LAYOUT_CLIP_ACCESSIBILITY"}'::jsonb,
  '{"filename": "src/components/checkout/BottomPayBar.tsx", "language": "tsx", "explanation": "Replaces fixed 140px width with responsive flex-1 and min-touch-target 44px, allowing multi-syllabic Indic scripts to expand naturally without clipping."}'::jsonb,
  'open',
  'Oct 27, 2026, 09:15'
),
(
  'fail-3',
  'proj-2',
  'NPCI UPI Webhook Drops on 3G Congested Tower Intermittent ACK',
  'critical',
  'Payment & Webhook',
  890000,
  15.6,
  'Merchant soundbox verification client enforces a strict 8-second HTTP socket timeout. In congested rural cell towers during UPI peak loads, NPCI reverse-proxy ACK requires between 11s and 18s. The soundbox client gives up prematurely and declares Payment Failed, while customer account was debited.',
  '{"network": "Jio 4G Peak Congestion (Tier 2/3)", "device": "Samsung Galaxy M12 (3GB RAM)", "locale": "Indian English (Hinglish Supported)", "locationTier": "Rural / Transit"}'::jsonb,
  '["Simulate merchant QR code scan under 650ms latency and 12% packet loss.", "Customer authorizes payment via UPI PIN.", "Soundbox client polls endpoint /api/v1/qr/poll-soundbox with 8000ms timeout.", "Network delay pushes response to 10,400ms.", "Soundbox throws java.net.SocketTimeoutException and announces error tone to vendor.", "Merchant denies delivery despite customer receiving bank SMS confirmation."]'::jsonb,
  '{"endpoint": "/api/v1/qr/poll-soundbox", "durationMs": 8001, "status": 408, "errorType": "CLIENT_SOCKET_TIMEOUT"}'::jsonb,
  '{"filename": "services/webhook/SoundboxReconciler.ts", "language": "typescript", "explanation": "Implements adaptive polling window up to 35 seconds matching NPCI SLA recommendations, preventing false negative soundbox announcements."}'::jsonb,
  'open',
  'Oct 26, 2026, 17:50'
)
ON CONFLICT (id) DO NOTHING;

-- 9. SEED INITIAL TEST RUNS
INSERT INTO public.test_runs (
  id, project_id, project_name, scenario_name, status, started_at, duration_seconds,
  total_checks, passed_checks, failed_checks, conditions_applied, failures_detected,
  affected_users_risk, log_summary
) VALUES
(
  'run-9021',
  'proj-1',
  'KiranaQuick Consumer App',
  'UPI Checkout & Intent Switch Under 2GB RAM Constraint',
  'failed',
  '12 mins ago',
  42,
  18,
  14,
  4,
  '{"networkProfile": "Jio 4G Peak Congestion (Tier 2/3)", "deviceProfile": "Xiaomi Redmi 9A (2GB RAM)", "locale": "Hindi (हिंदी)", "tier": "Tier 2/3"}'::jsonb,
  '["fail-1", "fail-2"]'::jsonb,
  3520000,
  '["[00:01] Initializing virtual device sandbox (Redmi 9A, 2048MB RAM, MIUI 12)", "[00:04] Applying network impairment profile: Latency=650ms, Jitter=140ms, Loss=12%", "[00:27] CRITICAL: OEM ActivityManager issued SIGKILL (PID: 14820)", "[00:42] ASSERTION FAILED: Cart reconciliation failed after payment intent switch."]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Verification query
SELECT
  (SELECT count(*) FROM public.projects) AS total_projects,
  (SELECT count(*) FROM public.test_runs) AS total_test_runs,
  (SELECT count(*) FROM public.failures) AS total_failures;
