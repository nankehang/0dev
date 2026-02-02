import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/MyVision.module.css';

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

interface AnimatedValues {
  [key: string]: boolean;
}

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
  const [animatedValues, setAnimatedValues] = useState<AnimatedValues>({});

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
        // Midnight Bangkok = 17:00 UTC previous day
        setCountdownData({
          targetDate: '2028-12-31T17:00:00.000Z', // = 2029-01-01 00:00:00 Bangkok
          title: 'Mission Countdown',
          subtitle: 'The Journey to Excellence',
          goals: [
            { icon: '🎓', title: 'IELTS Excellence', description: 'Master English at International Level' },
            { icon: '🔐', title: 'Offensive Cyber Research', description: 'Cybersecurity Expertise' },
            { icon: '💰', title: 'Secure Funding', description: 'For a Better Future' },
            { icon: '🚀', title: 'Beyond & More', description: 'Progress Every Single Day' },
          ],
          initialTime: new Date('2028-12-31T17:00:00.000Z').getTime() - Date.now(),
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const updateCountdown = useCallback(() => {
    if (!countdownData) return;

    const targetDate = new Date(countdownData.targetDate);
    const now = new Date();
    const timeDiff = targetDate.getTime() - now.getTime();

    if (timeDiff <= 0) {
      setTimeLeft({
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      setProgress(100);
      return;
    }

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    const years = Math.floor(days / 365.25);

    const newTimeLeft: TimeLeft = {
      years,
      months,
      weeks,
      days,
      hours,
      minutes,
      seconds,
    };

    // Check which values changed for animation
    setTimeLeft((prevTimeLeft) => {
      const changedKeys: string[] = [];
      (Object.keys(newTimeLeft) as Array<keyof TimeLeft>).forEach((key) => {
        if (prevTimeLeft[key] !== newTimeLeft[key]) {
          changedKeys.push(key);
        }
      });

      if (changedKeys.length > 0) {
        setAnimatedValues((prev) => {
          const newAnimated: AnimatedValues = { ...prev };
          changedKeys.forEach((key) => {
            newAnimated[key] = true;
          });
          return newAnimated;
        });

        // Reset animation after delay
        setTimeout(() => {
          setAnimatedValues((prev) => {
            const newAnimated: AnimatedValues = { ...prev };
            changedKeys.forEach((key) => {
              newAnimated[key] = false;
            });
            return newAnimated;
          });
        }, 300);
      }

      return newTimeLeft;
    });

    // Update progress - show remaining time like a glass emptying
    // 100% = full (all time remaining), 0% = empty (time's up)
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

  // Cursor trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.9) {
        const trail = document.createElement('div');
        trail.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--primary);
          pointer-events: none;
          z-index: 9999;
          opacity: 0.6;
          transition: all 0.5s ease;
        `;
        document.body.appendChild(trail);

        setTimeout(() => {
          trail.style.opacity = '0';
          trail.style.transform = 'scale(0)';
          setTimeout(() => trail.remove(), 500);
        }, 50);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      <div className={styles.pageWrapper}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner} />
          <p>Loading mission data...</p>
        </div>
      </div>
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
      </Head>

      <div className={styles.pageWrapper}>
        <div className={styles.bgPattern} />
        <div className={styles.gridOverlay} />

        {/* Navigation back link */}
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>

        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.missionTitle}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
            <p className={styles.targetDate}>🎯 Target: 1 มกราคม 2029 (00:00 Bangkok Time)</p>
          </header>

          <div className={styles.countdownGrid}>
            {timeBlocks.map(({ key, label }) => (
              <div key={key} className={styles.timeBlock}>
                <span
                  className={`${styles.timeValue} ${
                    animatedValues[key] ? styles.timeValueAnimated : ''
                  }`}
                >
                  {formatNumber(timeLeft[key])}
                </span>
                <span className={styles.timeLabel}>{label}</span>
              </div>
            ))}
          </div>

          <div className={styles.glassContainer}>
            <div className={styles.glassLabel}>⏳ Time Remaining</div>
            <div className={styles.glass}>
              <div
                className={styles.glassWater}
                style={{ height: `${progress}%` }}
              />
              <div className={styles.glassCracks} style={{ opacity: progress < 50 ? (50 - progress) / 50 : 0 }} />
              <div className={styles.glassShine} />
            </div>
            <div className={styles.glassPercent}>{progress.toFixed(2)}%</div>
          </div>

          <section className={styles.goalsSection}>
            <h2 className={styles.goalsTitle}>🎯 Mission Goals - 2029</h2>
            {goals.map((goal, index) => (
              <div key={index} className={styles.goalItem}>
                <span className={styles.goalIcon}>{goal.icon}</span>
                <span className={styles.goalText}>
                  <strong>{goal.title}</strong> - {goal.description}
                </span>
              </div>
            ))}
          </section>

          <div className={styles.motivation}>
            <p className={styles.motivationText}>
              ✨ I am the master of my fate, I am the captain of my soul ✨
            </p>
            <p className={styles.motivationSubtitle}>
              — William Ernest Henley, Invictus
            </p>
          </div>

          <section className={styles.invictusSection}>
            <h3 className={styles.invictusTitle}>📜 Invictus</h3>
            <div className={styles.invictusPoem}>
              <p>
                Out of the night that covers me,
                <br />
                Black as the pit from pole to pole,
                <br />
                I thank whatever gods may be
                <br />
                For my unconquerable soul.
              </p>

              <p>
                In the fell clutch of circumstance
                <br />
                I have not winced nor cried aloud.
                <br />
                Under the bludgeonings of chance
                <br />
                My head is bloody, but unbowed.
              </p>

              <p>
                Beyond this place of wrath and tears
                <br />
                Looms but the Horror of the shade,
                <br />
                And yet the menace of the years
                <br />
                Finds and shall find me unafraid.
              </p>

              <p>
                It matters not how strait the gate,
                <br />
                How charged with punishments the scroll,
                <br />
                <span className={styles.highlight}>
                  I am the master of my fate,
                  <br />
                  I am the captain of my soul.
                </span>
              </p>
            </div>
            <p className={styles.invictusAuthor}>— William Ernest Henley (1875)</p>
          </section>
        </div>
      </div>
    </>
  );
}
