import { useState, useEffect, useCallback, CSSProperties } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface TimeLeft {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Goal {
  icon: string;
  title: string;
  description: string;
}

interface CountdownData {
  targetDate: string;
  title: string;
  subtitle: string;
  goals: Goal[];
  initialTime: number;
}

// Inline styles to avoid Tailwind conflicts
const inlineStyles: { [key: string]: CSSProperties } = {
  pageWrapper: {
    fontFamily: "'JetBrains Mono', 'SF Mono', Monaco, monospace",
    background: 'linear-gradient(135deg, #050810 0%, #0a0e1a 50%, #050810 100%)',
    minHeight: '100vh',
    color: '#e0e6ed',
    lineHeight: 1.6,
    position: 'relative',
    overflow: 'hidden',
    display: 'block',
    boxSizing: 'border-box',
  },
  bgPattern: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(0, 255, 136, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(0, 212, 255, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(255, 0, 128, 0.02) 0%, transparent 40%)
    `,
    pointerEvents: 'none',
    zIndex: 0,
  },
  gridOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    pointerEvents: 'none',
    zIndex: 0,
  },
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: 'rgba(5, 8, 16, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0, 255, 136, 0.2)',
    zIndex: 1000,
  },
  navLogo: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '1.3rem',
    color: '#00ff88',
    textDecoration: 'none',
    fontWeight: 700,
    letterSpacing: '0.05em',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  navLink: {
    color: '#e0e6ed',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.3s ease',
  },
  navLinkActive: {
    color: '#00ff88',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 600,
    position: 'relative',
  },
  navDonate: {
    background: 'linear-gradient(135deg, #ffd700, #ffed4a)',
    color: '#050810',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  container: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem',
    paddingTop: '6rem',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: '1.5rem',
    color: '#00d4ff',
  },
  loadingSpinner: {
    width: '60px',
    height: '60px',
    border: '3px solid rgba(0, 255, 136, 0.2)',
    borderTop: '3px solid #00ff88',
    borderRadius: '50%',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  missionTitle: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '2.5rem',
    fontWeight: 900,
    background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #ff0080 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.5rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#8892a6',
    fontStyle: 'italic',
    letterSpacing: '0.05em',
    marginBottom: '1rem',
  },
  targetDate: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '1rem',
    color: '#00d4ff',
    letterSpacing: '0.1em',
  },
  countdownGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  timeBlock: {
    background: 'rgba(10, 14, 26, 0.8)',
    border: '1px solid rgba(0, 255, 136, 0.3)',
    borderRadius: '12px',
    padding: '1.5rem 1rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  timeValue: {
    display: 'block',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '2rem',
    fontWeight: 900,
    color: '#00ff88',
    textShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
    marginBottom: '0.5rem',
    transition: 'all 0.3s ease',
  },
  timeLabel: {
    fontSize: '0.75rem',
    color: '#8892a6',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  glassContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '3rem 0',
  },
  glassLabel: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '1.2rem',
    color: '#00d4ff',
    marginBottom: '1rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  glass: {
    position: 'relative',
    width: '120px',
    height: '200px',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)',
    border: '2px solid rgba(0, 255, 136, 0.3)',
    borderRadius: '0 0 20px 20px',
    borderTop: 'none',
    overflow: 'hidden',
    boxShadow: 'inset 0 0 30px rgba(0, 255, 136, 0.1), 0 10px 40px rgba(0, 0, 0, 0.3)',
  },
  glassWater: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(180deg, rgba(0, 212, 255, 0.8) 0%, rgba(0, 255, 136, 0.6) 50%, rgba(0, 255, 136, 0.8) 100%)',
    transition: 'height 1s ease-out',
    borderRadius: '0 0 18px 18px',
  },
  glassShine: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    width: '20px',
    height: '60px',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.4), transparent)',
    borderRadius: '10px',
    transform: 'rotate(-10deg)',
  },
  glassPercent: {
    marginTop: '1.5rem',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '2rem',
    fontWeight: 700,
    color: '#00ff88',
    textShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
  },
  goalsSection: {
    background: 'rgba(10, 14, 26, 0.8)',
    border: '1px solid rgba(0, 255, 136, 0.3)',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '2rem',
  },
  goalsTitle: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '1.8rem',
    color: '#00d4ff',
    marginBottom: '1.5rem',
    textAlign: 'center',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  goalItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    marginBottom: '1rem',
    background: 'rgba(0, 255, 136, 0.05)',
    borderLeft: '3px solid #00ff88',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  },
  goalIcon: {
    fontSize: '1.5rem',
    marginRight: '1rem',
  },
  goalText: {
    fontSize: '1.1rem',
    lineHeight: 1.6,
    color: '#e0e6ed',
  },
  motivation: {
    textAlign: 'center',
    padding: '2rem',
    background: 'rgba(255, 0, 128, 0.05)',
    border: '1px solid rgba(255, 0, 128, 0.2)',
    borderRadius: '12px',
    marginBottom: '2rem',
  },
  motivationText: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '1.3rem',
    color: '#ff0080',
    fontWeight: 600,
    letterSpacing: '0.05em',
    marginBottom: '0.5rem',
  },
  motivationSubtitle: {
    fontSize: '0.9rem',
    color: '#8892a6',
    fontStyle: 'italic',
    letterSpacing: '0.05em',
  },
  invictusSection: {
    background: 'rgba(10, 14, 26, 0.8)',
    border: '1px solid rgba(255, 0, 128, 0.3)',
    borderRadius: '16px',
    padding: '2.5rem',
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  invictusTitle: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '1.5rem',
    color: '#ff0080',
    textAlign: 'center',
    marginBottom: '1.5rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  invictusPoem: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '1rem',
    lineHeight: 1.8,
    color: '#e0e6ed',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto',
  },
  poemParagraph: {
    marginBottom: '1.5rem',
  },
  highlight: {
    color: '#00ff88',
    fontWeight: 600,
    textShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
  },
  invictusAuthor: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '0.9rem',
    color: '#8892a6',
    fontStyle: 'italic',
  },
  donationSection: {
    background: 'rgba(10, 14, 26, 0.8)',
    border: '1px solid rgba(255, 215, 0, 0.3)',
    borderRadius: '16px',
    padding: '2.5rem',
    marginTop: '2rem',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  donationTitle: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '1.8rem',
    color: '#ffd700',
    marginBottom: '1rem',
    letterSpacing: '0.1em',
    textShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
  },
  donationText: {
    fontSize: '1rem',
    color: '#e0e6ed',
    marginBottom: '1.5rem',
    lineHeight: 1.8,
  },
  walletCard: {
    background: 'rgba(0, 0, 0, 0.4)',
    border: '2px solid rgba(255, 215, 0, 0.3)',
    borderRadius: '12px',
    padding: '1.5rem',
    margin: '1.5rem auto',
    maxWidth: '500px',
    transition: 'all 0.3s ease',
  },
  walletChain: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '0.9rem',
    color: '#ffd700',
  },
  chainIcon: {
    fontSize: '1.2rem',
  },
  walletAddress: {
    background: 'rgba(0, 255, 136, 0.1)',
    border: '1px solid rgba(0, 255, 136, 0.3)',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    overflowX: 'auto',
  },
  walletCode: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.85rem',
    color: '#00ff88',
    wordBreak: 'break-all',
  },
  copyButton: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '0.9rem',
    color: '#050810',
    background: 'linear-gradient(135deg, #ffd700, #ffed4a)',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: 600,
  },
  donationNote: {
    marginTop: '1rem',
    fontSize: '0.85rem',
    color: '#ff6b6b',
    fontStyle: 'italic',
  },
};

export default function MyVision() {
  const [isLoading, setIsLoading] = useState(true);
  const [countdownData, setCountdownData] = useState<CountdownData | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [progress, setProgress] = useState(0);

  // Fetch countdown settings from API
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/countdown');
        const json = await res.json();
        if (json.success) {
          setCountdownData(json.data);
        }
      } catch (error) {
        console.error('Failed to fetch countdown settings:', error);
        // Fallback to default (Bangkok timezone UTC+7)
        const defaultTarget = '2028-12-31T17:00:00.000Z';
        const initialTime = new Date(defaultTarget).getTime() - Date.now();
        setCountdownData({
          targetDate: defaultTarget,
          title: 'Mission Countdown',
          subtitle: 'The Journey to Excellence',
          goals: [
            { icon: '🎓', title: 'IELTS Excellence', description: 'Master English at International Level' },
            { icon: '🔐', title: 'Offensive Cyber Research', description: 'Cybersecurity Expertise' },
            { icon: '💰', title: 'Secure Funding', description: 'For a Better Future' },
            { icon: '🚀', title: 'Beyond & More', description: 'Progress Every Single Day' },
          ],
          initialTime: Math.max(0, initialTime),
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const updateCountdown = useCallback(() => {
    if (!countdownData) return;

    const now = new Date().getTime();
    const target = new Date(countdownData.targetDate).getTime();
    const timeDiff = target - now;

    if (timeDiff <= 0) {
      setTimeLeft({ years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
      setProgress(0);
      return;
    }

    setTimeLeft(() => {
      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30.44);
      const years = Math.floor(days / 365.25);

      return {
        years,
        months: months % 12,
        weeks: weeks % 4,
        days: days % 7,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
      };
    });

    // Update progress - glass emptying effect
    const totalDuration = countdownData.initialTime;
    const remainingPercent = (timeDiff / totalDuration) * 100;
    setProgress(Math.max(0, Math.min(100, remainingPercent)));
  }, [countdownData]);

  useEffect(() => {
    if (!countdownData) return;
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [updateCountdown, countdownData]);

  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  const timeBlocks: Array<{ key: keyof TimeLeft; label: string }> = [
    { key: 'years', label: 'Years' },
    { key: 'months', label: 'Months' },
    { key: 'weeks', label: 'Weeks' },
    { key: 'days', label: 'Days' },
    { key: 'hours', label: 'Hours' },
    { key: 'minutes', label: 'Minutes' },
    { key: 'seconds', label: 'Seconds' },
  ];

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading... - My Vision</title>
          <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@300;400;600&display=swap" rel="stylesheet" />
        </Head>
        <div style={inlineStyles.pageWrapper as CSSProperties}>
          <div style={inlineStyles.loadingContainer as CSSProperties}>
            <div style={{
              ...inlineStyles.loadingSpinner,
              animation: 'spin 1s linear infinite',
            }} />
            <p style={{ color: '#00d4ff' }}>Loading mission data...</p>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </>
    );
  }

  const title = countdownData?.title || 'Mission Countdown';
  const subtitle = countdownData?.subtitle || 'The Journey to Excellence';
  const goals = countdownData?.goals || [];

  return (
    <>
      <Head>
        <title>{title} - Journey to 2029</title>
        <meta name="description" content="My mission countdown to January 1, 2029" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@300;400;600&display=swap" rel="stylesheet" />
      </Head>

      <div style={inlineStyles.pageWrapper as CSSProperties}>
        <div style={inlineStyles.bgPattern as CSSProperties} />
        <div style={inlineStyles.gridOverlay as CSSProperties} />

        {/* Navigation Header */}
        <nav style={inlineStyles.navbar as CSSProperties}>
          <Link href="/" style={inlineStyles.navLogo as CSSProperties}>
            🚀 0dev.io
          </Link>
          <div style={inlineStyles.navLinks as CSSProperties}>
            <Link href="/" style={inlineStyles.navLink as CSSProperties}>Home</Link>
            <Link href="/blog" style={inlineStyles.navLink as CSSProperties}>Blog</Link>
            <Link href="/my-vision" style={inlineStyles.navLinkActive as CSSProperties}>My Vision</Link>
            <a href="#donate" style={inlineStyles.navDonate as CSSProperties}>💎 Donate</a>
          </div>
        </nav>

        <div style={inlineStyles.container as CSSProperties}>
          <header style={inlineStyles.header as CSSProperties}>
            <h1 style={inlineStyles.missionTitle as CSSProperties}>{title}</h1>
            <p style={inlineStyles.subtitle as CSSProperties}>{subtitle}</p>
            <p style={inlineStyles.targetDate as CSSProperties}>🎯 Target: January 1, 2029 (00:00 Bangkok Time)</p>
          </header>

          <div style={inlineStyles.countdownGrid as CSSProperties}>
            {timeBlocks.map(({ key, label }) => (
              <div key={key} style={inlineStyles.timeBlock as CSSProperties}>
                <span style={inlineStyles.timeValue as CSSProperties}>
                  {formatNumber(timeLeft[key])}
                </span>
                <span style={inlineStyles.timeLabel as CSSProperties}>{label}</span>
              </div>
            ))}
          </div>

          <div style={inlineStyles.glassContainer as CSSProperties}>
            <div style={inlineStyles.glassLabel as CSSProperties}>⏳ Time Remaining</div>
            <div style={inlineStyles.glass as CSSProperties}>
              <div style={{
                ...inlineStyles.glassWater,
                height: `${progress}%`,
              } as CSSProperties} />
              <div style={inlineStyles.glassShine as CSSProperties} />
            </div>
            <div style={inlineStyles.glassPercent as CSSProperties}>{progress.toFixed(2)}%</div>
          </div>

          <section style={inlineStyles.goalsSection as CSSProperties}>
            <h2 style={inlineStyles.goalsTitle as CSSProperties}>🎯 Mission Goals - 2029</h2>
            {goals.map((goal, index) => (
              <div key={index} style={inlineStyles.goalItem as CSSProperties}>
                <span style={inlineStyles.goalIcon as CSSProperties}>{goal.icon}</span>
                <span style={inlineStyles.goalText as CSSProperties}>
                  <strong style={{ color: '#00ff88' }}>{goal.title}</strong> - {goal.description}
                </span>
              </div>
            ))}
          </section>

          <div style={inlineStyles.motivation as CSSProperties}>
            <p style={inlineStyles.motivationText as CSSProperties}>
              ✨ I am the master of my fate, I am the captain of my soul ✨
            </p>
            <p style={inlineStyles.motivationSubtitle as CSSProperties}>
              — William Ernest Henley, Invictus
            </p>
          </div>

          <section style={inlineStyles.invictusSection as CSSProperties}>
            <h3 style={inlineStyles.invictusTitle as CSSProperties}>📜 Invictus</h3>
            <div style={inlineStyles.invictusPoem as CSSProperties}>
              <p style={inlineStyles.poemParagraph as CSSProperties}>
                Out of the night that covers me,<br />
                Black as the pit from pole to pole,<br />
                I thank whatever gods may be<br />
                For my unconquerable soul.
              </p>

              <p style={inlineStyles.poemParagraph as CSSProperties}>
                In the fell clutch of circumstance<br />
                I have not winced nor cried aloud.<br />
                Under the bludgeonings of chance<br />
                My head is bloody, but unbowed.
              </p>

              <p style={inlineStyles.poemParagraph as CSSProperties}>
                Beyond this place of wrath and tears<br />
                Looms but the Horror of the shade,<br />
                And yet the menace of the years<br />
                Finds and shall find me unafraid.
              </p>

              <p style={inlineStyles.poemParagraph as CSSProperties}>
                It matters not how strait the gate,<br />
                How charged with punishments the scroll,<br />
                <span style={inlineStyles.highlight as CSSProperties}>
                  I am the master of my fate,<br />
                  I am the captain of my soul.
                </span>
              </p>
            </div>
            <p style={inlineStyles.invictusAuthor as CSSProperties}>— William Ernest Henley (1875)</p>
          </section>

          {/* Donation Section */}
          <section id="donate" style={inlineStyles.donationSection as CSSProperties}>
            <h3 style={inlineStyles.donationTitle as CSSProperties}>💎 Support My Journey</h3>
            <p style={inlineStyles.donationText as CSSProperties}>
              If you like my work or want to support this mission,<br/>
              feel free to donate here. Thank you so much! 🙏
            </p>
            <div style={inlineStyles.walletCard as CSSProperties}>
              <div style={inlineStyles.walletChain as CSSProperties}>
                <span style={inlineStyles.chainIcon as CSSProperties}>🔶</span>
                <span>USDT / BEP20 (BSC Chain)</span>
              </div>
              <div style={inlineStyles.walletAddress as CSSProperties}>
                <code style={inlineStyles.walletCode as CSSProperties}>0x0bccdbf4dcb569307d775a56e45a222a0d44d843</code>
              </div>
              <button
                style={inlineStyles.copyButton as CSSProperties}
                onClick={() => {
                  navigator.clipboard.writeText('0x0bccdbf4dcb569307d775a56e45a222a0d44d843');
                  alert('Copied to clipboard! 📋');
                }}
              >
                📋 Copy Address
              </button>
            </div>
            <p style={inlineStyles.donationNote as CSSProperties}>
              ⚠️ Please send USDT via BEP20 (Binance Smart Chain) only
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
