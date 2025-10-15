/**
 * AdSection Component
 * Placeholder for Google AdSense or Sedo Parking Ads
 * Replace with actual ad code when ready
 */
export default function AdSection() {
  return (
    <section className="section bg-dark-800">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Ad Container */}
          <div className="card text-center">
            <div className="mb-4">
              <span className="text-xs uppercase text-gray-500 tracking-wider">
                Advertisement
              </span>
            </div>
            
            {/* Placeholder for Google AdSense */}
            {/* Replace this div with actual AdSense code */}
            <div className="bg-dark-900 border border-gray-700 rounded-lg p-12 min-h-[250px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-semibold mb-2">Advertisement Space</h3>
                <p className="text-gray-400 text-sm">
                  Monetization ready - Add your Google AdSense or Sedo Parking code here
                </p>
              </div>
            </div>

            {/* Instructions for implementation */}
            <div className="mt-6 p-4 bg-dark-900 rounded-lg text-left">
              <p className="text-sm text-gray-400 mb-2">
                <strong className="text-white">Implementation:</strong>
              </p>
              <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside">
                <li>For Google AdSense: Add your ad unit code inside this component</li>
                <li>For Sedo Parking: Replace with Sedo's parking script</li>
                <li>Remove placeholder content when adding real ads</li>
              </ul>
            </div>
          </div>

          {/* Google AdSense Example Code (commented) */}
          {/*
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          <script>
               (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
          */}
        </div>
      </div>
    </section>
  );
}
