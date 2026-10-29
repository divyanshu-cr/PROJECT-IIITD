import { DeviceProfile, FailureItem, LocaleProfile, NetworkProfile, Project, TestRun, TestScenario } from '../types';

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'KiranaQuick Consumer App',
    platform: 'android',
    environment: 'production',
    version: 'v3.14.2 (Build 4120)',
    packageIdOrUrl: 'in.kiranaquick.consumer',
    owner: 'Arjun Verma (Mobile Lead)',
    lastRunAt: '12 mins ago',
    unresolvedIssuesCount: 4,
    criticalIssuesCount: 2,
    reliabilityScore: 68,
    affectedUsersEstimate: 3520000,
    description: '10-minute grocery delivery app active across 45 Indian cities including Tier 2 hubs like Lucknow, Indore, and Coimbatore.',
    connectionType: 'apk_upload',
  },
  {
    id: 'proj-2',
    name: 'BharatPay Merchant Soundbox & POS',
    platform: 'web',
    environment: 'production',
    version: 'v2.8.0-hotfix.1',
    packageIdOrUrl: 'https://pos.bharatpay.in',
    owner: 'Pooja Iyer (Fintech QA)',
    lastRunAt: '2 hours ago',
    unresolvedIssuesCount: 3,
    criticalIssuesCount: 1,
    reliabilityScore: 74,
    affectedUsersEstimate: 1850000,
    description: 'Merchant payment verification portal and QR management dashboard used by 1.2M shopkeepers in roadside retail.',
    connectionType: 'web_url',
  },
  {
    id: 'proj-3',
    name: 'NxtWave Bharat Learning Portal',
    platform: 'web',
    environment: 'staging',
    version: 'v4.1.0-rc2',
    packageIdOrUrl: 'https://staging.nxtwave.in/learn',
    owner: 'Siddharth Rao (Platform Eng)',
    lastRunAt: 'Yesterday, 18:30',
    unresolvedIssuesCount: 2,
    criticalIssuesCount: 0,
    reliabilityScore: 89,
    affectedUsersEstimate: 420000,
    description: 'Vernacular coding and skilling LMS catering to college students in Tier 3 & Tier 4 towns across Andhra, Telangana, and UP.',
    connectionType: 'web_url',
  },
  {
    id: 'proj-4',
    name: 'DesiRide Driver Partner App',
    platform: 'android',
    environment: 'staging',
    version: 'v1.9.5',
    packageIdOrUrl: 'com.desiride.driver.partner',
    owner: 'Kavita Nair (Product Reliability)',
    lastRunAt: '3 days ago',
    unresolvedIssuesCount: 5,
    criticalIssuesCount: 2,
    reliabilityScore: 61,
    affectedUsersEstimate: 2100000,
    description: 'Auto-rickshaw and bike taxi partner app requiring background GPS polling and instant ride intent notification delivery.',
    connectionType: 'apk_upload',
  },
];

export const networkProfiles: NetworkProfile[] = [
  {
    id: 'net-jio-congested',
    name: 'Jio 4G Peak Congestion (Tier 2/3)',
    description: 'Simulates evening peak hours (7 PM - 10 PM) in dense semi-urban colonies with shared cell-tower backhaul.',
    carrier: 'Jio',
    generation: '4G',
    latencyMs: 650,
    packetLossPercent: 12,
    downloadKbps: 340,
    uploadKbps: 180,
    jitterMs: 140,
    timeoutCutoffSec: 15,
  },
  {
    id: 'net-irctc-transit',
    name: 'Indian Railways Express Transit',
    description: 'Intermittent signal fading as train moves between rural sector towers; frequent 8–15s zero-signal blindspots.',
    carrier: 'Mixed',
    generation: 'Wi-Fi Intermittent',
    latencyMs: 950,
    packetLossPercent: 24,
    downloadKbps: 180,
    uploadKbps: 80,
    jitterMs: 220,
    timeoutCutoffSec: 20,
    isTransitMode: true,
  },
  {
    id: 'net-airtel-tier3-3g',
    name: 'Airtel 3G Fallback (Rural Chawl/Tehsil)',
    description: 'Degraded fallback when device drops 4G due to structural indoor shielding in concrete/brick housing.',
    carrier: 'Airtel',
    generation: '3G',
    latencyMs: 820,
    packetLossPercent: 16,
    downloadKbps: 220,
    uploadKbps: 110,
    jitterMs: 190,
    timeoutCutoffSec: 25,
  },
  {
    id: 'net-basement-elevator',
    name: 'Basement Parking & Lift Outage',
    description: 'Sudden complete radio blackout (0 kbps) for 10 seconds followed by abrupt reconnection with stale DNS socket.',
    carrier: 'Vi',
    generation: '2G',
    latencyMs: 1400,
    packetLossPercent: 45,
    downloadKbps: 64,
    uploadKbps: 32,
    jitterMs: 380,
    timeoutCutoffSec: 30,
  },
  {
    id: 'net-urban-5g-fiber',
    name: 'Metro Fiber / 5G High Speed (Baseline)',
    description: 'Low-latency urban baseline (Tier 1 tech corridor like Koramangala or BKC) for baseline control comparison.',
    carrier: 'Airtel',
    generation: '5G',
    latencyMs: 28,
    packetLossPercent: 0.2,
    downloadKbps: 45000,
    uploadKbps: 20000,
    jitterMs: 8,
    timeoutCutoffSec: 10,
  },
];

export const deviceProfiles: DeviceProfile[] = [
  {
    id: 'dev-redmi-9a',
    name: 'Xiaomi Redmi 9A (2GB RAM)',
    brand: 'Xiaomi / Redmi',
    tier: 'budget',
    ramGb: 2,
    soc: 'MediaTek Helio G25 (Octa-core)',
    osVersion: 'Android 10 (MIUI 12)',
    screenResolution: '720 x 1600 (269 ppi)',
    viewportWidthPx: 360,
    marketShareInIndiaPercent: 18.4,
    hasAggressiveOemKiller: true,
    defaultFontScale: 1.2,
  },
  {
    id: 'dev-jiophone-next',
    name: 'JioPhone Next (2GB RAM)',
    brand: 'Reliance Jio',
    tier: 'entry',
    ramGb: 2,
    soc: 'Qualcomm Snapdragon 215 (Quad-core)',
    osVersion: 'Pragati OS (Android 11 Go Edition)',
    screenResolution: '720 x 1440',
    viewportWidthPx: 320,
    marketShareInIndiaPercent: 11.2,
    hasAggressiveOemKiller: false,
    defaultFontScale: 1.3,
  },
  {
    id: 'dev-galaxy-m12',
    name: 'Samsung Galaxy M12 (3GB RAM)',
    brand: 'Samsung',
    tier: 'mid',
    ramGb: 3,
    soc: 'Exynos 850 (8nm)',
    osVersion: 'Android 11 (One UI Core 3.1)',
    screenResolution: '720 x 1600',
    viewportWidthPx: 384,
    marketShareInIndiaPercent: 14.6,
    hasAggressiveOemKiller: true,
    defaultFontScale: 1.15,
  },
  {
    id: 'dev-realme-c31',
    name: 'Realme C31 (3GB RAM)',
    brand: 'Realme',
    tier: 'budget',
    ramGb: 3,
    soc: 'Unisoc Tiger T612',
    osVersion: 'Android 11 (realme UI R Edition)',
    screenResolution: '720 x 1600',
    viewportWidthPx: 360,
    marketShareInIndiaPercent: 9.8,
    hasAggressiveOemKiller: true,
    defaultFontScale: 1.25,
  },
  {
    id: 'dev-oneplus-nord',
    name: 'OnePlus Nord CE 3 (8GB RAM)',
    brand: 'OnePlus',
    tier: 'flagship',
    ramGb: 8,
    soc: 'Snapdragon 782G',
    osVersion: 'Android 14 (OxygenOS)',
    screenResolution: '1080 x 2412',
    viewportWidthPx: 412,
    marketShareInIndiaPercent: 6.2,
    hasAggressiveOemKiller: false,
    defaultFontScale: 1.0,
  },
];

export const localeProfiles: LocaleProfile[] = [
  {
    id: 'loc-hi',
    name: 'Hindi (हिंदी)',
    nativeScript: 'देवनागरी (Devanagari)',
    languageCode: 'hi-IN',
    expansionFactor: 32, // +32% character length vs English
    sampleText: 'ऑर्डर कन्फर्म करने के लिए यहाँ टैप करें और भुगतान प्रक्रिया पूरी करें',
    numberFormat: 'Indian Lakhs/Crores',
  },
  {
    id: 'loc-ta',
    name: 'Tamil (தமிழ்)',
    nativeScript: 'தமிழ் எழுத்துமுறை',
    languageCode: 'ta-IN',
    expansionFactor: 48, // +48% length, heavy syllabic glyph stacking
    sampleText: 'உங்கள் ஆர்டரை உறுதிசெய்து பாதுகாப்பாகப் பணம் செலுத்தவும்',
    numberFormat: 'Indian Lakhs/Crores',
  },
  {
    id: 'loc-te',
    name: 'Telugu (తెలుగు)',
    nativeScript: 'తెలుగు లిపి',
    languageCode: 'te-IN',
    expansionFactor: 42,
    sampleText: 'మీ ఆర్డర్‌ను ధృవీకరించడానికి ఇక్కడ నొక్కండి మరియు చెల్లింపు పూర్తి చేయండి',
    numberFormat: 'Indian Lakhs/Crores',
  },
  {
    id: 'loc-bn',
    name: 'Bengali (বাংলা)',
    nativeScript: 'বাংলা লিপি',
    languageCode: 'bn-IN',
    expansionFactor: 36,
    sampleText: 'আপনার অর্ডার নিশ্চিত করতে এবং পেমেন্ট সম্পন্ন করতে আলতো চাপুন',
    numberFormat: 'Indian Lakhs/Crores',
  },
  {
    id: 'loc-en-in',
    name: 'Indian English (Hinglish Supported)',
    nativeScript: 'Latin',
    languageCode: 'en-IN',
    expansionFactor: 0,
    sampleText: 'Tap here to confirm your order and complete secure payment',
    numberFormat: 'Indian Lakhs/Crores',
  },
];

export const initialFailures: FailureItem[] = [
  {
    id: 'fail-1',
    projectId: 'proj-1',
    title: 'UPI Intent App Switch Kills Main Activity on 2GB RAM Devices',
    severity: 'critical',
    category: 'Low-Memory & OOM',
    affectedUsersEstimate: 2420000,
    affectedUserPercent: 42.6,
    rootCause: 'When delegating UPI payment intent to Google Pay / PhonePe, Xiaomi MIUI Aggressive RAM Cleaner kills the background KiranaQuick process because total available device RAM drops below 180MB. On user return, saved checkout state in SQLite is wiped due to missing onSaveInstanceState bundle restore.',
    conditionsHit: {
      network: 'Jio 4G Peak Congestion (Tier 2/3)',
      device: 'Xiaomi Redmi 9A (2GB RAM)',
      locale: 'Hindi (हिंदी)',
      locationTier: 'Tier 2/3',
    },
    reproductionSteps: [
      'Launch app on device with <= 2GB RAM running MIUI or ColorOS with 3 background apps open.',
      'Add items to cart and proceed to Checkout page.',
      'Select "UPI via Installed App" and trigger intent switch to PhonePe / GPay.',
      'OEM task manager forcefully issues SIGKILL to background app activity after 4.2 seconds.',
      'Complete or cancel payment in PhonePe and press back button to return.',
      'KiranaQuick launches from scratch (cold boot); cart is empty, transaction shows as "Pending Abandoned".',
    ],
    harSummary: {
      endpoint: '/api/v2/orders/upi-intent-verify',
      durationMs: 14800,
      status: 0,
      errorType: 'CLIENT_PROCESS_TERMINATED',
    },
    codeFix: {
      filename: 'android/app/src/main/java/in/kiranaquick/CheckoutActivity.kt',
      language: 'kotlin',
      beforeCode: `// INCORRECT: In-memory session destroyed when backgrounded on 2GB RAM
override fun onPause() {
    super.onPause()
    // Session state kept only in memory
}

override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    val orderId = currentCheckoutState?.orderId // CRASH: currentCheckoutState is null after process kill!
    verifyPayment(orderId)
}`,
      afterCode: `// CORRECT: Persist intent session token to EncryptedSharedPreferences with ViewModel SavedStateHandle
override fun onSaveInstanceState(outState: Bundle) {
    super.onSaveInstanceState(outState)
    outState.putString("ACTIVE_ORDER_ID", viewModel.currentOrderId)
    outState.putLong("INTENT_TIMESTAMP", System.currentTimeMillis())
    // Also flush transaction ID to Room persistent cache for cold recovery
    checkoutLocalRepository.persistPendingIntent(viewModel.currentOrderId)
}

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    val restoredOrderId = savedInstanceState?.getString("ACTIVE_ORDER_ID")
        ?: checkoutLocalRepository.fetchLatestPendingIntent()
    if (restoredOrderId != null) {
        viewModel.resumeUpiReconciliationFlow(restoredOrderId)
    }
}`,
      explanation: 'Saves active order identity into persistent Room storage before opening UPI intent, and gracefully reconciles payment status upon activity rebirth rather than crashing to homepage.',
    },
    status: 'open',
    firstDetectedAt: 'Oct 28, 2026, 14:22',
  },
  {
    id: 'fail-2',
    projectId: 'proj-1',
    title: 'Tamil & Telugu Vernacular Text Clips "Proceed to Pay" CTA on 360px Width',
    severity: 'critical',
    category: 'Vernacular Overflow',
    affectedUsersEstimate: 1100000,
    affectedUserPercent: 19.4,
    rootCause: 'Fixed-width container `w-[140px]` on bottom sticky checkout bar causes Tamil translation "உங்கள் ஆர்டரை உறுதிசெய்து..." to wrap into 4 lines, overflowing container bounds and pushing the primary touch target offscreen on standard 360px width displays with 1.25x accessibility font sizing.',
    conditionsHit: {
      network: 'Metro Fiber / 5G High Speed (Baseline)',
      device: 'Xiaomi Redmi 9A (2GB RAM)',
      locale: 'Tamil (தமிழ்)',
      locationTier: 'Tier 2/3',
    },
    reproductionSteps: [
      'Set system language to Tamil (தமிழ்) and Font Size to Large (1.25x in Android Settings).',
      'Open app on 360px viewport device (e.g. Redmi 9A or Realme C11).',
      'Navigate to Cart with ₹480 worth of vegetables.',
      'Scroll to bottom payment action bar.',
      'Primary button text wraps vertically, clipping the payment button completely outside viewport boundary.',
      'User is unable to tap "Pay" and abandons checkout.',
    ],
    harSummary: {
      endpoint: '/views/cart-summary',
      durationMs: 42,
      status: 200,
      errorType: 'LAYOUT_CLIP_ACCESSIBILITY',
    },
    codeFix: {
      filename: 'src/components/checkout/BottomPayBar.tsx',
      language: 'tsx',
      beforeCode: `// INCORRECT: Fixed width and rigid height assumptions
<div className="fixed bottom-0 left-0 right-0 h-16 bg-white flex items-center justify-between px-4">
  <span className="text-sm font-bold">₹{cartTotal}</span>
  <button className="w-[140px] h-10 bg-indigo-600 text-white rounded text-sm font-medium truncate">
    {t('checkout.confirm_and_pay')}
  </button>
</div>`,
      afterCode: `// CORRECT: Dynamic auto-sizing flex layout with min-touch-target 44px and responsive wrap
<div className="fixed bottom-0 left-0 right-0 min-h-[4.5rem] bg-white border-t border-slate-200 p-3 pb-safe flex flex-wrap items-center justify-between gap-3 shadow-lg">
  <div className="flex flex-col">
    <span className="text-xs text-slate-500 font-medium">{t('checkout.total_payable')}</span>
    <span className="text-base font-bold text-slate-900 tabular-nums">₹{cartTotal.toLocaleString('en-IN')}</span>
  </div>
  <button className="flex-1 min-w-[160px] min-h-[44px] px-4 py-2.5 bg-indigo-600 active:bg-indigo-700 text-white font-semibold text-sm rounded-lg text-center leading-snug transition-colors">
    {t('checkout.confirm_and_pay')}
  </button>
</div>`,
      explanation: 'Replaces fixed 140px width with responsive flex-1 and min-touch-target 44px, allowing multi-syllabic Indic scripts to expand naturally without clipping.',
    },
    status: 'open',
    firstDetectedAt: 'Oct 27, 2026, 09:15',
  },
  {
    id: 'fail-3',
    projectId: 'proj-2',
    title: 'NPCI UPI Webhook Drops on 3G Congested Tower Intermittent ACK',
    severity: 'critical',
    category: 'Payment & Webhook',
    affectedUsersEstimate: 890000,
    affectedUserPercent: 15.6,
    rootCause: 'Merchant soundbox verification client enforces a strict 8-second HTTP socket timeout. In congested rural cell towers during UPI peak loads, NPCI reverse-proxy ACK requires between 11s and 18s. The soundbox client gives up prematurely and declares "Payment Failed", while the customer bank account was already debited.',
    conditionsHit: {
      network: 'Jio 4G Peak Congestion (Tier 2/3)',
      device: 'Samsung Galaxy M12 (3GB RAM)',
      locale: 'Indian English (Hinglish Supported)',
      locationTier: 'Rural / Transit',
    },
    reproductionSteps: [
      'Simulate merchant QR code scan under 650ms latency and 12% packet loss.',
      'Customer authorizes payment via UPI PIN.',
      'Soundbox client polls endpoint /api/v1/qr/poll-soundbox with 8000ms timeout.',
      'Network delay pushes response to 10,400ms.',
      'Soundbox throws java.net.SocketTimeoutException and announces error tone to vendor.',
      'Merchant denies delivery despite customer receiving bank SMS confirmation.',
    ],
    harSummary: {
      endpoint: '/api/v1/qr/poll-soundbox',
      durationMs: 8001,
      status: 408,
      errorType: 'CLIENT_SOCKET_TIMEOUT',
    },
    codeFix: {
      filename: 'services/webhook/SoundboxReconciler.ts',
      language: 'typescript',
      beforeCode: `// INCORRECT: Fragile single-poll with premature 8s timeout
export async function pollPaymentStatus(transactionId: string) {
  const response = await fetch(\`/api/v1/qr/poll/\${transactionId}\`, {
    signal: AbortSignal.timeout(8000), // Far too short for Indian 3G/congested cells
  });
  return response.json();
}`,
      afterCode: `// CORRECT: Exponential backoff polling up to 35s with optimistic state acknowledgment
export async function pollPaymentStatus(transactionId: string) {
  const maxWaitMs = 35000;
  const startTime = Date.now();
  let delayMs = 2000;

  while (Date.now() - startTime < maxWaitMs) {
    try {
      const response = await fetch(\`/api/v1/qr/poll/\${transactionId}\`, {
        signal: AbortSignal.timeout(12000),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'SUCCESS' || data.status === 'FAILED') {
          return data;
        }
      }
    } catch (err) {
      // Silently retry on transient socket timeout or packet drop
    }
    await new Promise((res) => setTimeout(res, delayMs));
    delayMs = Math.min(delayMs * 1.5, 6000);
  }
  return { status: 'PENDING_RECONCILING', message: 'Checking with NPCI switch...' };
}`,
      explanation: 'Implements adaptive polling window up to 35 seconds matching NPCI SLA recommendations, preventing false negative soundbox announcements.',
    },
    status: 'open',
    firstDetectedAt: 'Oct 26, 2026, 17:50',
  },
  {
    id: 'fail-4',
    projectId: 'proj-1',
    title: 'Offline Catalog Cache Invalidation Hangs on Intermittent 2G/Train Transit',
    severity: 'high',
    category: 'Offline & Sync',
    affectedUsersEstimate: 540000,
    affectedUserPercent: 9.5,
    rootCause: 'Service Worker and IndexedDB schema sync initiates parallel network fetching for 14MB of high-res grocery thumbnails without bandwidth sniffing. On 64kbps transit connection, browser network queue saturates, blocking critical inventory price checks.',
    conditionsHit: {
      network: 'Indian Railways Express Transit',
      device: 'Realme C31 (3GB RAM)',
      locale: 'Hindi (हिंदी)',
      locationTier: 'Rural / Transit',
    },
    reproductionSteps: [
      'Enable "Indian Railways Express Transit" network profile (180kbps, 24% packet loss).',
      'Open app and browse through "Daily Dairy & Bakery" categories.',
      'App launches sync queue downloading 45 product banners in background.',
      'Critical user tap on "Add to Cart" hangs because HTTP thread pool is starved.',
      'App displays blank spinner indefinitely.',
    ],
    codeFix: {
      filename: 'src/lib/sync/CatalogSyncWorker.ts',
      language: 'typescript',
      beforeCode: `// INCORRECT: Ungated parallel asset sync regardless of connection quality
export async function syncCatalog(items: ProductItem[]) {
  return Promise.all(items.map(item => fetch(item.highResImageUrl)));
}`,
      afterCode: `// CORRECT: Inspect navigator.connection and defer non-essential imagery on slow networks
export async function syncCatalog(items: ProductItem[]) {
  const conn = (navigator as any).connection;
  const isSlowNetwork = conn && (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === '3g');

  if (isSlowNetwork) {
    // Fetch only essential JSON metadata and lowest-weight thumbnail
    return batchFetchMetadataOnly(items.map(i => i.id));
  }
  return pLimit(items.map(item => () => fetch(item.thumbnailUrl)), 3);
}`,
      explanation: 'Gates image prefetching behind Network Information API, reserving precious bandwidth for checkout payload.',
    },
    status: 'fixing',
    firstDetectedAt: 'Oct 25, 2026, 11:10',
  },
  {
    id: 'fail-5',
    projectId: 'proj-4',
    title: 'Aadhaar DigiLocker eKYC OAuth Webview Crash on Low-Memory Devices',
    severity: 'high',
    category: 'Low-Memory & OOM',
    affectedUsersEstimate: 380000,
    affectedUserPercent: 6.7,
    rootCause: 'Driver verification launches embedded Android System Webview with hardware acceleration enabled. On 2GB RAM phones, GPU memory allocation triggers OutOfMemoryError and crashes driver app.',
    conditionsHit: {
      network: 'Airtel 3G Fallback (Rural Chawl/Tehsil)',
      device: 'JioPhone Next (2GB RAM)',
      locale: 'Bengali (বাংলা)',
      locationTier: 'Tier 2/3',
    },
    reproductionSteps: [
      'On JioPhone Next (2GB RAM Android Go), initiate Driver Onboarding step 3: Aadhaar Verification.',
      'Tap "Verify via DigiLocker".',
      'System Webview allocates 140MB native graphics buffer.',
      'Android OS Low Memory Killer kills parent process.',
    ],
    codeFix: {
      filename: 'android/app/src/main/java/com/desiride/partner/EkycWebActivity.kt',
      language: 'kotlin',
      beforeCode: `// INCORRECT: Force hardware acceleration on low RAM
webView.setLayerType(View.LAYER_TYPE_HARDWARE, null)`,
      afterCode: `// CORRECT: Detect low-RAM device profile and fallback to software rendering
val activityManager = getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
if (activityManager.isLowRamDevice) {
    webView.setLayerType(View.LAYER_TYPE_SOFTWARE, null)
    webView.settings.apply {
        setRenderPriority(WebSettings.RenderPriority.HIGH)
        cacheMode = WebSettings.LOAD_NO_CACHE
    }
}`,
      explanation: 'Detects low-RAM Android Go devices and avoids GPU memory exhaustion during heavy government portal webviews.',
    },
    status: 'open',
    firstDetectedAt: 'Oct 24, 2026, 16:04',
  },
];

export const initialTestRuns: TestRun[] = [
  {
    id: 'run-9021',
    projectId: 'proj-1',
    projectName: 'KiranaQuick Consumer App',
    scenarioName: 'UPI Checkout & Intent Switch Under 2GB RAM Constraint',
    status: 'failed',
    startedAt: '12 mins ago',
    durationSeconds: 42,
    totalChecks: 18,
    passedChecks: 14,
    failedChecks: 4,
    conditionsApplied: {
      networkProfile: 'Jio 4G Peak Congestion (Tier 2/3)',
      deviceProfile: 'Xiaomi Redmi 9A (2GB RAM)',
      locale: 'Hindi (हिंदी)',
      tier: 'Tier 2/3',
    },
    failuresDetected: ['fail-1', 'fail-2'],
    affectedUsersRisk: 3520000,
    logSummary: [
      '[00:01] Initializing virtual device sandbox (Redmi 9A, 2048MB RAM, MIUI 12)',
      '[00:04] Applying network impairment profile: Latency=650ms, Jitter=140ms, Loss=12%',
      '[00:08] Bootstrapping app APK in.kiranaquick.consumer (v3.14.2)',
      '[00:15] Cart populated: 4 items (Amul Taaza Milk, Aashirvaad Atta 5kg)',
      '[00:22] Triggered Intent: android.intent.action.VIEW (upi://pay?pa=kirana@icici...)',
      '[00:26] ALERT: System Memory Pressure Critical (Free RAM: 94MB)',
      '[00:27] CRITICAL: OEM ActivityManager issued SIGKILL (PID: 14820) - Process Terminated',
      '[00:34] User returned to app: Cold launch detected. Previous activity state null.',
      '[00:42] ASSERTION FAILED: Cart reconciliation failed after payment intent switch.',
    ],
  },
  {
    id: 'run-9020',
    projectId: 'proj-2',
    projectName: 'BharatPay Merchant Soundbox & POS',
    scenarioName: 'High-Volume QR Payment Polling on 3G Congested Tower',
    status: 'failed',
    startedAt: '2 hours ago',
    durationSeconds: 58,
    totalChecks: 24,
    passedChecks: 21,
    failedChecks: 3,
    conditionsApplied: {
      networkProfile: 'Jio 4G Peak Congestion (Tier 2/3)',
      deviceProfile: 'Samsung Galaxy M12 (3GB RAM)',
      locale: 'Tamil (தமிழ்)',
      tier: 'Tier 2/3',
    },
    failuresDetected: ['fail-3'],
    affectedUsersRisk: 890000,
    logSummary: [
      '[00:01] Launching Web Driver headless chrome on emulated Galaxy M12 viewport (384x854)',
      '[00:05] Connected to POS endpoint https://pos.bharatpay.in',
      '[00:12] Emulating 10 concurrent QR scan incoming payment webhooks',
      '[00:28] NPCI switch simulation delay injected: 11,200ms roundtrip',
      '[00:36] Soundbox client socket closed at 8000ms: SocketTimeoutException',
      '[00:44] UI emitted: "Payment Timeout - Please re-scan QR"',
      '[00:58] ASSERTION FAILED: False negative payment status broadcast to merchant.',
    ],
  },
  {
    id: 'run-9019',
    projectId: 'proj-3',
    projectName: 'NxtWave Bharat Learning Portal',
    scenarioName: 'Vernacular Code Editor on Slow 3G Fallback',
    status: 'passed',
    startedAt: 'Yesterday, 18:30',
    durationSeconds: 34,
    totalChecks: 16,
    passedChecks: 16,
    failedChecks: 0,
    conditionsApplied: {
      networkProfile: 'Airtel 3G Fallback (Rural Chawl/Tehsil)',
      deviceProfile: 'Realme C31 (3GB RAM)',
      locale: 'Telugu (తెలుగు)',
      tier: 'Tier 2/3',
    },
    failuresDetected: [],
    affectedUsersRisk: 0,
    logSummary: [
      '[00:01] Target: https://staging.nxtwave.in/learn',
      '[00:06] Telugu vernacular font "Gidugu" preloaded in 420ms (Woff2 subset)',
      '[00:14] Code editor initialized with Monaco WebWorker fallback',
      '[00:26] Offline lesson cache persisted to IndexedDB: 2.4MB',
      '[00:34] ALL 16 ASSERTIONS PASSED: Zero text clipping, reliable offline access.',
    ],
  },
  {
    id: 'run-9018',
    projectId: 'proj-4',
    projectName: 'DesiRide Driver Partner App',
    scenarioName: 'Aadhaar DigiLocker e-KYC Low-RAM Stress Test',
    status: 'failed',
    startedAt: '3 days ago',
    durationSeconds: 50,
    totalChecks: 12,
    passedChecks: 9,
    failedChecks: 3,
    conditionsApplied: {
      networkProfile: 'Airtel 3G Fallback (Rural Chawl/Tehsil)',
      deviceProfile: 'JioPhone Next (2GB RAM)',
      locale: 'Bengali (বাংলা)',
      tier: 'Tier 2/3',
    },
    failuresDetected: ['fail-5'],
    affectedUsersRisk: 380000,
    logSummary: [
      '[00:02] Initializing Android 11 Go Edition profile',
      '[00:11] Triggering Driver KYC Flow: Upload Aadhaar / Pan',
      '[00:23] Webview created for oauth.digilocker.gov.in',
      '[00:31] System WebView hardware acceleration heap spiked to 138MB',
      '[00:38] Native Crash: OutOfMemoryError in libwebviewchromium.so',
      '[00:50] ASSERTION FAILED: Application crashed during DigiLocker authorization step.',
    ],
  },
];

export const testScenarios: TestScenario[] = [
  {
    id: 'scen-upi-reconcile',
    name: 'UPI Intent App Switch & Process Kill Resilience',
    description: 'Verifies whether application gracefully preserves shopping cart, payment tokens, and recovers cleanly when OEM battery manager kills the app during GPay/PhonePe switch.',
    category: 'Payment Reliability',
    targetUserFlow: 'Cart -> Select UPI -> External App Switch -> Return -> State Recovery',
    recommendedProfiles: {
      networkId: 'net-jio-congested',
      deviceId: 'dev-redmi-9a',
      localeId: 'loc-hi',
    },
    assertionsCount: 8,
    estimatedRuntimeSec: 45,
  },
  {
    id: 'scen-vernacular-overflow',
    name: 'Indic Font Expansion & Viewport Truncation Audit',
    description: 'Tests Tamil, Telugu, and Hindi translations across 320px and 360px viewports with 1.25x accessibility scaling to detect wrapped buttons, clipped prices, and overlapping touch targets.',
    category: 'Localization & UX',
    targetUserFlow: 'All Primary CTA Buttons, Cart Summary, Order Tracking Viewports',
    recommendedProfiles: {
      networkId: 'net-urban-5g-fiber',
      deviceId: 'dev-redmi-9a',
      localeId: 'loc-ta',
    },
    assertionsCount: 14,
    estimatedRuntimeSec: 25,
  },
  {
    id: 'scen-soundbox-polling',
    name: 'NPCI Bank Switch Latency & Webhook Resilience',
    description: 'Simulates 8s - 25s delays in banking gateway acknowledgments during peak festive shopping hours to verify that user/merchant is not greeted with false negative failure tones.',
    category: 'Fintech SLA',
    targetUserFlow: 'Merchant QR Scan -> Gateway Latency Injection -> Soundbox Broadcast',
    recommendedProfiles: {
      networkId: 'net-jio-congested',
      deviceId: 'dev-galaxy-m12',
      localeId: 'loc-en-in',
    },
    assertionsCount: 10,
    estimatedRuntimeSec: 60,
  },
  {
    id: 'scen-railway-transit',
    name: 'Indian Railways Intermittent Signal & Offline Cart Sync',
    description: 'Injects periodic 10-second complete network blackouts followed by erratic 2G restoration to test network request retries, idempotency keys, and offline queue preservation.',
    category: 'Network Resilience',
    targetUserFlow: 'Catalog Browse -> Add to Cart -> Network Drop -> Reconnect -> Checkout Sync',
    recommendedProfiles: {
      networkId: 'net-irctc-transit',
      deviceId: 'dev-realme-c31',
      localeId: 'loc-hi',
    },
    assertionsCount: 12,
    estimatedRuntimeSec: 50,
  },
];

export const indiaDemographics = {
  telecomMarketShare: [
    { name: 'Reliance Jio', share: 44.2, color: '#0284C7', usersMillion: 460 },
    { name: 'Bharti Airtel', share: 36.1, color: '#DC2626', usersMillion: 380 },
    { name: 'Vodafone Idea (Vi)', share: 15.8, color: '#D97706', usersMillion: 165 },
    { name: 'BSNL / MTNL', share: 3.9, color: '#16A34A', usersMillion: 40 },
  ],
  cityTiers: [
    { tier: 'Tier 1 Metro (Delhi, Mumbai, Bengaluru, etc.)', share: 22, networkQuality: 'High 5G/4G coverage' },
    { tier: 'Tier 2 Emerging (Jaipur, Lucknow, Indore, Surat, etc.)', share: 38, networkQuality: 'Variable 4G, frequent cell congestion' },
    { tier: 'Tier 3 & Rural Districts', share: 40, networkQuality: '3G fallback common, high jitter, power-cut tower outages' },
  ],
  devicePriceTiers: [
    { segment: 'Sub-₹10,000 (Entry Budget 2GB-3GB RAM)', share: 39, characteristics: 'Heavy OEM process killers, low internal storage' },
    { segment: '₹10,000 – ₹25,000 (Mid-Range 4GB-6GB RAM)', share: 45, characteristics: 'Average 4G/5G, decent CPU, high screen refresh' },
    { segment: 'Above ₹25,000 (Premium / Flagship)', share: 16, characteristics: 'Top tier SoCs, zero memory constraints' },
  ],
  languagePreference: [
    { script: 'Hindi (हिंदी)', share: 41.5 },
    { script: 'English / Hinglish', share: 26.0 },
    { script: 'Tamil & Telugu (தமிழ் & తెలుగు)', share: 15.2 },
    { script: 'Bengali & Marathi (বাংলা & मराठी)', share: 11.8 },
    { script: 'Kannada, Malayalam & Gujarati', share: 5.5 },
  ],
};
